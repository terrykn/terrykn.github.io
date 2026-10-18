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

export function Navbar({ links }: NavbarProps) {
  const navLinks = links.filter(
    (link) => !link.label.toLowerCase().includes("skill")
  );

  const bubbleItems = navLinks.map((link) => ({
    label: link.label.toLowerCase(),
    href: link.href,
    ariaLabel: `Go to ${link.label}`,
  }));

  return (
    <div className="relative z-50">
      <BubbleMenu
        logo={<LogoMark />}
        items={bubbleItems}
        useFixedPosition={true}
        menuBg="var(--primary)"
        menuContentColor="var(--foreground)"
        animationEase="back.out(1.4)"
        animationDuration={0.45}
        staggerDelay={0.1}
      />
    </div>
  );
}
