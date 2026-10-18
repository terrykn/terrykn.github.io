"use client";

import React from "react";
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
  // `title` is kept on the interface for API compatibility; hover-only
  // usage was removed with the hover effects.
  href,
  className,
  containerClassName,
  cardClassName,
  accentColor = "var(--primary)",
  onClick,
  tilt = 0,
}: PinContainerProps) => {
  // Hover effects removed per design (static, minimal card). The tilt is
  // applied as a permanent static style.
  const transform = `translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg) scale(1)`;

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
        "relative z-30 cursor-pointer select-none",
        containerClassName,
      )}
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
          transform: "rotateX(0deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-2 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform,
            borderColor: `color-mix(in srgb, ${accentColor} 18%, transparent)`,
            boxShadow: `0 8px 20px color-mix(in srgb, ${accentColor} 10%, transparent)`,
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
    </div>
  );
};
