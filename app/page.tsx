"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/Navbar";
import { IdeaInput } from "@/components/IdeaInput";
import { AgentPipeline } from "@/components/AgentPipeline";
import { Dashboard } from "@/components/Dashboard";
import { HowItWasBuiltModal } from "@/components/HowItWasBuiltModal";
import { StartupPlan, AgentStage, AgentStageId, PlanSource } from "@/types/startup";
import { PRESET_IDEAS, generateDynamicPlan } from "@/lib/ai/presets";

const INITIAL_STAGES: AgentStage[] = [
  {
    id: "research",
    name: "Market Research Agent",
    role: "TAM/SAM/SOM & Competitor Benchmarking",
    caption: "Analyzing target demographics, calculating addressable market sizing, and profiling direct incumbents...",
    status: "idle",
    logs: [],
  },
  {
    id: "strategy",
    name: "Startup Strategy Agent",
    role: "Problem Validation & Risk Playbooks",
    caption: "Formulating urgent problem statement, identifying macro catalysts, and stress-testing key execution risks...",
    status: "idle",
    logs: [],
  },
  {
    id: "copywriter",
    name: "Conversion Copywriter Agent",
    role: "Pitch Deck & Landing Page Synthesis",
    caption: "Writing 10-slide investor presentation outline and crafting high-converting landing page copy...",
    status: "idle",
    logs: [],
  },
  {
    id: "spec",
    name: "Technical Spec Agent",
    role: "Pragmatic MVP Feature Architecture",
    caption: "Prioritizing Must/Should/Could features with actionable technical instructions for AI coding tools...",
    status: "idle",
    logs: [],
  },
];

