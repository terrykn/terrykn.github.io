import { SocialLink } from "@/types/portfolio";

interface FooterProps {
  copyrightText: string;
  links: SocialLink[];
}

export function Footer({ copyrightText, links }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-muted-foreground">
            {copyrightText}
          </p>
        </div>

        <nav aria-label="Footer links" className="flex items-center gap-5 flex-wrap justify-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
