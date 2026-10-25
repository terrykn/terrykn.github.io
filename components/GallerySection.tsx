"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/Section";
import { GalleryData, GallerySubsection } from "@/types/portfolio";

interface GallerySectionProps {
  gallery: GalleryData;
}

/**
 * Gallery: infinite press-and-drag carousel. Each subsection renders two
 * stacked rows where every image shares one uniform height but keeps its
 * natural aspect ratio — widths vary per image. The two-row block is
 * duplicated once so the strip loops seamlessly:
 * - Arrows step a fixed amount (one card + gap) and fold the scroll position
 *   back invisibly after the animation settles.
 * - Press-and-drag pans the strip and folds live while dragging.
 */
export function GallerySection({ gallery }: GallerySectionProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <Section id="gallery" title="Gallery" fullWidthContent>
      <div className="space-y-14">
        {gallery.map((subsection) =>
          subsection.images.length > 0 ? (
            <div key={subsection.id}>
              <h3 className="mx-auto max-w-275 px-6 text-[15px] font-semibold tracking-tight text-foreground sm:px-10">
                {subsection.title}
              </h3>
              <div className="mt-5">
                <GalleryCarousel subsection={subsection} />
              </div>
            </div>
          ) : null
        )}
      </div>
    </Section>
  );
}

function GalleryCarousel({ subsection }: { subsection: GallerySubsection }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const timerRef = useRef(0);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
  });

  // Fold the scroll position back into the first copy of the strip. The
  // content is periodic, so this is invisible whenever it happens.
  const fold = (): void => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const half = scroller.scrollWidth / 2;
    if (half <= 0) return;
    const left = scroller.scrollLeft;
    if (left >= half) scroller.scrollLeft = left - half;
    else if (left < 0) scroller.scrollLeft = left + half;
  };

  // After an arrow-driven smooth scroll settles (no scroll events for a
  // moment), fold the position back into the first copy.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = (): void => {
      if (!pendingRef.current) return;
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(fold, 120);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fixed step size: the first card + its horizontal gap, measured from the
  // strip (constant across presses).
  const getStep = (): number => {
    const scroller = scrollerRef.current;
    if (!scroller) return 320;
    const imgs = scroller.querySelectorAll("img");
    if (imgs.length >= 2) {
      const a = imgs[0].getBoundingClientRect();
      const b = imgs[1].getBoundingClientRect();
      const step = b.right - a.right;
      if (step > 10) return step;
    }
    return 320;
  };

  const move = (direction: 1 | -1): void => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const step = getStep();
    const max = scroller.scrollWidth - scroller.clientWidth;
    let current = scroller.scrollLeft;

    // Not enough room in the direction we're heading: teleport one copy
    // width first (visually identical) so the animated step always lands
    // in fresh room, then normalize keeps the loop endless afterwards.
    if (direction > 0 && current + step > max) {
      scroller.scrollLeft -= scroller.scrollWidth / 2;
      current = scroller.scrollLeft;
    } else if (direction < 0 && current < step) {
      scroller.scrollLeft += scroller.scrollWidth / 2;
      current = scroller.scrollLeft;
    }

    pendingRef.current = true;
    scroller.scrollTo({
      left: Math.max(0, Math.min(current + direction * step, max)),
      behavior: "smooth",
    });
  };

  // Press-and-drag panning with live infinite folding.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.button !== 0) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    dragRef.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: scroller.scrollLeft,
    };
    scroller.setPointerCapture(e.pointerId);
    scroller.classList.replace("cursor-grab", "cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const scroller = scrollerRef.current;
    if (!scroller || !dragRef.current.isDown) return;
    const dx = e.clientX - dragRef.current.startX;
    scroller.scrollLeft = dragRef.current.startScroll - dx;
    fold();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>): void => {
    const scroller = scrollerRef.current;
    if (!scroller || !dragRef.current.isDown) return;
    dragRef.current.isDown = false;
    if (scroller.hasPointerCapture(e.pointerId)) {
      scroller.releasePointerCapture(e.pointerId);
    }
    scroller.classList.replace("cursor-grabbing", "cursor-grab");
  };

  const topRow = subsection.images.filter((_, i) => i % 2 === 0);
  const bottomRow = subsection.images.filter((_, i) => i % 2 === 1);

  // One uniform height strip-wide; each image keeps its own aspect ratio.
  const IMG_HEIGHT = "h-40 sm:h-48";

  const rows = (copy: number) => (
    <div key={copy} className="flex w-max flex-col gap-3 pr-3">
      <div className="flex gap-3">
        {topRow.map((img, index) => (
          <img
            key={`top-${img.src}-${index}`}
            src={img.src}
            alt={img.text || "Gallery image"}
            loading="lazy"
            draggable={false}
            className={`${IMG_HEIGHT} w-auto shrink-0 select-none rounded-2xl object-cover ring-1 ring-foreground/8`}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {bottomRow.map((img, index) => (
          <img
            key={`bottom-${img.src}-${index}`}
            src={img.src}
            alt={img.text || "Gallery image"}
            loading="lazy"
            draggable={false}
            className={`${IMG_HEIGHT} w-auto shrink-0 select-none rounded-2xl object-cover ring-1 ring-foreground/8`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Previous images"
        className="focus-ring absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-6"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/8 bg-background shadow-lg shadow-black/40 sm:h-12 sm:w-12">
          <ChevronLeft className="h-5 w-5 text-foreground sm:h-6 sm:w-6" />
        </span>
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Next images"
        className="focus-ring absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-6"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/8 bg-background shadow-lg shadow-black/40 sm:h-12 sm:w-12">
          <ChevronRight className="h-5 w-5 text-foreground sm:h-6 sm:w-6" />
        </span>
      </button>

      {/* Scroller: duplicated staggered rows, draggable, loops seamlessly */}
      <div
        ref={scrollerRef}
        aria-label={`${subsection.title} gallery`}
        role="region"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="touch-pan-y cursor-grab select-none overflow-x-auto [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max">
          {rows(0)}
          {rows(1)}
        </div>
      </div>
    </div>
  );
}
