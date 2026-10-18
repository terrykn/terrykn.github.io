"use client";

import { Section } from "@/components/Section";
import CircularGallery from "@/components/react-bits/CircularGallery";
import { useCssVar } from "@/hooks/use-css-var";
import { GalleryData } from "@/types/portfolio";

interface GallerySectionProps {
  gallery: GalleryData;
}

export function GallerySection({ gallery }: GallerySectionProps) {
  // Canvas text rendering can't parse var() — resolve the token value first
  const foreground = useCssVar("--foreground");

  if (!gallery || gallery.length === 0 || !foreground) return null;

  return (
    <Section id="gallery" title="Gallery" fullWidthContent>
      <div className="space-y-10">
        {gallery.map((subsection) => (
          <div key={subsection.id}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-[var(--muted-foreground)] px-6 sm:px-8 max-w-4xl mx-auto">
              {subsection.title}
            </h3>
            <div className="w-full h-[280px] sm:h-[360px]">
              <CircularGallery
                items={subsection.images.map((img) => ({
                  image: img.src,
                  text: img.text,
                }))}
                bend={2}
                textColor={foreground}
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.05}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
