"use client";

import React from "react";
import {
  ResearchOutput,
  StrategyOutput,
} from "@/types/startup";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Info,
} from "lucide-react";

interface OnePagerTabProps {
  research: ResearchOutput;
  strategy: StrategyOutput;
}

export const OnePagerTab: React.FC<OnePagerTabProps> = ({
  research,
  strategy,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner: Validation Signal */}
      {research.validationSignal && (
        <div className="flex items-start gap-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-4 text-xs text-cyan-200">
          <TrendingUp className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Market Validation Signal: </span>
            {research.validationSignal}
          </div>
        </div>
      )}

      {/* Problem & Why Now Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Problem Statement */}
        <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            Core Problem Statement
          </div>
          <p className="text-sm leading-relaxed text-zinc-200">
            {strategy.problemStatement}
          </p>
          <div className="mt-4 border-t border-zinc-800/60 pt-3 text-xs text-zinc-500">
            <span className="font-medium text-zinc-400">Target Segment: </span>
            {research.targetMarket}
          </div>
        </div>

        {/* Why Now */}
        <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Why Now (Macro Tailwinds)
          </div>
          <p className="text-sm leading-relaxed text-zinc-200">
            {strategy.whyNow}
          </p>
          <div className="mt-4 border-t border-zinc-800/60 pt-3 text-xs text-zinc-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Catalyzed by LLM reasoning breakthroughs & frictionless edge infrastructure</span>
          </div>
        </div>
      </div>

      {/* Market Sizing (TAM / SAM / SOM) Cards */}
      <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-cyan-400" />
            Market Sizing Breakdown (TAM / SAM / SOM)
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            Public Knowledge Estimates
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* TAM */}
          <div className="rounded-lg border border-zinc-800/90 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700">
            <div className="text-[11px] font-mono uppercase text-zinc-400">
              Total Addressable Market (TAM)
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-white">
              {research.marketSize.tam.value}
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {research.marketSize.tam.description}
            </p>
          </div>

          {/* SAM */}
          <div className="rounded-lg border border-zinc-800/90 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700">
            <div className="text-[11px] font-mono uppercase text-cyan-400">
              Serviceable Addressable (SAM)
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-cyan-300">
              {research.marketSize.sam.value}
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {research.marketSize.sam.description}
            </p>
          </div>

          {/* SOM */}
          <div className="rounded-lg border border-zinc-800/90 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700">
            <div className="text-[11px] font-mono uppercase text-emerald-400">
              Serviceable Obtainable (SOM)
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-emerald-400">
              {research.marketSize.som.value}
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {research.marketSize.som.description}
            </p>
          </div>
        </div>

        {/* Assumptions List */}
        {research.marketSize.assumptions && research.marketSize.assumptions.length > 0 && (
          <div className="mt-4 rounded-lg bg-zinc-950/60 p-3 border border-zinc-800/60">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Info className="h-3 w-3 text-zinc-500" />
              Key Sizing Assumptions & Methodologies
            </div>
            <ul className="space-y-1 text-xs text-zinc-400 list-disc list-inside">
              {research.marketSize.assumptions.map((assump, i) => (
                <li key={i}>{assump}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3 Direct Competitors Table */}
      <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <span>Competitive Differentiation Matrix</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            3 Direct Incumbents
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-500">
              <tr>
                <th className="pb-3 font-medium">Competitor</th>
                <th className="pb-3 font-medium">Our Differentiation Angle</th>
                <th className="pb-3 font-medium">Threat Level</th>
                <th className="pb-3 font-medium">Their Core Weakness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {research.competitors.map((comp, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3.5 font-semibold text-white">
                    {comp.name}
                  </td>
                  <td className="py-3.5 pr-4 text-zinc-200">
                    <span className="rounded bg-cyan-950/40 px-1.5 py-0.5 border border-cyan-800/30 text-cyan-300 font-medium">
                      {comp.oneLineDifferentiation}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] ${
                        comp.threatLevel === "High"
                          ? "bg-red-950/60 text-red-400 border border-red-800/40"
                          : comp.threatLevel === "Medium"
                          ? "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                          : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                      }`}
                    >
                      {comp.threatLevel}
                    </span>
                  </td>
                  <td className="py-3.5 text-zinc-400">
                    {comp.weakness}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk & Opportunity Matrix */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Risks & Mitigations (2 Cols) */}
        <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 lg:col-span-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            Key Execution Risks & Mitigation Playbooks
          </div>
          <div className="space-y-3">
            {strategy.keyRisks.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-zinc-200">
                    {item.risk}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                      item.severity === "High"
                        ? "text-red-400 bg-red-950/40 border border-red-900/40"
                        : "text-amber-400 bg-amber-950/40 border border-amber-900/40"
                    }`}
                  >
                    {item.severity} Risk
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-400 flex items-start gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-300">Mitigation: </strong>
                    {item.mitigation}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Biggest Opportunity & Unfair Advantage */}
        <div className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#111111] p-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
              <Lightbulb className="h-3.5 w-3.5 text-cyan-400" />
              Single Biggest Opportunity
            </div>
            <p className="text-xs leading-relaxed text-zinc-200">
              {strategy.singleBiggestOpportunity}
            </p>
          </div>

          <div className="mt-6 border-t border-zinc-800/80 pt-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              Unfair Advantage / Moat
            </div>
            <p className="text-xs text-zinc-300 font-medium">
              {strategy.unfairAdvantage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
