"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Terminal,
  Layers,
  Sparkles,
  Search,
  Target,
  PenTool,
  Code2,
  ChevronRight,
} from "lucide-react";
import { AgentStage, AgentStageId } from "@/types/startup";

interface AgentPipelineProps {
  idea: string;
  activeStageIndex: number;
  stages: AgentStage[];
  elapsedSeconds: number;
  isComplete: boolean;
  onViewResults?: () => void;
}

const STAGE_ICONS: Record<AgentStageId, React.ReactNode> = {
  research: <Search className="h-4 w-4" />,
  strategy: <Target className="h-4 w-4" />,
  copywriter: <PenTool className="h-4 w-4" />,
  spec: <Code2 className="h-4 w-4" />,
};

export const AgentPipeline: React.FC<AgentPipelineProps> = ({
  idea,
  activeStageIndex,
  stages,
  elapsedSeconds,
  isComplete,
  onViewResults,
}) => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Initializing autonomous multi-agent pipeline orchestrator...",
    "Allocating model memory context & loading system prompts...",
  ]);

  // Append logs dynamically as stages change
  useEffect(() => {
    const currentStage = stages[activeStageIndex];
    if (!currentStage) return;

    if (currentStage.status === "running") {
      setTerminalLogs((prev) => [
        ...prev.slice(-15),
        `[${new Date().toLocaleTimeString()}] ▶ [${currentStage.name}] ${currentStage.caption}`,
      ]);
    } else if (currentStage.status === "done") {
      setTerminalLogs((prev) => [
        ...prev.slice(-15),
        `[${new Date().toLocaleTimeString()}] ✓ [${currentStage.name}] Completed successfully. Forwarding artifacts.`,
      ]);
    }
  }, [activeStageIndex, stages]);

  const completedCount = stages.filter((s) => s.status === "done").length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Background glow for the signature visual moment */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

      {/* Top Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Autonomous Agent Orchestration
          </div>
          <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl line-clamp-1">
            &ldquo;{idea}&rdquo;
          </h2>
        </div>

        {/* Stopwatch & Speed-as-a-Feature Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 font-mono text-xs">
            <Clock className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
            <span className="text-zinc-400">Time:</span>
            <span className="font-bold text-white tabular-nums">
              {elapsedSeconds}s
            </span>
            <span className="text-[10px] text-zinc-500">(&lt;90s SLA)</span>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 font-mono text-xs text-zinc-300">
            Progress: <span className="text-cyan-400 font-bold">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Overall Linear Progress Bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${Math.max(5, progressPercent)}%` }}
        />
      </div>

      {/* 4-Agent Pipeline Visual Stepper Cards */}
      <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, idx) => {
          const isRunning = stage.status === "running";
          const isDone = stage.status === "done";
          const isQueued = stage.status === "queued" || stage.status === "idle";

          return (
            <div
              key={stage.id}
              className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 ${
                isRunning
                  ? "border-cyan-500/80 bg-zinc-900/90 shadow-[0_0_20px_rgba(6,182,212,0.18)] translate-y-[-2px]"
                  : isDone
                  ? "border-emerald-500/40 bg-zinc-900/50"
                  : "border-zinc-800/60 bg-zinc-950/40 opacity-60"
              }`}
            >
              {/* Header inside card */}
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      isRunning
                        ? "bg-cyan-500/20 text-cyan-400"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {STAGE_ICONS[stage.id]}
                  </div>

                  {/* Status Badges */}
                  {isRunning && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[10px] font-mono uppercase text-cyan-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      Synthesizing
                    </span>
                  )}
                  {isDone && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Ready
                    </span>
                  )}
                  {isQueued && (
                    <span className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                      Queued
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Agent 0{idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {stage.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {stage.role}
                  </p>
                </div>
              </div>

              {/* Caption in Geist Mono */}
              <div className="mt-4 border-t border-zinc-800/60 pt-3">
                <p className="font-mono text-[11px] leading-relaxed text-zinc-400">
                  {stage.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Agent Terminal Feed (Geist Mono) */}
      <div className="mt-6 rounded-xl border border-zinc-800 bg-black/80 p-4 shadow-xl font-mono text-xs">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[11px] tracking-wide uppercase text-zinc-400">
              Multi-Agent Live Execution Stream
            </span>
          </div>
          <span className="text-[10px] text-zinc-500">
            Structured JSON Pipeline
          </span>
        </div>

        <div className="h-32 overflow-y-auto space-y-1.5 text-[11px] text-zinc-400 scroll-smooth">
          {terminalLogs.map((log, index) => (
            <div
              key={index}
              className={`leading-relaxed ${
                log.includes("▶")
                  ? "text-cyan-300 font-semibold"
                  : log.includes("✓")
                  ? "text-emerald-400"
                  : "text-zinc-400"
              }`}
            >
              {log}
            </div>
          ))}
          {activeStageIndex < stages.length && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
              <span className="inline-block h-2 w-1.5 bg-cyan-400" />
              <span>{stages[activeStageIndex]?.caption}</span>
            </div>
          )}
        </div>
      </div>

      {/* When completed, prominent CTA */}
      {isComplete && (
        <div className="mt-8 flex items-center justify-center animate-fade-in">
          <button
            onClick={onViewResults}
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4 text-black" />
            <span>Launch Startup Dashboard</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
};
