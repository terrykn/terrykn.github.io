"use client";

import { cn } from "@/lib/utils";

interface TextProps {
    /**
     * Text to display
     */
    text: string;
    className?: string;
    lineClassName?: string;
}

/**
 * Static link text. The hover-driven underline/border animation was removed
 * per the "no hover effects" design requirement (see docs/ARCHITECTURE.md).
 */
export default function TextBorderAnimation({
    text = "Programming",
    className,
    lineClassName,
}: TextProps) {
    return (
        <span className={cn("inline-block text-foreground", className, lineClassName)}>
            {text}
        </span>
    );
}
