"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
    /**
     * Text to display
     */
    text: string;
    className?: string;
    lineClassName?: string;
}

export default function TextBorderAnimation({
    text = "Programming",
    className,
    lineClassName,
}: TextProps) {
    const [isHoveredIn, setIsHoveredIn] = useState(false);
    const [isHoveredOut, setIsHoveredOut] = useState(false);

    const handleHover = () => {
        setIsHoveredIn(true);
    };

    const handleHoverExit = () => {
        setIsHoveredIn(false);
        setIsHoveredOut(true);
    };

    useEffect(() => {
        if (isHoveredOut) {
            const timer = setTimeout(() => {
                setIsHoveredOut(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isHoveredOut]);

    return (
        <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            className="inline-block overflow-hidden cursor-pointer"
        >
            <span className={cn("text-base font-semibold text-foreground transition-colors hover:text-primary", className)}>
                {text}
            </span>
            <div className="relative mt-1 h-0.5 w-full bg-border/40">
                <div
                    className={cn(
                        "absolute left-0 top-0 h-full w-full bg-primary transition-transform duration-300",
                        isHoveredIn
                            ? "translate-x-0 transform opacity-100"
                            : "-translate-x-full transform opacity-0",
                        lineClassName,
                    )}
                />
                <div
                    className={cn(
                        "absolute left-0 top-0 h-full w-full translate-x-0 transform bg-primary opacity-0 transition-transform duration-300",
                        isHoveredOut && "translate-x-full opacity-100",
                        lineClassName,
                    )}
                />
            </div>
        </div>
    );
}

