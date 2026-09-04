import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";

/**
 * BLACK BRO Typography System
 * ----------------------------------------------------------------
 * Display: Cormorant Garamond — editorial serif for headlines, hero
 *          copy, and product titles. Evokes premium fashion print.
 * Sans:    Inter — workhorse UI font for nav, body, buttons, forms.
 * Mono:    JetBrains Mono — SKU codes, prices, technical labels.
 *
 * Exposed as CSS variables and wired into Tailwind via `@theme` in
 * globals.css (--font-display / --font-sans / --font-mono).
 */

export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bb-display",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bb-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-bb-mono",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
