"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { NavThemeToggle } from "@/components/layout/theme-toggle";
import { NavLink } from "@/types/portfolio";

interface NavbarProps {
  title?: string;
  links: NavLink[];
}

/**
 * Template-style pill nav: centered rounded-full bar with a
 * spring-animated active indicator driven by scroll position
 * (this is a single-page site using anchor links).
 */
export function Navbar({ links }: NavbarProps): ReactNode {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [pillRect, setPillRect] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const navLinks = links.filter(
    (link) => !link.label.toLowerCase().includes("skill")
  );

  const sectionIds = navLinks
    .map((link) => link.href.replace(/^#/, ""))
    .filter(Boolean);

  // Scroll-spy: highlight the section nearest the top of the viewport.
  // Runs on rAF and only re-renders when the active section changes,
  // so it does not fight Lenis while scrolling.
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useLayoutEffect(() => {
    const list = listRef.current;
    const activeEl =
      activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (!list || !activeEl) {
      setPillRect(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    setPillRect({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeIndex]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    let rafId = 0;

    const pickActive = (): void => {
      rafId = 0;
      let best = -1;
      let bestTop = Number.POSITIVE_INFINITY;
      for (let i = 0; i < elements.length; i++) {
        const top = elements[i].getBoundingClientRect().top;
        // Section considered active once its top passes ~40% of the viewport
        if (top <= window.innerHeight * 0.4 && top < bestTop) {
          bestTop = top;
          best = i;
        }
      }
      // Identical state fully bails out of rendering
      setActiveIndex((prev) => (prev === best ? prev : best));
    };

    const schedule = (): void => {
      if (!rafId) rafId = requestAnimationFrame(pickActive);
    };

    pickActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  useEffect(() => {
    if (!pillRect) return;
    const id = requestAnimationFrame(() => setHasMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full bg-background p-1.5 shadow-sm ring-1 ring-foreground/8">
        <ul ref={listRef} className="relative flex items-center gap-1">
          {pillRect && activeIndex >= 0 && (
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ x: pillRect.x, width: pillRect.width }}
              transition={
                hasMeasured
                  ? { type: "spring", stiffness: 380, damping: 32 }
                  : { duration: 0 }
              }
              style={{ left: 0, top: 0, bottom: 0 }}
              className="absolute rounded-full bg-foreground/5 ring-1 ring-foreground/8"
            />
          )}
          {navLinks.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative"
              >
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 sm:px-4"
                >
                  <span
                    className={
                      isActive
                        ? "relative z-10 whitespace-nowrap text-foreground"
                        : "relative z-10 whitespace-nowrap text-foreground/60 hover:text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <NavThemeToggle />
      </div>
    </nav>
  );
}
