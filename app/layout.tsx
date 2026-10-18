import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { portfolioData } from "@/data/portfolio";
import AsciiBackdrop from "@/components/react-bits/AsciiBackdrop";
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

export const metadata: Metadata = {
  title: portfolioData.meta.title,
  description: portfolioData.meta.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        {/* Fixed futuristic ASCII light backdrop (horizon glow) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <AsciiBackdrop />
          {/* Top of the page fades to black so text stays readable */}
          <div
            className="absolute inset-x-0 top-0 h-[38vh]"
            style={{ background: "linear-gradient(to bottom, var(--background) 0%, var(--background) 22%, transparent 100%)" }}
          />
        </div>

        <div
          className="relative z-10 flex-1 flex flex-col"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
