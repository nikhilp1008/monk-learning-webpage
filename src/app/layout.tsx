import type { Metadata } from "next";
import { Anek_Latin, Anek_Devanagari, Kalam } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Header } from "@/components/Header";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-anek-latin",
  display: "swap",
});

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["500", "600"],
  variable: "--font-anek-devanagari",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "monk learning — Lessons",
  description: "Every chapter taught by Monk out loud on a real board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anekLatin.variable} ${anekDevanagari.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-light text-ink font-sans">
        {/* Rendered once in the shared layout instead of per-page: previously
            every page.tsx imported its own <Header/>, so each client-side
            navigation unmounted and remounted it, re-running its
            supabase.auth.getUser() + profiles fetch on top of the same calls
            already made by middleware and the destination page. Hoisting it
            here means Header persists across navigations like Next.js
            layouts are meant to, and only fetches once per session. */}
        <Header />
        {children}
      </body>
    </html>
  );
}
