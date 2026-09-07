"use client";

import React, { useState } from "react";
import { LandingPageCopy } from "@/types/startup";
import {
  Smartphone,
  Monitor,
  Copy,
  Check,
  Zap,
  Shield,
  Cpu,
  ArrowRight,
  ExternalLink,
  Code2,
  Sparkles,
} from "lucide-react";

interface LandingPageTabProps {
  copy: LandingPageCopy;
  startupIdea: string;
}

export const LandingPageTab: React.FC<LandingPageTabProps> = ({
  copy,
  startupIdea,
}) => {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"preview" | "code">("preview");

  const ICON_MAP: Record<string, React.ReactNode> = {
    Zap: <Zap className="h-5 w-5 text-cyan-400" />,
    Shield: <Shield className="h-5 w-5 text-cyan-400" />,
    Cpu: <Cpu className="h-5 w-5 text-cyan-400" />,
  };

  const generatedTsxCode = `import React from "react";
import { Zap, Shield, Cpu, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-zinc-800">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="font-bold text-lg tracking-tight">▲ Startup</div>
        <button className="rounded-md bg-white text-black px-4 py-1.5 text-xs font-semibold hover:bg-zinc-200 transition-colors">
          ${copy.ctaLabel}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400 mb-6">
          ${copy.socialProofBadge}
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          ${copy.heroHeadline}
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
          ${copy.subheadline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-lg bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2">
            <span>${copy.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-all">
            ${copy.secondaryCtaLabel}
          </button>
        </div>
        <p className="mt-4 text-xs text-zinc-500 font-mono">
          ${copy.pricingTeaser || "Free during beta • No credit card required"}
        </p>
      </section>

      {/* Value Props */}
      <section className="px-6 py-16 max-w-5xl mx-auto border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${copy.valueProps
            .map(
              (vp) => `
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="h-10 w-10 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center mb-4 text-cyan-400">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">${vp.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">${vp.description}</p>
          </div>`
            )
            .join("\n")}
        </div>
      </section>
    </div>
  );
}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedTsxCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          {/* Sub-tab switcher */}
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-950 p-1">
            <button
              onClick={() => setActiveSubTab("preview")}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                activeSubTab === "preview"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Live Mini-Page Preview
            </button>
            <button
              onClick={() => setActiveSubTab("code")}
              className={`flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-colors ${
                activeSubTab === "code"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Code2 className="h-3 w-3" />
              <span>React TSX Code</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === "preview" && (
            <div className="flex rounded-md border border-zinc-800 bg-zinc-900 p-0.5">
              <button
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewport === "desktop"
                    ? "bg-zinc-800 text-cyan-400 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Desktop viewport (100%)"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewport === "mobile"
                    ? "bg-zinc-800 text-cyan-400 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Mobile viewport (375px)"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          )}

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied TSX!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Viewport Render: Live Interactive Mini Landing Page */}
      {activeSubTab === "preview" ? (
        <div className="flex justify-center">
          <div
            className={`w-full transition-all duration-300 ${
              viewport === "mobile" ? "max-w-sm" : "max-w-5xl"
            }`}
          >
            {/* Simulated Browser Window Frame */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0d] shadow-2xl">
              {/* Browser Window Chrome */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="rounded-md border border-zinc-800 bg-zinc-900/90 px-4 py-0.5 text-[11px] font-mono text-zinc-400 truncate max-w-xs">
                  https://preview.startup.build
                </div>
                <div className="text-[10px] font-mono text-zinc-600">
                  {viewport === "mobile" ? "375 x 740" : "1200 x 800"}
                </div>
              </div>

              {/* Rendered Live Mini Landing Page */}
              <div className="p-6 sm:p-10 bg-[#0a0a0a] min-h-[480px]">
                {/* Mini Navbar */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-8">
                  <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-white">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-black text-[10px]">
                      ▲
                    </span>
                    <span>Startup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="rounded-md bg-white text-black px-3 py-1 text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm">
                      {copy.ctaLabel}
                    </button>
                  </div>
                </div>

                {/* Hero Section */}
                <div className="text-center py-6">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-0.5 text-[11px] text-zinc-400 mb-4 font-mono">
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                    <span>{copy.socialProofBadge}</span>
                  </div>

                  {/* Headline (under 8 words) */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {copy.heroHeadline}
                  </h1>

                  {/* Subheadline (under 20 words) */}
                  <p className="mt-3 text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
                    {copy.subheadline}
                  </p>

                  {/* Call to Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition-all shadow-sm">
                      <span>{copy.ctaLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all">
                      {copy.secondaryCtaLabel}
                    </button>
                  </div>

                  {/* Pricing Teaser */}
                  <p className="mt-3 text-[11px] font-mono text-zinc-500">
                    {copy.pricingTeaser || "Free during beta • No credit card required"}
                  </p>
                </div>

                {/* 3 Value Propositions Grid */}
                <div className="mt-10 pt-8 border-t border-zinc-900">
                  <div className="text-center mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      Core Value Propositions
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {copy.valueProps.map((vp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 transition-all hover:border-zinc-700"
                      >
                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-950/40">
                          {ICON_MAP[vp.iconName] || <Zap className="h-4 w-4 text-cyan-400" />}
                        </div>
                        <h3 className="text-xs font-semibold text-white">
                          {vp.title}
                        </h3>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
                          {vp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* React TSX Code View */
        <div className="rounded-xl border border-zinc-800 bg-black/90 p-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
            <span className="text-xs font-mono text-zinc-400">
              LandingPage.tsx (Ready to paste into Next.js)
            </span>
            <button
              onClick={handleCopyCode}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              {copied ? "Copied to clipboard!" : "Copy code"}
            </button>
          </div>
          <pre className="overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed p-2">
            <code>{generatedTsxCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
