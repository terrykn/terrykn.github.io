import React from "react";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
      {children}
    </div>
  );
}

