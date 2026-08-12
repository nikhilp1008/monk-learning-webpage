/**
 * Client-side mirror of the `ml_onboarded` cookie middleware.ts reads to
 * skip its `profiles` lookup on every navigation. See middleware.ts for the
 * full rationale -- this just keeps the two write sites (login, onboarding)
 * consistent instead of duplicating the cookie string by hand.
 */
export function setOnboardedCookie(onboarded: boolean): void {
  if (typeof document === "undefined") return;
  document.cookie = onboarded
    ? `ml_onboarded=1; path=/; max-age=${60 * 60 * 24 * 365}`
    : "ml_onboarded=; path=/; max-age=0";
}
