import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../public/DM_Sans/DMSans-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://terrykn.github.io";
const SITE_TITLE = portfolioData.meta.title;
const SITE_DESCRIPTION = portfolioData.meta.description;
const OG_IMAGE = `${SITE_URL}/media/pfp.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Terry Nguyen",
    "Terry K Nguyen",
    "Software Engineer",
    "Full Stack Software Engineer",
    "Verizon",
    "Rutgers University",
    "Georgia Institute of Technology",
    "Georgia Tech",
    "React",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Terry Nguyen", url: SITE_URL }],
  creator: "Terry Nguyen",
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Terry Nguyen",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: OG_IMAGE, alt: "Terry Nguyen" }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// Person structured data so search engines associate the site with the
// person's name, employer, schools, and other profiles (sameAs).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Terry Nguyen",
  alternateName: "Terry K Nguyen",
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: "Full Stack Software Engineer",
  worksFor: { "@type": "Organization", name: "Verizon" },
  email: "mailto:terryknguyen@gmail.com",
  sameAs: [
    "https://linkedin.com/in/terrykn",
    "https://github.com/terrykn",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Georgia Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "Rutgers University" },
  ],
  knowsAbout: portfolioData.skills.flatMap((group) => group.skills),
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Fixed WebGL flow-shader backdrop behind the top of the page */}
          <PageBackdrop />

          {/* Person structured data for search engines (JSON-LD) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />

          <SmoothScroll>
            <div
              className="relative flex min-h-dvh flex-col"
              style={{
                paddingTop: "env(safe-area-inset-top, 0px)",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
              }}
            >
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
