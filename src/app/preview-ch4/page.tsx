"use client";

import React, { use } from "react";
import { getScene } from "@/components/scenes";

const CHAPTER_ID = "86b64ce4-24f5-5296-9cb2-f67b0989eca7"; // Class 12 Chapter 4: Moving Charges and Magnetism

export default function PreviewCh4Page({ searchParams }: { searchParams: Promise<{ sec?: string }> }) {
  const resolvedParams = use(searchParams);
  const secNum = parseInt(resolvedParams?.sec || "1", 10);
  const SceneComponent = getScene(CHAPTER_ID, secNum);

  const mockReveals = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div style={{ width: "1080px", height: "620px", background: "#fdfbf7", margin: "0 auto", position: "relative" }}>
      {SceneComponent ? (
        <SceneComponent currentTime={20} reveals={mockReveals} language="english" />
      ) : (
        <div style={{ padding: "40px", color: "red", fontSize: "24px" }}>
          No scene registered for Section {secNum}
        </div>
      )}
    </div>
  );
}
