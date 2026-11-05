// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "E-Resources | Immanuel College of Theology, Ibadan",
    template: "%s | Immanuel College of Theology, Ibadan",
  },
  description:
    "Explore Immanuel College of Theology, Ibadan library e-resources — books, journals, research tools, and academic databases.",
  // Favicons come from src/app/favicon.ico, icon.png and apple-icon.png (Next.js file conventions)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
