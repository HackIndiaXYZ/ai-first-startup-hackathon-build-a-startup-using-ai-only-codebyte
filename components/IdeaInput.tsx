"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Flame } from "lucide-react";
import { PRESET_CHIPS } from "@/lib/ai/presets";

// FIX 7: Removed dead isLoading prop
interface IdeaInputProps {
  onGenerate: (idea: string, presetId?: string) => void;
}

export const IdeaInput: React.FC<IdeaInputProps> = ({ onGenerate }) => {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    onGenerate(idea);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (idea.trim()) {
        onGenerate(idea);
      }
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_CHIPS.find((p) => p.id === presetId);
    if (preset) {
      setIdea(preset.title);
      onGenerate(preset.title, preset.id);
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-72 w-full max-w-2xl -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-zinc-800/20 to-transparent blur-3xl" />

      {/* Hero Header */}
      <div className="text-center">
        {/* Top Micro-Label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-mono tracking-widest uppercase text-zinc-400">
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI Co-founder for Solo Founders
        </div>

        {/* Hero Title */}
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
          Type your idea. <br className="hidden sm:inline" />
          <span className="text-zinc-400">Get a startup.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 sm:text-lg">
          PitchPilot&apos;s autonomous 4-agent pipeline turns a raw concept into a
          validation one-pager, 10-slide deck, live landing page, and MVP spec
          in under 90 seconds.
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="relative rounded-xl border border-zinc-800 bg-[#111111]/90 p-2 shadow-2xl transition-all focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. AI meal planner for diabetics with real-time CGM glycemic response forecasting, plate vision, and insulin curve simulation..."
            className="w-full resize-none bg-transparent p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none sm:text-base sm:p-4 min-h-[110px]"
            rows={3}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 px-3 pt-3 sm:px-4 sm:pt-3">
            {/* Keyboard shortcut indicator */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400">
                ⌘
              </kbd>
              <span>+</span>
              <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400">
                Enter
              </kbd>
              <span className="ml-1 text-[11px] hidden sm:inline">to generate</span>
            </div>

            {/* Submit Button - Vercel Pure White Style */}
            <button
              type="submit"
              disabled={!idea.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm"
            >
              <span>Generate Startup Plan</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      {/* FIX 6: Preset Idea Chips using lightweight PRESET_CHIPS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-400" />
            Instant Demo Presets (1-Click Run)
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Zero typing required for judges
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {PRESET_CHIPS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className="group flex flex-col justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3.5 text-left transition-all hover:border-zinc-700 hover:bg-zinc-900/80 hover:translate-y-[-1px]"
            >
              <div>
                <span className="inline-block rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 mb-2">
                  {preset.badge}
                </span>
                <h3 className="text-xs font-medium text-zinc-200 group-hover:text-white line-clamp-1">
                  {preset.title}
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-800/40 text-[11px] font-mono text-zinc-400 group-hover:text-cyan-400">
                <span>Run Agent Pipeline</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Micro-Bar */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-zinc-900 pt-6 text-xs text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          4 Autonomous Agents
        </span>
        <span className="text-zinc-800">•</span>
        <span className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          Sub-90s Turnaround
        </span>
        <span className="text-zinc-800">•</span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          Export to Deck, React & Spec
        </span>
      </div>
    </div>
  );
};
