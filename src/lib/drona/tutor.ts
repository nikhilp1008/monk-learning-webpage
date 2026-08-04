/**
 * Single source of truth for the tutor's display name.
 * "Drona" for male voice, "Veda" for female voice.
 * Never hardcode the tutor name anywhere else — always call this.
 */
export function getTutorName(
  voicePreference: "male" | "female" | string = "male"
): string {
  return voicePreference === "female" ? "Veda" : "Drona";
}
