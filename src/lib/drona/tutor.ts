/**
 * Tutor persona + session language preferences.
 *
 * Single source of truth for the tutor's display name — never hardcode
 * "Drona" or "Veda" anywhere else, always call getTutorName().
 *
 * Mirrors app/drona/persona.py in the API repo. The two must agree: the
 * backend keys Hindi verb-form agreement (tutor.md Rule 12) and the Rumik
 * voice preset off the same choice.
 */

export type TutorVoice = "male" | "female";
export type SessionLanguage = "english" | "hinglish";

export const DEFAULT_VOICE: TutorVoice = "female";
export const DEFAULT_LANGUAGE: SessionLanguage = "hinglish";

const VOICE_STORAGE_KEY = "monk.drona.voice";
const LANGUAGE_STORAGE_KEY = "monk.drona.language";

export function getTutorName(
  voicePreference: TutorVoice | string = DEFAULT_VOICE
): string {
  return voicePreference === "male" ? "Drona" : "Veda";
}

/** "Learn with Veda" — the branded heading on the picker and session header. */
export function getLearnWithLabel(
  voicePreference: TutorVoice | string = DEFAULT_VOICE
): string {
  return `Learn with ${getTutorName(voicePreference)}`;
}

export function getLanguageLabel(language: SessionLanguage | string): string {
  return language === "english" ? "English" : "Hinglish";
}

export function isTutorVoice(value: unknown): value is TutorVoice {
  return value === "male" || value === "female";
}

export function isSessionLanguage(value: unknown): value is SessionLanguage {
  return value === "english" || value === "hinglish";
}

/* ─── Persistence ───
 * localStorage, not the profiles table: there is no profiles.drona_voice
 * column, and profiles.drona_language (migration 0007) is not read by any code
 * path today. Swapping this for a profile read is a one-function change.
 */

export function loadVoicePreference(): TutorVoice {
  if (typeof window === "undefined") return DEFAULT_VOICE;
  try {
    const stored = window.localStorage.getItem(VOICE_STORAGE_KEY);
    return isTutorVoice(stored) ? stored : DEFAULT_VOICE;
  } catch {
    return DEFAULT_VOICE;
  }
}

export function saveVoicePreference(voice: TutorVoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(VOICE_STORAGE_KEY, voice);
  } catch {
    // Private-mode / quota failures are not worth breaking the picker over.
  }
}

export function loadLanguagePreference(): SessionLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSessionLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function saveLanguagePreference(language: SessionLanguage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // See above.
  }
}
