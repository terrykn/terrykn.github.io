"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
  onClick,
  tilt = 0,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  tilt?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState(
    `translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg)`
  );

  React.useEffect(() => {
    if (!isHovered) {
      setTransform(`translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg)`);
    }
  }, [tilt, isHovered]);

  const onMouseEnter = () => {
    setIsHovered(true);
    setTransform("translate(-50%,-50%) rotate(0deg) rotateX(40deg) scale(0.85)");
  };
  const onMouseLeave = () => {
    setIsHovered(false);
    setTransform(`translate(-50%,-50%) rotate(${tilt}deg) rotateX(0deg) scale(1)`);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }
    // If clicked on an interactive element inside, don't trigger outer navigation
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
        "relative group/pin z-30 cursor-pointer select-none",
        containerClassName
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
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_20px_rgb(0_0_0/0.08)] bg-card border border-border group-hover/pin:border-primary/40 group-hover/pin:shadow-[0_16px_32px_rgb(0_0_0/0.14)] transition duration-500 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </div>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none w-80 h-72 sm:w-96 sm:h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target={"_blank"}
            rel="noopener noreferrer"
            className="pointer-events-auto relative flex space-x-2 items-center z-10 rounded-full bg-foreground text-background py-1 px-4 ring-1 ring-border shadow-md"
          >
            <span className="relative z-20 text-background text-xs font-bold inline-block">
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-opacity duration-500 group-hover/btn:opacity-100"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
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
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary/[0.12] shadow-[0_8px_16px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
            />
            <motion.div
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
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary/[0.12] shadow-[0_8px_16px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
            />
            <motion.div
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
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary/[0.12] shadow-[0_8px_16px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
            />
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-primary translate-y-[14px] w-px h-20 group-hover/pin:h-36 blur-[1.5px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-primary translate-y-[14px] w-px h-20 group-hover/pin:h-36" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-primary translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-primary-foreground translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
};
