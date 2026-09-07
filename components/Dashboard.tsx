"use client";

import React, { useState } from "react";
import { StartupPlan } from "@/types/startup";
import { OnePagerTab } from "./tabs/OnePagerTab";
import { PitchDeckTab } from "./tabs/PitchDeckTab";
import { LandingPageTab } from "./tabs/LandingPageTab";
import { SpecTab } from "./tabs/SpecTab";
import { ExportBar } from "./ExportBar";
import {
  FileText,
  Layers,
  Layout,
  Code2,
  Clock,
  Sparkles,
  Share2,
} from "lucide-react";

interface DashboardProps {
  plan: StartupPlan;
  onReset: () => void;
}

type TabType = "one-pager" | "pitch-deck" | "landing-page" | "mvp-spec";

export const Dashboard: React.FC<DashboardProps> = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<TabType>("one-pager");

  const TABS = [
    {
      id: "one-pager" as TabType,
      label: "Validation One-Pager",
      icon: <FileText className="h-4 w-4" />,
      badge: "Strategy",
    },
    {
      id: "pitch-deck" as TabType,
      label: "Pitch Deck (10 Slides)",
      icon: <Layers className="h-4 w-4" />,
      badge: "Investor",
    },
    {
      id: "landing-page" as TabType,
      label: "Landing Page Preview",
      icon: <Layout className="h-4 w-4" />,
      badge: "Live Mockup",
    },
    {
      id: "mvp-spec" as TabType,
      label: "MVP Feature Spec",
      icon: <Code2 className="h-4 w-4" />,
      badge: "Tech Architecture",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Dashboard Top Header Bar */}
      <div className="border-b border-zinc-800 bg-[#0d0d0d]/80 px-4 py-6 sm:px-6 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
                <Sparkles className="h-3 w-3" />
                <span>Generated Startup Blueprint</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {plan.idea}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>Generated in {plan.durationSeconds}s</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Navigation Strip */}
          <div className="mt-6 flex flex-wrap gap-2 border-b border-zinc-800/80 pb-0">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "border-white text-white font-semibold"
                      : "border-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono ${
                      isActive
                        ? "bg-zinc-800 text-cyan-300"
                        : "bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {activeTab === "one-pager" && (
          <OnePagerTab research={plan.research} strategy={plan.strategy} />
        )}

        {activeTab === "pitch-deck" && (
          <PitchDeckTab
            slides={plan.copywriter.pitchDeck}
            startupIdea={plan.idea}
          />
        )}

        {activeTab === "landing-page" && (
          <LandingPageTab
            copy={plan.copywriter.landingPage}
            startupIdea={plan.idea}
          />
        )}

        {activeTab === "mvp-spec" && (
          <SpecTab spec={plan.spec} startupIdea={plan.idea} />
        )}
      </main>

      {/* Persistent Export Bottom Bar */}
      <ExportBar plan={plan} />
    </div>
  );
};
