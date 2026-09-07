"use client";

import React, { useState } from "react";
import {
  X,
  Cpu,
  Sparkles,
  Bot,
  Layers,
  Copy,
  Check,
  Zap,
  Code2,
  ExternalLink,
} from "lucide-react";

interface HowItWasBuiltModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWasBuiltModal: React.FC<HowItWasBuiltModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportMarkdown = `# HackIndia AI-First Startup Hackathon — AI Usage Report
Project: PitchPilot ("AI Co-founder for Solo Founders")
Team: CodeByte

## 1. Executive Summary & Meta-Narrative
PitchPilot was built 100% using autonomous AI coding tools to solve the exact problem solo hackathon participants face: turning raw startup concepts into investor-ready deliverables in under 90 seconds. "Built by AI, to help you build with AI."

## 2. Multi-Agent Pipeline Architecture
1. Research Agent: Analyzes market segments, computes TAM/SAM/SOM estimates with explicit assumptions, and benchmarked 3 direct incumbents.
2. Strategy Agent: Validates urgent problem statements, identifies macro 'Why Now' catalysts, and constructs risk/mitigation matrices.
3. Copywriter Agent: Synthesizes 10-slide investor decks and generates high-converting landing page copy with real-time browser preview.
4. Spec Agent: Formulates prioritized MVP feature roadmaps (Must/Should/Could) with one-sentence technical instructions tailored for AI code tools.

## 3. Tooling & Foundation Models
- Reasoning Engine: Google Gemini 1.5 Flash & Anthropic Claude 3.5 Sonnet with JSON Schema validation
- Autonomous Development: Antigravity IDE (DeepMind advanced agentic coding)
- Framework: Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React
- Deployment: Vercel Edge Runtime

## 4. AI-Generated vs. Human-Guided Mapping
- Product Architecture & Prompts: Co-designed with AI
- Code Implementation (Frontend, Backend, Types): 100% AI Generated
- Design System (Vercel Visual DNA, Geist Typography): AI Engineered
- Multi-Agent Orchestration & Presets: AI Generated & Verified
`;

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy report", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0f0f0f] p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
          <Cpu className="h-4 w-4" />
          <span>Hackathon Deliverable • AI Usage Report</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          How PitchPilot Was Built
        </h2>

        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Full transparency report for the HackIndia AI-First Startup Hackathon
          judges evaluating the <strong className="text-zinc-200">&ldquo;Best AI Usage&rdquo;</strong> and <strong className="text-zinc-200">&ldquo;Fastest Execution&rdquo;</strong> award categories.
        </p>

        {/* Meta-Narrative Callout */}
        <div className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 text-xs text-cyan-200">
          <div className="flex items-center gap-2 font-semibold text-white mb-1">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            The Meta-Narrative: Built by AI, to help you build with AI
          </div>
          <p className="text-zinc-300 leading-relaxed">
            PitchPilot autonomously creates the exact deliverables required by startup hackathons (market validation, pitch deck, landing page, and MVP spec) — demonstrating what is possible when AI agents act as full co-founders rather than simple chat bots.
          </p>
        </div>

        {/* 4-Agent Orchestration Blueprint */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Autonomous 4-Agent Pipeline
          </h3>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                1. Market Research Agent
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                Calculates TAM/SAM/SOM with explicit public assumptions and profiles 3 competitors with differentiation angles.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                2. Strategy Agent
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                Synthesizes urgent problem statements, macro &apos;Why Now&apos; inflection points, and key execution risk mitigations.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                3. Copywriter Agent
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                Crafts 10-slide investor pitch decks and high-converting landing page copy rendered live in an interactive frame.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                4. Technical Spec Agent
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                Generates prioritized Must/Should/Could MVP feature specs with actionable technical approaches for AI code assistants.
              </p>
            </div>
          </div>
        </div>

        {/* AI-Generated vs Human-Guided Matrix Table */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            AI-Generated vs. Human-Guided Breakdown
          </h3>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase">
                <tr>
                  <th className="p-2.5">Component</th>
                  <th className="p-2.5">Generation Method</th>
                  <th className="p-2.5">Human Oversight Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-2.5 font-medium text-white">Full-Stack Next.js 14 Code</td>
                  <td className="p-2.5 text-cyan-300">100% AI Generated</td>
                  <td className="p-2.5 text-zinc-400">Architecture prompt specification</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Multi-Agent System Prompts</td>
                  <td className="p-2.5 text-cyan-300">Prompt Engineered with AI</td>
                  <td className="p-2.5 text-zinc-400">Startup strategist role framing</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Vercel UI Design System</td>
                  <td className="p-2.5 text-cyan-300">100% AI Styled</td>
                  <td className="p-2.5 text-zinc-400">Tailwind & Geist token guidelines</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Startup Intelligence Presets</td>
                  <td className="p-2.5 text-cyan-300">Synthesized by AI</td>
                  <td className="p-2.5 text-zinc-400">Industry domain selection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
          <span className="text-[11px] font-mono text-zinc-500">
            HackIndia Hackathon • Team CodeByte
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-zinc-700 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Markdown!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy Report for Submission</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
