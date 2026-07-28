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
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadUserSession() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: userProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (isMounted) {
            setProfile(userProfile || null);
          }
        } else {
          if (isMounted) {
            setProfile(null);
          }
        }
      } catch (err) {
        console.error("Error loading session in header:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUserSession();

    // Listen for auth state changes
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
      <div className="flex items-center justify-between gap-1.5 px-4 md:px-11 py-2.5 border-b border-border-subtle bg-white/60 sticky top-0 z-30 backdrop-blur-md">
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

        {/* User Session Menu / Sign In button */}
        <div className="relative flex items-center gap-3">
          {!loading && (
            <>
              {profile ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-cream/50 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full grid place-items-center bg-gradient-to-br from-orange-light to-orange text-ink font-extrabold text-sm shadow-xs">
                      {initial}
                    </span>
                    <span className="font-bold text-sm text-ink hidden sm:inline">
                      {profile.display_name}
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

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-border-subtle rounded-2xl shadow-xl p-2 z-50 animate-ml-rise">
                        <div className="p-2.5 border-b border-dashed border-border-subtle mb-1">
                          <b className="block font-bold text-sm text-ink truncate">
                            {profile.display_name}
                          </b>
                          <span className="block text-xs text-ink-muted mt-0.5">
                            Class {profile.enrolled_class} · {profile.target_exam}
                          </span>
                        </div>

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-sm text-red-note hover:bg-red-note/10 transition-colors"
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
                  className="font-bold text-xs md:text-sm px-4 py-1.5 rounded-full bg-orange text-ink shadow-xs hover:-translate-y-0.5 transition-transform"
                >
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
