"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Progress", href: "/progress" },
    { label: "Lessons", href: "/lessons" },
    { label: "Notes", href: "/notes" },
    { label: "My doubts", href: "/doubts" },
  ];

  return (
    <header className="flex-none">
      {/* Night Band */}
      <div className="relative bg-dark-bg text-[#EFEBDD] px-4 md:px-11 py-4.5 overflow-hidden flex-none">
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(90% 120% at 30% -20%, rgba(238,163,31,0.1), transparent 60%)",
          }}
        />
        <div className="relative flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1.5 flex-none">
            <svg viewBox="0 0 120 120" className="w-11 h-11" fill="none">
              <circle
                cx="60"
                cy="60"
                r="36"
                stroke="#FCFAF4"
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray="52 23.4"
                transform="rotate(-90 60 60)"
              />
              <circle
                cx="60"
                cy="60"
                r="19"
                stroke="#FCFAF4"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray="21.8 18"
                transform="rotate(-30 60 60)"
              />
              <circle cx="60" cy="60" r="6" className="fill-orange" />
            </svg>
            <span className="text-[1.52rem] leading-none">
              <b className="font-extrabold text-white">monk</b>
              <span className="font-medium text-[#938d80]">learning</span>
            </span>
          </Link>

          <div className="hidden sm:flex flex-1 min-w-0 border-l border-white/10 pl-6 flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[0.6rem] tracking-[0.16em] uppercase text-orange">
                Today&apos;s push
              </span>
            </div>
            <div className="text-[1.05rem] font-semibold text-[#EFEBDD] mt-1 leading-snug truncate">
              Master every concept with live board explanations{" "}
              <span className="font-script font-bold text-orange-light text-[1.1rem] inline-block -rotate-0.5">
                step by step
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Row */}
      <div className="flex items-center gap-1.5 px-4 md:px-11 py-2.5 border-b border-border-subtle bg-white/60 sticky top-0 z-30 backdrop-blur-md">
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-ink text-cream-light"
                    : "text-ink-light hover:text-ink hover:bg-cream/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
