"use client";

import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { NavThemeToggle } from "@/components/layout/theme-toggle";
import { NavLink } from "@/types/portfolio";

interface NavbarProps {
  title?: string;
  links: NavLink[];
}

/**
 * Template-style pill nav: centered rounded-full bar with a
 * spring-animated active indicator:
 *  - clicking a tab moves the pill there immediately,
 *  - while the smooth-scroll travel runs, scroll-spy is paused
 *    so the pill does not flicker through intermediate sections,
 *  - once scrolling settles (or the user scrolls manually) the
 *    scroll-spy resumes highlighting the section in view.
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

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Section elements are kept in a ref so the shared pickActive callback
  // does not need to be rebuilt every render.
  const elementsRef = useRef<HTMLElement[]>([]);

  // While a programmatic (Lenis) scroll travels to a tapped section,
  // scroll-spy is suppressed so the pill lands straight on the target.
  const suppressSpyRef = useRef(false);
  const settleRafRef = useRef(0);

  const pickActive = useCallback((): void => {
    if (suppressSpyRef.current) return;

    const elements = elementsRef.current;
    if (elements.length === 0) {
      setActiveIndex((prev) => (prev === -1 ? prev : -1));
      return;
    }


    // Highlight the LAST section whose top has crossed ~40% of the
    // viewport (DOM order). Picking the smallest top instead would let a
    // fully scrolled-past section keep winning once its top goes negative.
    let best = -1;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].getBoundingClientRect().top <= window.innerHeight * 0.4) {
        best = i;
      }
    }
    // Identical state fully bails out of rendering
    setActiveIndex((prev) => (prev === best ? prev : best));
  }, []);

  /**
   * After a tapped tab starts an animated scroll, watch scrollY until it
   * has been stable for several consecutive frames, then resume the spy.
   */
  const startSettleWatch = useCallback((): void => {
    cancelAnimationFrame(settleRafRef.current);
    let lastY = window.scrollY;
    let stableFrames = 0;

    const tick = (): void => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) {
        stableFrames++;
      } else {
        stableFrames = 0;
        lastY = y;
      }
      if (stableFrames >= 6) {
        // Travel finished: clear suppression and sync the pill to reality.
        suppressSpyRef.current = false;
        pickActive();
        return;
      }
      settleRafRef.current = requestAnimationFrame(tick);
    };

    settleRafRef.current = requestAnimationFrame(tick);
  }, [pickActive]);

  const handleNavClick = useCallback(
    (index: number): void => {
      // Pill responds to the tap instantly; spy stays quiet until travel ends.
      suppressSpyRef.current = true;
      setActiveIndex((prev) => (prev === index ? prev : index));
      startSettleWatch();
    },
    [startSettleWatch]
  );

  // Manual scrolling always wins: the moment the user scrolls themselves,
  // suppression is lifted and the spy follows the live position.
  useEffect(() => {
    if (sectionIds.length === 0) return;

    elementsRef.current = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elementsRef.current.length === 0) return;

    let rafId = 0;
    const schedule = (): void => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          pickActive();
        });
      }
    };
    const cancelSuppression = (): void => {
      if (!suppressSpyRef.current) return;
      suppressSpyRef.current = false;
      cancelAnimationFrame(settleRafRef.current);
    };

    pickActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", cancelSuppression, { passive: true });
    window.addEventListener("touchmove", cancelSuppression, { passive: true });
    window.addEventListener("keydown", cancelSuppression);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", cancelSuppression);
      window.removeEventListener("touchmove", cancelSuppression);
      window.removeEventListener("keydown", cancelSuppression);
      if (rafId) cancelAnimationFrame(rafId);
      cancelAnimationFrame(settleRafRef.current);
      suppressSpyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(","), pickActive]);

  useEffect(() => {
    if (!pillRect) return;
    const id = requestAnimationFrame(() => setHasMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const activeEl = activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
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

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-3 z-50 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 sm:top-6"
    >
      <div className="flex items-center gap-0.5 rounded-full bg-background p-1 shadow-sm ring-1 ring-foreground/8 sm:gap-1 sm:p-1.5">
        <ul
          ref={listRef}
          className="relative flex min-w-0 items-center gap-0.5 overflow-x-auto [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden"
        >
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
                  onClick={() => handleNavClick(index)}
                  className="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-2 py-1 text-[11px] font-medium transition-colors duration-300 sm:px-4 sm:py-1.5 sm:text-sm"
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
