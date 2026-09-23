"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  accentColor?: string;
  onClick?: () => void;
  tilt?: number;
}

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
  cardClassName,
  accentColor = "#ea580c",
  onClick,
  tilt = 0,
}: PinContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [transform, setTransform] = useState(
    `translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg)`,
  );

  React.useEffect(() => {
    if (!isHovered) {
      setTransform(
        `translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg)`,
      );
    }
  }, [tilt, isHovered]);

  const onMouseEnter = () => {
    setIsHovered(true);

    setTransform(
      "translate(-50%,-50%) rotate(0deg) rotateX(40deg) scale(0.85)",
    );
  };

  const onMouseLeave = () => {
    setIsHovered(false);

    setTransform(
      `translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg) scale(1)`,
    );
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }

    const target = e.target as HTMLElement;

    if (target.closest("a, button")) {
      return;
    }

    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={cn(
        "group/pin relative z-30 cursor-pointer select-none",
        containerClassName,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      role={href ? "link" : "region"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (href) {
            window.open(href, "_blank", "noopener,noreferrer");
          }
        }
      }}
    >
      <div
        style={{
          perspective: "1000px",
          transform: isHovered
            ? "rotateX(60deg) translateZ(0deg)"
            : "rotateX(0deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out"
      >
        <div
          style={{
            transform,
            borderColor: isHovered
              ? `${accentColor}66`
              : "rgba(0, 0, 0, 0.05)",
            boxShadow: isHovered
              ? `0 16px 32px ${accentColor}22`
              : "0 8px 20px rgba(0, 0, 0, 0.08)",
          }}
          className={cn(
            "absolute left-1/2 top-1/2",
            "flex items-start justify-start",
            "rounded-[1.5rem]",
            "border",
            "p-4",
            "transition duration-500",
            "overflow-hidden",
            cardClassName ?? "bg-card",
          )}
        >
          <div className={cn("relative z-50", className)}>
            {children}
          </div>
        </div>
      </div>

      <PinPerspective
        title={title}
        href={href}
        accentColor={accentColor}
      />
    </div>
  );
};

interface PinPerspectiveProps {
  title?: string;
  href?: string;
  accentColor?: string;
}

export const PinPerspective = ({
  title,
  href,
  accentColor = "#ea580c",
}: PinPerspectiveProps) => {
  return (
    <motion.div className="pointer-events-none z-[60] flex h-72 w-80 items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100 sm:h-80 sm:w-96">
      <div className="inset-0 -mt-7 h-full w-full flex-none">
        {/* Floating action label */}
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: accentColor,
            }}
            className="pointer-events-auto relative z-10 inline-flex items-center space-x-2 rounded-full px-4 py-1 text-xs font-bold text-white shadow-md"
          >
            <span className="relative z-20 inline-block text-xs font-bold text-white">
              {title}
            </span>

            <span
              className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-white/60"
            />
          </a>
        </div>

        {/* Glow */}
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            {[0, 2, 4].map((delay) => (
              <motion.div
                key={delay}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,
                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay,
                }}
                style={{
                  backgroundColor: `${accentColor}1F`,
                  boxShadow: `0 8px 16px ${accentColor}33`,
                }}
                className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%]"
              />
            ))}
          </>
        </div>

        {/* Pin line */}
        <>
          <motion.div
            style={{
              background: `linear-gradient(to bottom, transparent, ${accentColor})`,
            }}
            className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] blur-[1.5px] transition-all duration-500 group-hover/pin:h-36"
          />

          <motion.div
            style={{
              background: `linear-gradient(to bottom, transparent, ${accentColor})`,
            }}
            className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] transition-all duration-500 group-hover/pin:h-36"
          />

          <motion.div
            style={{
              backgroundColor: accentColor,
            }}
            className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full blur-[2px]"
          />

          <motion.div
            className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-white"
          />
        </>
      </div>
    </motion.div>
  );
};