import { NextRequest, NextResponse } from "next/server";
import {
  runResearchAgent,
  runStrategyAgent,
  runCopywriterAgent,
  runSpecAgent,
} from "@/lib/ai/client";
import { PRESET_IDEAS, generateDynamicPlan } from "@/lib/ai/presets";
import { StartupPlan, PlanSource } from "@/types/startup";

export const maxDuration = 60; // Allow 60 seconds on Vercel Pro/hobby
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, stage, previousData, presetId } = body;

    // Fast-path for presets if requested directly
    if (presetId) {
      const preset = PRESET_IDEAS.find((p) => p.id === presetId);
      if (preset) {
        return NextResponse.json({
          success: true,
          plan: { ...preset.plan, source: "preset" as PlanSource },
          source: "preset" as PlanSource,
        });
      }
    }

    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return NextResponse.json({ error: "Startup idea is required" }, { status: 400 });
    }

    const cleanIdea = idea.trim();

    // Stage-specific execution for client-orchestrated progress streaming (FIX 1 & FIX 3)
    if (stage === "research") {
      const res = await runResearchAgent(cleanIdea);
      return NextResponse.json({
        success: true,
        stage: "research",
        data: res.data,
        source: res.source,
      });
    }

    if (stage === "strategy") {
      const research = previousData?.research || (await runResearchAgent(cleanIdea)).data;
      const res = await runStrategyAgent(cleanIdea, research);
      return NextResponse.json({
        success: true,
        stage: "strategy",
        data: res.data,
        source: res.source,
      });
    }

    if (stage === "copywriter") {
      const strategy =
        previousData?.strategy ||
        (await runStrategyAgent(cleanIdea, (await runResearchAgent(cleanIdea)).data)).data;
      const res = await runCopywriterAgent(cleanIdea, strategy);
      return NextResponse.json({
        success: true,
        stage: "copywriter",
        data: res.data,
        source: res.source,
      });
    }

    if (stage === "spec") {
      // FIX B: Defensive reconstruction if strategy or copywriter is missing from previousData
      const strategy =
        previousData?.strategy ||
        (await runStrategyAgent(cleanIdea, (await runResearchAgent(cleanIdea)).data)).data;
      const copywriter =
        previousData?.copywriter || (await runCopywriterAgent(cleanIdea, strategy)).data;
      const res = await runSpecAgent(cleanIdea, strategy, copywriter);
      return NextResponse.json({
        success: true,
        stage: "spec",
        data: res.data,
        source: res.source,
      });
    }

    // Default: Execute full 4-stage pipeline sequentially
    const startTime = Date.now();

    // Check if idea matches a preset
    const presetMatch = PRESET_IDEAS.find(
      (p) =>
        p.title.toLowerCase() === cleanIdea.toLowerCase() ||
        p.plan.idea.toLowerCase() === cleanIdea.toLowerCase()
    );
    if (presetMatch) {
      return NextResponse.json({
        success: true,
        plan: { ...presetMatch.plan, source: "preset" as PlanSource },
        source: "preset" as PlanSource,
      });
    }

    // Run agents
    const resResearch = await runResearchAgent(cleanIdea);
    const resStrategy = await runStrategyAgent(cleanIdea, resResearch.data);
    const resCopywriter = await runCopywriterAgent(cleanIdea, resStrategy.data);
    const resSpec = await runSpecAgent(cleanIdea, resStrategy.data, resCopywriter.data);

    const overallSource: PlanSource =
      resResearch.source === "live" &&
      resStrategy.source === "live" &&
      resCopywriter.source === "live" &&
      resSpec.source === "live"
        ? "live"
        : "fallback";

    const durationSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    const fullPlan: StartupPlan = {
      idea: cleanIdea,
      createdAt: new Date().toISOString(),
      durationSeconds,
      source: overallSource,
      research: resResearch.data,
      strategy: resStrategy.data,
      copywriter: resCopywriter.data,
      spec: resSpec.data,
    };

    return NextResponse.json({ success: true, plan: fullPlan, source: overallSource });
  } catch (err: any) {
    console.error("API /api/generate error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate startup plan" },
      { status: 500 }
    );
  }
}
