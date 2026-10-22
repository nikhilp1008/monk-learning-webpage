"use client";

import type { ProofEvent } from "@/lib/proof";

/**
 * What the class that just ended moved, in one line from the teacher: the
 * most meaningful event leads, the rest are folded into the detail. Ported
 * from the phone's proof-moment.tsx; the copy is the phone's.
 */

interface Line {
  headline: string;
  detail?: string;
}

/**
 * Copy for the lead event. Every line states a fact the student can check
 * against their own Progress page — praise that can"t be verified is the kind
 * students learn to discount.
 */
function leadLine(event: ProofEvent): Line {
  switch (event.kind) {
    case "all_flags_cleared":
      return {
        headline: "Every flag is cleared.",
        detail: "Nothing is capping your score now. The ceiling is fully open.",
      };
    case "first_class":
      return {
        headline: "That was your first class.",
        detail: "The hardest one is behind you.",
      };
    case "first_doubt":
      return { headline: "First doubt solved." };
    case "first_question":
      return { headline: "First question answered." };
    case "chapter_strong":
      return {
        headline: `${event.subject ?? "A chapter"} is Strong.`,
        detail: "Every concept in it now holds up on questions you hadn’t seen.",
      };
    case "concept_strong":
      return { headline: `${event.subject ?? "A concept"} is Strong.` };
    case "flag_cleared":
      return {
        headline:
          event.amount && event.amount > 1 ? `${event.amount} flags cleared.` : "A flag cleared.",
        detail: "That lifts the ceiling your score can climb to.",
      };
    case "score_up":
      return { headline: `Your Monk Score moved up ${event.amount ?? 0}.` };
  }
}

/**
 * One line for everything the lead didn"t say. Concepts are counted rather
 * than listed, and the score delta is mentioned last because it is the
 * consequence of the proof, not the proof itself.
 */
function restLine(events: ProofEvent[], lead: ProofEvent): string | null {
  const parts: string[] = [];

  const concepts = events.filter((e) => e.kind === "concept_strong" && e !== lead).length;
  if (concepts > 0) {
    parts.push(`${concepts} concept${concepts === 1 ? "" : "s"} moved to Strong`);
  }

  const score = events.find((e) => e.kind === "score_up" && e !== lead);
  if (score?.amount) parts.push(`your score is up ${score.amount}`);

  if (!parts.length) return null;
  const sentence = parts.join(", and ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

export function describeProof(events: ProofEvent[]): Line | null {
  if (!events.length) return null;
  const [lead] = events;
  const line = leadLine(lead);
  // The lead"s own detail wins when there is one — it explains *why* the
  // headline matters, which a tally of the remainder never does.
  return { headline: line.headline, detail: line.detail ?? restLine(events, lead) ?? undefined };
}


export function ProofMoment({ events, teacher }: { events: ProofEvent[]; teacher: string }) {
  const line = describeProof(events);
  if (!line) return null;
  return (
    <div className="mb-6 rounded-[16px] bg-[#CDE9DA] px-5 py-4" role="status">
      <span className="font-script font-bold text-[#12703E] text-[0.95rem]">{teacher} noticed</span>
      <b className="block text-[1.05rem] text-ink mt-0.5">{line.headline}</b>
      {line.detail ? <p className="text-[0.88rem] text-ink-light mt-1 leading-snug">{line.detail}</p> : null}
    </div>
  );
}
