"use client";

import katex from "katex";
import React, { useMemo } from "react";

interface KaTeXRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeXRenderer({
  latex,
  displayMode = true,
  className = "",
}: KaTeXRendererProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
      });
    } catch {
      return latex;
    }
  }, [latex, displayMode]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
