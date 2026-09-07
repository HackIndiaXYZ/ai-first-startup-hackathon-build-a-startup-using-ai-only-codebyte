"use client";

import React, { useState } from "react";
import { SpecOutput, MvpFeature } from "@/types/startup";
import {
  Code2,
  Cpu,
  Layers,
  Check,
  Copy,
  Terminal,
  Sparkles,
  Database,
  Globe,
  Server,
} from "lucide-react";

interface SpecTabProps {
  spec: SpecOutput;
  startupIdea: string;
}

export const SpecTab: React.FC<SpecTabProps> = ({ spec, startupIdea }) => {
  const [activeCategory, setActiveCategory] = useState<"must" | "should" | "could" | "all">("all");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const getComplexityBadge = (complexity: "Low" | "Medium" | "High") => {
    switch (complexity) {
      case "Low":
        return "bg-emerald-950/60 text-emerald-400 border-emerald-800/40";
      case "Medium":
        return "bg-amber-950/60 text-amber-400 border-amber-800/40";
      case "High":
        return "bg-red-950/60 text-red-400 border-red-800/40";
    }
  };

  const aiImplementationPrompt = `# MVP Feature Specification & Technical Implementation Prompt
Project: ${startupIdea}

## Recommended Tech Stack:
- Frontend: ${spec.recommendedTechStack.frontend}
- Backend: ${spec.recommendedTechStack.backend}
- AI Engine: ${spec.recommendedTechStack.aiEngine}
- Database: ${spec.recommendedTechStack.database}
- Hosting: ${spec.recommendedTechStack.hosting}

## Must-Have Features (P0):
${spec.mustHave
  .map(
    (f, i) =>
      `${i + 1}. [${f.name}] (${f.complexity} Complexity)\n   - User Story: ${f.userStory}\n   - Technical Approach: ${f.techApproach}`
  )
  .join("\n\n")}

## Should-Have Features (P1):
${spec.shouldHave
  .map(
    (f, i) =>
      `${i + 1}. [${f.name}] (${f.complexity} Complexity)\n   - User Story: ${f.userStory}\n   - Technical Approach: ${f.techApproach}`
  )
  .join("\n\n")}

## Could-Have Features (P2):
${spec.couldHave
  .map(
    (f, i) =>
      `${i + 1}. [${f.name}] (${f.complexity} Complexity)\n   - User Story: ${f.userStory}\n   - Technical Approach: ${f.techApproach}`
  )
  .join("\n\n")}`;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiImplementationPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error("Failed to copy prompt", err);
    }
  };

  const renderFeatureList = (features: MvpFeature[], priorityLabel: string, color: string) => (
    <div className="space-y-3">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-zinc-800 bg-[#111111] p-4 transition-all hover:border-zinc-700"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${color}`} />
              <h4 className="text-sm font-semibold text-white">
                {feature.name}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {priorityLabel}
              </span>
              <span
                className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${getComplexityBadge(
                  feature.complexity
                )}`}
              >
                {feature.complexity}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            <strong className="text-zinc-300">User Story: </strong>
            {feature.userStory}
          </p>

          <div className="rounded-lg bg-black/60 p-2.5 border border-zinc-800/80">
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
              <Terminal className="h-3 w-3" />
              <span>Technical Approach for AI Code Assistant (Cursor / Antigravity):</span>
            </div>
            <p className="text-xs font-mono text-zinc-300 leading-relaxed">
              {feature.techApproach}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          {/* Priority filter buttons */}
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-950 p-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All Priorities
            </button>
            <button
              onClick={() => setActiveCategory("must")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                activeCategory === "must"
                  ? "bg-zinc-800 text-red-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Must-Have (P0)
            </button>
            <button
              onClick={() => setActiveCategory("should")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                activeCategory === "should"
                  ? "bg-zinc-800 text-amber-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Should-Have (P1)
            </button>
            <button
              onClick={() => setActiveCategory("could")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                activeCategory === "could"
                  ? "bg-zinc-800 text-blue-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Could-Have (P2)
            </button>
          </div>
        </div>

        {/* Copy as prompt for AI IDE button */}
        <button
          onClick={handleCopyPrompt}
          className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-cyan-500/50 hover:text-white"
          title="Copy full spec as structured markdown prompt to feed into Cursor or Antigravity"
        >
          {copiedPrompt ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied AI Coding Prompt!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-cyan-400" />
              <span>Copy for Cursor / Antigravity</span>
            </>
          )}
        </button>
      </div>

      {/* Recommended Tech Stack Architecture Card */}
      <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          Recommended MVP Technical Stack
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 mb-1">
              <Globe className="h-3 w-3" />
              Frontend
            </div>
            <p className="text-xs text-zinc-200 font-medium">
              {spec.recommendedTechStack.frontend}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 mb-1">
              <Server className="h-3 w-3" />
              Backend / API
            </div>
            <p className="text-xs text-zinc-200 font-medium">
              {spec.recommendedTechStack.backend}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <div className="text-[10px] font-mono uppercase text-cyan-400 flex items-center gap-1 mb-1">
              <Cpu className="h-3 w-3" />
              AI Reasoning
            </div>
            <p className="text-xs text-cyan-200 font-medium">
              {spec.recommendedTechStack.aiEngine}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 mb-1">
              <Database className="h-3 w-3" />
              Database
            </div>
            <p className="text-xs text-zinc-200 font-medium">
              {spec.recommendedTechStack.database}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 mb-1">
              <Globe className="h-3 w-3" />
              Deployment
            </div>
            <p className="text-xs text-zinc-200 font-medium">
              {spec.recommendedTechStack.hosting}
            </p>
          </div>
        </div>
      </div>

      {/* Prioritized Feature Lists */}
      <div className="space-y-6">
        {(activeCategory === "all" || activeCategory === "must") && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                Must-Have Features (P0 — Core Critical Path)
              </h3>
              <span className="text-xs text-zinc-500 font-mono">
                ({spec.mustHave.length} features)
              </span>
            </div>
            {renderFeatureList(spec.mustHave, "Must-Have", "bg-red-400")}
          </div>
        )}

        {(activeCategory === "all" || activeCategory === "should") && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                Should-Have Features (P1 — Retention & Usability)
              </h3>
              <span className="text-xs text-zinc-500 font-mono">
                ({spec.shouldHave.length} features)
              </span>
            </div>
            {renderFeatureList(spec.shouldHave, "Should-Have", "bg-amber-400")}
          </div>
        )}

        {(activeCategory === "all" || activeCategory === "could") && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                Could-Have Features (P2 — Expansion & Delight)
              </h3>
              <span className="text-xs text-zinc-500 font-mono">
                ({spec.couldHave.length} features)
              </span>
            </div>
            {renderFeatureList(spec.couldHave, "Could-Have", "bg-blue-400")}
          </div>
        )}
      </div>
    </div>
  );
};