export default function Home() {
  const [appState, setAppState] = useState<"idle" | "running" | "completed">("idle");
  const [idea, setIdea] = useState("");
  const [stages, setStages] = useState<AgentStage[]>(INITIAL_STAGES);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [plan, setPlan] = useState<StartupPlan | null>(null);
  const [isHowItWasBuiltOpen, setIsHowItWasBuiltOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedSecondsRef = useRef(0);

  // Timer runner during active generation
  useEffect(() => {
    if (appState === "running") {
      setElapsedSeconds(0);
      elapsedSecondsRef.current = 0;
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const nextVal = prev + 1;
          elapsedSecondsRef.current = nextVal;
          return nextVal;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [appState]);

  const handleStartGeneration = async (userIdea: string, presetId?: string) => {
    setIdea(userIdea);
    setAppState("running");
    setActiveStageIndex(0);

    const startTime = Date.now();

    // Reset stages to initial queued state with first stage running
    const freshStages: AgentStage[] = INITIAL_STAGES.map((s, idx) => ({
      ...s,
      status: idx === 0 ? "running" : "queued",
    }));
    setStages(freshStages);

    // Fast-path for presets if requested directly
    if (presetId) {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: userIdea, presetId }),
        });
        const data = await res.json();

        // Stagger visual completion across the 4 stages for UI feedback
        for (let i = 0; i < 4; i++) {
          setActiveStageIndex(i);
          setStages((prev) =>
            prev.map((s, idx) =>
              idx === i ? { ...s, status: "running" } : idx < i ? { ...s, status: "done" } : s
            )
          );
          await new Promise((r) => setTimeout(r, 350));
          setStages((prev) =>
            prev.map((s, idx) => (idx <= i ? { ...s, status: "done" } : s))
          );
        }

        setActiveStageIndex(4);
        const presetPlan: StartupPlan = {
          ...(data.plan || PRESET_IDEAS.find((p) => p.id === presetId)?.plan),
          source: "preset",
        };
        setPlan(presetPlan);

        // Celebratory confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#0070f3", "#38bdf8", "#10b981", "#ffffff"],
          });
        } catch (_) {}

        setTimeout(() => {
          setAppState("completed");
        }, 1000);
        return;
      } catch (presetErr) {
        console.warn("Preset fetch error, falling back to local preset data:", presetErr);
        const localPreset = PRESET_IDEAS.find((p) => p.id === presetId) || PRESET_IDEAS[0];
        setPlan({ ...localPreset.plan, source: "preset" });
        setStages((prev) => prev.map((s) => ({ ...s, status: "done" })));
        setAppState("completed");
        return;
      }
    }

    // Real per-stage sequential multi-agent execution (FIX 1)
    const stageIds: AgentStageId[] = ["research", "strategy", "copywriter", "spec"];
    const accumulatedData: Record<string, any> = {};
    let overallSource: PlanSource = "live";

    for (let i = 0; i < stageIds.length; i++) {
      const stageId = stageIds[i];

      // Update UI: Current stage running, previous stages done
      setActiveStageIndex(i);
      setStages((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "running" } : idx < i ? { ...s, status: "done" } : s
        )
      );

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idea: userIdea,
            stage: stageId,
            previousData: accumulatedData,
          }),
        });

        if (!response.ok) {
          throw new Error(`Stage ${stageId} returned status ${response.status}`);
        }

        const result = await response.json();
        if (result.source === "fallback") {
          overallSource = "fallback";
        }
        accumulatedData[stageId] = result.data;
      } catch (stageErr) {
        console.warn(`Stage ${stageId} failed, recovering with dynamic plan data:`, stageErr);
        overallSource = "fallback";
        const dynFallback = generateDynamicPlan(userIdea);
        accumulatedData[stageId] = (dynFallback as any)[stageId];
      }

      // Mark current stage done immediately when response is resolved
      setStages((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "done" } : s))
      );
    }

    // All 4 stages resolved
    setActiveStageIndex(4);
    const finalDuration = Math.max(
      1,
      elapsedSecondsRef.current || Math.round((Date.now() - startTime) / 1000)
    );

    const fullPlan: StartupPlan = {
      idea: userIdea,
      createdAt: new Date().toISOString(),
      durationSeconds: finalDuration,
      source: overallSource,
      research: accumulatedData.research,
      strategy: accumulatedData.strategy,
      copywriter: accumulatedData.copywriter,
      spec: accumulatedData.spec,
    };

    setPlan(fullPlan);

    // Celebratory confetti on completion
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#0070f3", "#38bdf8", "#10b981", "#ffffff"],
      });
    } catch (_) {}

    // Short delay before reveal so user sees all 4 green checkmarks
    setTimeout(() => {
      setAppState("completed");
    }, 1000);
  };

  const handleReset = () => {
    setAppState("idle");
    setPlan(null);
    setIdea("");
    setStages(INITIAL_STAGES);
    setElapsedSeconds(0);
    elapsedSecondsRef.current = 0;
    setActiveStageIndex(0);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] bg-grid-pattern">
      {/* Top Navbar */}
      <Navbar
        onOpenHowItWasBuilt={() => setIsHowItWasBuiltOpen(true)}
        onReset={handleReset}
        hasPlan={appState === "completed"}
      />

      {/* State 1: Hero & Idea Input */}
      {appState === "idle" && (
        <main>
          <IdeaInput onGenerate={handleStartGeneration} />
        </main>
      )}

      {/* State 2: Visible Multi-Agent Pipeline Takeover */}
      {appState === "running" && (
        <main className="min-h-[85vh] flex items-center justify-center">
          <AgentPipeline
            idea={idea}
            activeStageIndex={activeStageIndex}
            stages={stages}
            elapsedSeconds={elapsedSeconds}
            isComplete={activeStageIndex >= 4}
            onViewResults={() => setAppState("completed")}
          />
        </main>
      )}

      {/* State 3: Rich Tabbed Results Dashboard */}
      {appState === "completed" && plan && (
        <Dashboard plan={plan} onReset={handleReset} />
      )}

      {/* How This Was Built (Hackathon AI Usage Report Modal) */}
      <HowItWasBuiltModal
        isOpen={isHowItWasBuiltOpen}
        onClose={() => setIsHowItWasBuiltOpen(false)}
      />
    </div>
  );
}
