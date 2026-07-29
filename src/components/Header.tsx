"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadUserSession() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (isMounted && data) {
            setProfile(data);
          }
        } else {
          if (isMounted) setProfile(null);
        }
      } catch (err) {
        console.error("Error loading session in Header:", err);
      }
    }

    loadUserSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserSession();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/lessons");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Practice", href: "/practice" },
    { label: "Progress", href: "/progress" },
    { label: "Lessons", href: "/lessons" },
    { label: "Notes", href: "/notes" },
    { label: "My doubts", href: "/doubts" },
  ];

  const initial = profile?.display_name
    ? profile.display_name.trim().charAt(0).toUpperCase()
    : "S";

  const displayName = profile?.display_name || "Student";

  return (
    <header className="flex flex-col flex-none w-full z-40">
      {/* Night Band */}
      <div className="relative bg-[#16130E] text-[#EFEBDD] px-6 md:px-11 py-4.5 overflow-hidden">
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(90% 120% at 30% -20%, rgba(238,163,31,0.1), transparent 60%)",
          }}
        />
        <div className="relative max-w-[1180px] w-full mx-auto flex items-center justify-between gap-6">
          <Link href="/dashboard" className="flex items-center gap-1.5 flex-none">
            <svg viewBox="0 0 120 120" className="w-[44px] h-[44px]" fill="none">
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
            <span className="text-[1.52rem] leading-none tracking-tight">
              <b className="font-extrabold text-white">monk</b>
              <span className="font-medium text-[#938d80]">learning</span>
            </span>
          </Link>

          {/* Today's Push Banner */}
          <div className="hidden md:flex flex-1 min-w-0 border-l border-white/10 pl-6 items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="block font-extrabold text-[0.6rem] tracking-[0.16em] uppercase text-orange">
                  Today&apos;s push
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[0.58rem] tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/18 text-[#938d80]">
                  🔄 1 / 7
                </span>
              </div>
              <div className="text-[1.16rem] font-semibold text-[#EFEBDD] mt-1 leading-snug">
                One chapter tonight.{" "}
                <span className="font-script font-bold text-orange-light text-[1.1rem] inline-block -rotate-0.5">
                  70% marks tomorrow.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Nav Row */}
      <div className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-border-subtle px-6 md:px-11 py-2.5 z-30">
        <div className="max-w-[1180px] w-full mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <nav className="flex items-center gap-1.5 flex-nowrap">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-ink text-white font-bold"
                      : "text-ink-light hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right User Auth Action */}
          <div className="flex items-center gap-3.5 flex-none pl-2">
            {profile ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center gap-2 cursor-pointer py-1 px-2 rounded-full hover:bg-ink/5 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full grid place-items-center bg-gradient-to-br from-orange-light to-orange text-[#3A2A06] font-extrabold text-xs shadow-xs">
                    {initial}
                  </span>
                  <span className="font-bold text-xs text-ink hidden sm:inline-block">
                    {displayName}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 stroke-ink-light"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {menuOpen && (
                  <>
                    <div
                      onClick={() => setMenuOpen(false)}
                      className="fixed inset-0 z-40"
                    />
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 bg-white border border-border-subtle rounded-2xl shadow-ref-card p-2 animate-ml-rise">
                      <div className="p-3 border-b border-dashed border-border-subtle mb-1">
                        <b className="block font-bold text-xs text-ink truncate">
                          {displayName}
                        </b>
                        <span className="block text-[0.7rem] text-ink-muted mt-0.5 truncate">
                          Class {profile.enrolled_class || 11} · {profile.target_exam || "JEE"}
                        </span>
                      </div>

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold text-xs text-red-dark hover:bg-red-note/10 transition-colors text-left"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 stroke-current"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <path d="m16 17 5-5-5-5M21 12H9" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-ink text-cream-light hover:bg-ink/90 transition-colors shadow-xs"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
