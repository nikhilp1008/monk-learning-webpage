"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathTextProps {
  content?: string | null;
  className?: string;
}

export function MathText({ content, className = "" }: MathTextProps) {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    const renderMathString = (tex: string, displayMode: boolean): React.ReactNode => {
      try {
        const html = katex.renderToString(tex, {
          displayMode,
          throwOnError: false, // Malformed LaTeX degrades gracefully to text
        });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span>{tex}</span>;
      }
    };

    let processedContent = content;

    // Detect undelimited LaTeX expressions (e.g. \text{...}, \frac{...}, \, \mu, etc.)
    const hasDelimiters = processedContent.includes("$") || processedContent.includes("\\(");
    const hasLatexCmds = /\\(?:text|frac|,|pm|mu|theta|alpha|beta|sigma|omega|pi|infty|circ|text\{|[a-zA-Z]+)|\^[^{}\s]+|_[^{}\s]+/.test(processedContent);

    if (!hasDelimiters && hasLatexCmds) {
      // Auto-wrap segments containing LaTeX commands in $...$
      processedContent = processedContent.replace(
        /([a-zA-Z0-9.\s-]*\\[a-zA-Z,]+\{[^}]*\}[\w\s\\,^{}_-]*|[a-zA-Z0-9.\s-]*\\[a-zA-Z,]+[\w\s\\,^{}_-]*|[a-zA-Z0-9._-]+\^\{[^}]*\}|[a-zA-Z0-9._-]+_\{[^}]*\})/g,
        (match) => {
          if (match.trim() && (match.includes("\\") || match.includes("^") || match.includes("_"))) {
            return `$${match.trim()}$`;
          }
          return match;
        }
      );
    }

    // Split text by $...$ (inline) and $$...$$ (display)
    const parts = processedContent.split(/(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
        const math = part.slice(2, -2);
        return <React.Fragment key={index}>{renderMathString(math, true)}</React.Fragment>;
      }
      if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
        const math = part.slice(1, -1);
        return <React.Fragment key={index}>{renderMathString(math, false)}</React.Fragment>;
      }
      return <span key={index}>{part}</span>;
    });
  }, [content]);

  return <span className={className}>{renderedElements}</span>;
}
