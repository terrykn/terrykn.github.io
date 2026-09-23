"use client";

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence,
} from "motion/react";
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from "react";

export type DockItemData = {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    ariaLabel?: string;
    className?: string;
    isSeparator?: boolean;
};

export type DockProps = {
    items: DockItemData[];
    className?: string;
    distance?: number;
    panelHeight?: number;
    baseItemSize?: number;
    dockHeight?: number;
    magnification?: number;
    spring?: SpringOptions;
};

type DockItemProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    mouseX: MotionValue<number>;
    spring: SpringOptions;
    distance: number;
    baseItemSize: number;
    magnification: number;
    label?: React.ReactNode;
    ariaLabel?: string;
};

function DockItem({
    children,
    className = "",
    onClick,
    href,
    target,
    mouseX,
    spring,
    distance,
    magnification,
    baseItemSize,
    label,
    ariaLabel,
}: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize,
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    );
    const size = useSpring(targetSize, spring);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (onClick) {
                onClick();
            } else if (href) {
                if (target === "_blank") {
                    window.open(href, "_blank", "noopener,noreferrer");
                } else {
                    window.location.href = href;
                }
            }
        }
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (href) {
            if (target === "_blank") {
                window.open(href, "_blank", "noopener,noreferrer");
            } else {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                } else {
                    window.location.href = href;
                }
            }
        }
    };

    const accessibleLabel =
        ariaLabel || (typeof label === "string" ? label : undefined);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size,
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`relative inline-flex items-center justify-center rounded-full border border-zinc-800/80 bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 shadow-xs cursor-pointer select-none transition-colors ${className}`}
            tabIndex={0}
            role={href ? "link" : "button"}
            aria-label={accessibleLabel}
        >
            {Children.map(children, (child) =>
                React.isValidElement(child)
                    ? cloneElement(
                        child as React.ReactElement<{ isHovered?: MotionValue<number> }>,
                        { isHovered }
                    )
                    : child
            )}
        </motion.div>
    );
}

function DockSeparator() {
    return (
        <div
            role="separator"
            aria-orientation="vertical"
            className="h-6 w-[1px] self-center bg-zinc-800 mx-0.5"
        />
    );
}

type DockLabelProps = {
    className?: string;
    children: React.ReactNode;
    isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = "", isHovered }: DockLabelProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHovered) return;
        const unsubscribe = isHovered.on("change", (latest) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && children && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`${className} absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-zinc-800 bg-zinc-900/95 px-2.5 py-1 text-xs font-medium text-zinc-100 shadow-md backdrop-blur-xs pointer-events-none`}
                    role="tooltip"
                    style={{ x: "-50%" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

type DockIconProps = {
    className?: string;
    children: React.ReactNode;
};

function DockIcon({ children, className = "" }: DockIconProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {children}
        </div>
    );
}

export default function Dock({
    items,
    className = "",
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 60,
    distance = 140,
    panelHeight = 60,
    dockHeight = 120,
    baseItemSize = 44,
}: DockProps) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [dockHeight, magnification]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <motion.div
            style={{ height, scrollbarWidth: "none" }}
            className="flex max-w-full items-end"
        >
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={`flex items-end w-fit gap-2 sm:gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md shadow-lg shadow-black/30 p-2 ${className}`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application navigation dock"
            >
                {items.map((item, index) =>
                    item.isSeparator ? (
                        <DockSeparator key={`sep-${index}`} />
                    ) : (
                        <DockItem
                            key={index}
                            onClick={item.onClick}
                            href={item.href}
                            target={item.target}
                            className={item.className}
                            mouseX={mouseX}
                            spring={spring}
                            distance={distance}
                            magnification={magnification}
                            baseItemSize={baseItemSize}
                            label={item.label}
                            ariaLabel={item.ariaLabel}
                        >
                            <DockIcon>{item.icon}</DockIcon>
                            <DockLabel>{item.label}</DockLabel>
                        </DockItem>
                    )
                )}
            </motion.div>
        </motion.div>
    );
}