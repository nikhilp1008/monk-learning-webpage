"use client";

import React, { use } from "react";
import { getScene } from "@/components/scenes";

const CHAPTER_ID = "cf5d01e5-1a4b-538b-9e72-4d7074b2f61d"; // Class 12 Chapter 5: Magnetism and Matter

export default function PreviewCh5Page({ searchParams }: { searchParams: Promise<{ sec?: string }> }) {
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
