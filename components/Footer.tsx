import { SocialLink } from "@/types/portfolio";

interface FooterProps {
  copyrightText: string;
  links: SocialLink[];
}

export function Footer({ copyrightText, links }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-foreground/5">
      <div className="mx-auto max-w-275 px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium tracking-tight text-foreground/55">
            {copyrightText}
          </p>
        </div>

        <nav aria-label="Footer links" className="flex items-center gap-5 flex-wrap justify-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") && !link.href.startsWith("mailto:") ? "_blank" : undefined}
              rel={link.href.startsWith("http") && !link.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
              className="focus-ring text-sm font-medium tracking-tight text-foreground/65 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
