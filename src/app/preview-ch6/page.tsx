"use client";

import React, { use } from "react";
import { getScene } from "@/components/scenes";

const CHAPTER_ID = "b8223a22-15d4-5760-886f-53750c7dc9e8"; // Class 12 Chapter 6: Electromagnetic Induction

export default function PreviewCh6Page({ searchParams }: { searchParams: Promise<{ sec?: string }> }) {
  const resolvedParams = use(searchParams);
  const secNum = parseInt(resolvedParams?.sec || "50", 10);
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
