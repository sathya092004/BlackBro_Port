import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Navbar, Footer, CartDrawer } from "@/components/layout";
import { MotionProvider } from "@/components/motion";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground lg:pl-(--bb-rail-width)">
        {/*
          MotionProvider wraps the whole tree in Framer Motion's
          MotionConfig with reducedMotion="user" — every motion.*
          element site-wide automatically drops transform-based
          animation (scale/x/y/rotate) for visitors with
          prefers-reduced-motion enabled, while still cross-fading
          opacity so content doesn't just snap into place. Paired
          with the prefers-reduced-motion block in globals.css, which
          catches the plain CSS transitions Framer doesn't touch.
        */}
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </MotionProvider>
      </body>
    </html>
  );
}
