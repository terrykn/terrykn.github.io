"use client";

import BubbleMenu from "@/components/react-bits/BubbleMenu";
import { NavLink } from "@/types/portfolio";

interface NavbarProps {
  title?: string;
  links: NavLink[];
}

// Small hand-drawn arrow SVG used as the logo mark
function LogoMark() {
  return (
    <span className="inline-flex items-center font-bold text-md" style={{ color: "var(--foreground)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      Terry Nguyen
    </span>
  );
}

const NAV_HOVER_COLORS: Record<string, { bgColor: string; textColor: string }> = {
  about:      { bgColor: "var(--primary)",         textColor: "var(--primary-foreground)" },
  experience: { bgColor: "var(--foreground)",       textColor: "var(--background)" },
  projects:   { bgColor: "var(--primary)",         textColor: "var(--primary-foreground)" },
  education:  { bgColor: "var(--accent-foreground)",textColor: "var(--background)" },
};

export function Navbar({ links }: NavbarProps) {
  const navLinks = links.filter(
    (link) => !link.label.toLowerCase().includes("skill")
  );

  const bubbleItems = navLinks.map((link, i) => ({
    label: link.label.toLowerCase(),
    href: link.href,
    ariaLabel: `Go to ${link.label}`,
    rotation: i % 2 === 0 ? -6 : 6,
    hoverStyles: NAV_HOVER_COLORS[link.label.toLowerCase()] ?? {
      bgColor: "var(--primary)",
      textColor: "var(--primary-foreground)",
    },
  }));

  return (
    <div className="relative z-50">
      <BubbleMenu
        logo={<LogoMark />}
        items={bubbleItems}
        useFixedPosition={true}
        menuBg="var(--background)"
        menuContentColor="var(--foreground)"
        animationEase="back.out(1.4)"
        animationDuration={0.45}
        staggerDelay={0.1}
      />
    </div>
  );
}
