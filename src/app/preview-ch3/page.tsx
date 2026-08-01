"use client";

import React, { use } from "react";
import { getScene } from "@/components/scenes";

const CHAPTER_ID = "5bd38ee4-dc52-5144-89a3-a51bbb35af15"; // Class 12 Chapter 3: Current Electricity

export default function PreviewCh3Page({ searchParams }: { searchParams: Promise<{ sec?: string }> }) {
  const resolvedParams = use(searchParams);
  const secNum = parseInt(resolvedParams?.sec || "1", 10);
  const SceneComponent = getScene(CHAPTER_ID, secNum);

  const mockReveals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
