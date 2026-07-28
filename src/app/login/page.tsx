"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const getOrigin = () => {
    if (typeof window !== "undefined" && window.location.origin) {
      return window.location.origin;
    }
    return "";
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);
    try {
      const origin = getOrigin();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Google sign in error:", err);
      setErrorMsg("An unexpected error occurred with Google Sign-In.");
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const origin = getOrigin();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          },
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        if (data.session && data.user) {
          // Check if profile exists
          const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", data.user.id)
            .maybeSingle();

          if (!profile) {
            router.push("/onboarding");
          } else {
            router.push("/dashboard");
          }
        } else if (data.user && !data.session) {
          // Email confirmation enabled state
          setInfoMsg(
            "Account created! Please check your email inbox to confirm your address before logging in."
          );
          setLoading(false);
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setErrorMsg("Invalid email or password. Please try again.");
          } else {
            setErrorMsg(error.message);
          }
          setLoading(false);
          return;
        }

        if (data.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", data.user.id)
            .maybeSingle();

          if (!profile) {
            router.push("/onboarding");
          } else {
            router.push("/dashboard");
          }
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg("An unexpected authentication error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cream-light animate-ml-rise">
      {/* Left Column - Pitch Panel on Ruled Paper */}
      <div className="relative overflow-hidden flex flex-col justify-between bg-[#FFFEFB] border-r border-border-subtle p-8 md:p-14 lg:p-16">
        {/* Red Margin Line */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-12 md:left-16 w-[1.5px] bg-red-note/30 pointer-events-none"
        />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <svg viewBox="0 0 120 120" className="w-11 h-11 flex-none" fill="none">
            <circle
              cx="60"
              cy="60"
              r="36"
              stroke="#1C1A16"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="52 23.4"
              transform="rotate(-90 60 60)"
            />
            <circle
              cx="60"
              cy="60"
              r="19"
              stroke="#1C1A16"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="21.8 18"
              transform="rotate(-30 60 60)"
            />
            <circle cx="60" cy="60" r="6" className="fill-orange" />
          </svg>
          <span className="text-2xl leading-none tracking-tight">
            <b className="font-extrabold text-ink">monk</b>
            <span className="font-medium text-ink-muted">learning</span>
          </span>
        </div>

        {/* Main Pitch */}
        <div className="relative z-10 my-auto py-10 max-w-lg space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-ink">
              A personal teacher who{" "}
              <span className="font-script font-bold text-red-note whitespace-nowrap">
                never sleeps.
              </span>
            </h1>
            <p className="text-ink-light text-base md:text-lg mt-4 leading-relaxed">
              Monk teaches JEE &amp; NEET out loud on a real board — step by step, at your own pace.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 flex-none rounded-xl bg-white border border-border-subtle shadow-xs grid place-items-center">
                <svg viewBox="0 0 120 120" className="w-5 h-5" fill="none">
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    stroke="#1C1A16"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray="52 23.4"
                    transform="rotate(-90 60 60)"
                  />
                  <circle cx="60" cy="60" r="6" className="fill-orange" />
                </svg>
              </span>
              <div>
                <b className="block font-bold text-sm text-ink">
                  Live classes on a real board
                </b>
                <span className="text-xs text-ink-light">
                  Monk writes every step as he speaks — pause any time.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 flex-none rounded-xl bg-white border border-border-subtle shadow-xs grid place-items-center">
                <span className="font-bold text-lg text-ink">∞</span>
              </span>
              <div>
                <b className="block font-bold text-sm text-ink">
                  Unlimited chapter content
                </b>
                <span className="text-xs text-ink-light">
                  All 4 subjects across Class 11 and 12 ready to study.
                </span>
              </div>
            </div>
          </div>

          <div className="relative bg-white border-1.5 border-ink rounded-xl p-4 pl-9 shadow-md max-w-sm">
            <span className="absolute top-0 bottom-0 left-6 w-[1.4px] bg-red-note/35" />
            <span className="absolute -top-2.5 left-3 bg-orange border border-ink rounded px-2 py-0.5 font-extrabold text-[0.55rem] tracking-wider uppercase text-ink">
              LIVE NOW
            </span>
            <span className="block font-script font-bold text-sm text-red-note -rotate-0.5">
              torque on a hinged rod
            </span>
            <span className="block font-extrabold text-base text-ink mt-1">
              τ = r × F = r F sin θ
              <span className="inline-block w-0.5 h-4 bg-orange ml-1 align-middle animate-ml-blink" />
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap text-xs text-ink-light">
          <span className="font-semibold px-3 py-1 rounded-full border border-border-subtle bg-white">
            Hinglish
          </span>
          <span className="font-semibold px-3 py-1 rounded-full border border-border-subtle bg-white">
            English
          </span>
          <span className="font-script font-bold text-red-note text-sm ml-1">
            — padho apni bhasha mein.
          </span>
        </div>
      </div>

      {/* Right Column - Auth Card */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="flex p-1 bg-cream-card border border-border-subtle rounded-full mb-6">
            <button
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
                setInfoMsg("");
              }}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                mode === "signup"
                  ? "bg-white text-ink shadow-xs"
                  : "text-ink-light hover:text-ink"
              }`}
            >
              Create account
            </button>
            <button
              onClick={() => {
                setMode("signin");
                setErrorMsg("");
                setInfoMsg("");
              }}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                mode === "signin"
                  ? "bg-white text-ink shadow-xs"
                  : "text-ink-light hover:text-ink"
              }`}
            >
              Sign in
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              {mode === "signup" ? "Start learning today" : "Welcome back"}
            </h2>
            <p className="text-ink-light text-sm mt-1">
              {mode === "signup"
                ? "Create your account to save progress and customize your plan."
                : "Sign in to continue your lessons with Monk."}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-note/10 border border-red-note/30 text-red-note text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {infoMsg && (
            <div className="p-3.5 rounded-xl bg-orange/15 border border-orange/40 text-orange-dark text-xs font-semibold leading-relaxed">
              {infoMsg}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-border-subtle bg-white font-semibold text-sm text-ink hover:border-ink transition-colors shadow-2xs disabled:opacity-50"
          >
            <svg viewBox="0 0 48 48" className="w-4 h-4">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-border-subtle" />
            <span className="font-extrabold text-[0.62rem] tracking-widest text-ink-muted">
              OR
            </span>
            <span className="flex-1 h-px bg-border-subtle" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-light mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-white text-sm text-ink focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-light mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full px-4 py-3 pr-16 rounded-xl border border-border-subtle bg-white text-sm text-ink focus:outline-none focus:border-orange transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-xs font-bold text-ink-light hover:text-ink"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-orange text-ink font-bold text-sm shadow-md hover:-translate-y-0.5 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-ml-spin" />
              ) : mode === "signup" ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-xs text-ink-muted text-center pt-2">
            Or browse without signing in —{" "}
            <Link href="/lessons" className="font-semibold text-ink underline">
              All lessons are public
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
