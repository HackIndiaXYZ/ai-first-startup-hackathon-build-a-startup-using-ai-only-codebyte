"use client";

import React from "react";
import { Sparkles, Terminal, Github, RotateCcw, Cpu } from "lucide-react";

interface NavbarProps {
  onOpenHowItWasBuilt: () => void;
  onReset?: () => void;
  hasPlan?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHowItWasBuilt,
  onReset,
  hasPlan,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-black shadow-sm font-bold text-sm tracking-tight">
              ▲
            </div>
            <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
              PitchPilot
              <span className="rounded border border-zinc-700 bg-zinc-900/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                v1.0
              </span>
            </span>
          </button>

          {/* Meta-narrative Pill (Judge Highlight) */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-xs text-zinc-400">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Built by AI, to help you build with AI</span>
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2">
          {hasPlan && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              title="Start with a new idea"
            >
              <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden sm:inline">New Idea</span>
            </button>
          )}

          {/* How This Was Built (AI Usage Report) */}
          <button
            onClick={onOpenHowItWasBuilt}
            className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI Architecture</span>
            <span className="rounded bg-cyan-950/80 px-1 text-[10px] font-mono text-cyan-300">
              Report
            </span>
          </button>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/HackIndiaXYZ/ai-first-startup-hackathon-build-a-startup-using-ai-only-codebyte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
            title="View Hackathon Repository on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
