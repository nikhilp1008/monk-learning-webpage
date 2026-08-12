"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetSent, setResetSent] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (isMounted) {
        setEmail(user?.email || null);
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const sendReset = async () => {
    if (!email || resetting) return;
    setResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setResetSent(true);
    } catch (err) {
      console.error("Failed to send password reset:", err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
              Your account
            </h1>
            <p className="text-ink-light text-base mt-1.5">
              Sign-in details, plan and billing, and control over your data.
            </p>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 font-bold text-[0.82rem] px-4 py-2.5 rounded-full border border-border-subtle text-ink hover:border-ink transition-colors"
          >
            ← Back to profile
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading account...</span>
          </div>
        ) : !email ? (
          <div className="py-20 text-center text-ink-muted text-sm font-semibold">
            <Link href="/login" className="text-ink underline">
              Sign in
            </Link>{" "}
            to manage your account.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <div className="space-y-5">
              {/* Sign-in & security (real) */}
              <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-3">
                  Sign-in &amp; security
                </span>

                <div className="flex items-center justify-between gap-3 py-3 border-t border-border-subtle first:border-t-0">
                  <div>
                    <span className="block text-[0.72rem] font-bold text-ink-muted uppercase tracking-wide">
                      Email
                    </span>
                    <span className="text-[0.92rem] text-ink font-semibold">{email}</span>
                  </div>
                  <span className="text-[0.72rem] font-bold text-green-badge">✓ Verified</span>
                </div>

                <div className="flex items-center justify-between gap-3 py-3 border-t border-border-subtle">
                  <div>
                    <span className="block text-[0.72rem] font-bold text-ink-muted uppercase tracking-wide">
                      Password
                    </span>
                    <span className="text-[0.92rem] text-ink font-semibold">••••••••••</span>
                  </div>
                  <button
                    onClick={sendReset}
                    disabled={resetting || resetSent}
                    className="font-bold text-[0.78rem] px-3.5 py-2 rounded-full border border-border-subtle text-ink hover:border-ink transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {resetSent ? "Reset link sent" : resetting ? "Sending…" : "Change password"}
                  </button>
                </div>
                {resetSent && (
                  <p className="text-[0.76rem] text-ink-muted mt-2">
                    Check {email} for a link to set a new password.
                  </p>
                )}
              </div>

              {/* Privacy & data */}
              <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-3">
                  Privacy &amp; data
                </span>

                <div className="flex items-center justify-between gap-3 py-3 border-t border-border-subtle first:border-t-0">
                  <div>
                    <b className="block font-bold text-[0.86rem] text-ink">Download my data</b>
                    <span className="text-[0.74rem] text-ink-muted">
                      Email support and we&apos;ll send an export.
                    </span>
                  </div>
                  <a
                    href="mailto:support@monklearning.com?subject=Data export request"
                    className="font-bold text-[0.78rem] px-3.5 py-2 rounded-full border border-border-subtle text-ink hover:border-ink transition-colors"
                  >
                    Request
                  </a>
                </div>

                <div className="flex items-center justify-between gap-3 py-3 border-t border-border-subtle">
                  <div>
                    <b className="block font-bold text-[0.86rem] text-red-dark">Delete account</b>
                    <span className="text-[0.74rem] text-ink-muted">Permanently removes your data.</span>
                  </div>
                  {deleteConfirm ? (
                    <a
                      href="mailto:support@monklearning.com?subject=Delete my account"
                      className="font-bold text-[0.78rem] px-3.5 py-2 rounded-full bg-red-note text-white"
                    >
                      Email support →
                    </a>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      className="font-bold text-[0.78rem] px-3.5 py-2 rounded-full border border-red-note/40 text-red-dark hover:bg-red-note/8 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Plan & billing (no billing infra yet — honest placeholder) */}
              <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
                    Plan &amp; billing
                  </span>
                  <span className="text-[0.68rem] font-bold text-orange-dark bg-orange/12 px-2.5 py-0.5 rounded-full">
                    Early access
                  </span>
                </div>
                <b className="block font-bold text-[1rem] text-ink">MonkLearning</b>
                <p className="text-[0.8rem] text-ink-light mt-1.5 leading-relaxed">
                  You&apos;re in free early access — no billing has started yet. We&apos;ll notify you before
                  anything changes.
                </p>
              </div>

              {/* Devices & sessions */}
              <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-3">
                  Devices &amp; sessions
                </span>
                <div className="flex items-center justify-between gap-3 py-2">
                  <div>
                    <b className="block font-bold text-[0.86rem] text-ink">This device</b>
                    <span className="text-[0.74rem] text-ink-muted">Signed in now</span>
                  </div>
                  <span className="text-[0.7rem] font-bold text-green-badge bg-green-badge/12 px-2.5 py-1 rounded-full">
                    Current
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[0.76rem] text-ink-muted">
                  MonkLearning · v2.0 ·{" "}
                  <a href="mailto:support@monklearning.com" className="underline">
                    Help
                  </a>
                </span>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/lessons";
                  }}
                  className="font-bold text-[0.8rem] px-4 py-2 rounded-full border border-border-subtle text-red-dark hover:bg-red-note/8 transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
