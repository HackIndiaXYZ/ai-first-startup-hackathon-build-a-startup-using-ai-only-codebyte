import { NextRequest, NextResponse } from "next/server";
import {
  runResearchAgent,
  runStrategyAgent,
  runCopywriterAgent,
  runSpecAgent,
} from "@/lib/ai/client";
import { PRESET_IDEAS, generateDynamicPlan } from "@/lib/ai/presets";
import { StartupPlan } from "@/types/startup";

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
        return NextResponse.json({ success: true, plan: preset.plan });
      }
    }

    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return NextResponse.json({ error: "Startup idea is required" }, { status: 400 });
    }

    const cleanIdea = idea.trim();

    // Stage-specific execution for client-orchestrated progress streaming
    if (stage === "research") {
      const research = await runResearchAgent(cleanIdea);
      return NextResponse.json({ success: true, stage: "research", data: research });
    }

    if (stage === "strategy") {
      const research = previousData?.research || (await runResearchAgent(cleanIdea));
      const strategy = await runStrategyAgent(cleanIdea, research);
      return NextResponse.json({ success: true, stage: "strategy", data: strategy });
    }

    if (stage === "copywriter") {
      const strategy = previousData?.strategy || (await runStrategyAgent(cleanIdea, await runResearchAgent(cleanIdea)));
      const copywriter = await runCopywriterAgent(cleanIdea, strategy);
      return NextResponse.json({ success: true, stage: "copywriter", data: copywriter });
    }

    if (stage === "spec") {
      const strategy = previousData?.strategy;
      const copywriter = previousData?.copywriter;
      const spec = await runSpecAgent(cleanIdea, strategy, copywriter);
      return NextResponse.json({ success: true, stage: "spec", data: spec });
    }

    // Default: Execute full 4-stage pipeline sequentially
    const startTime = Date.now();

    // Check if idea matches a preset
    const presetMatch = PRESET_IDEAS.find(
      (p) => p.title.toLowerCase() === cleanIdea.toLowerCase() || p.plan.idea.toLowerCase() === cleanIdea.toLowerCase()
    );
    if (presetMatch) {
      return NextResponse.json({ success: true, plan: presetMatch.plan });
    }

    // Run agents
    const research = await runResearchAgent(cleanIdea);
    const strategy = await runStrategyAgent(cleanIdea, research);
    const copywriter = await runCopywriterAgent(cleanIdea, strategy);
    const spec = await runSpecAgent(cleanIdea, strategy, copywriter);

    const durationSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    const fullPlan: StartupPlan = {
      idea: cleanIdea,
      createdAt: new Date().toISOString(),
      durationSeconds,
      research,
      strategy,
      copywriter,
      spec,
    };

    return NextResponse.json({ success: true, plan: fullPlan });
  } catch (err: any) {
    console.error("API /api/generate error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate startup plan" },
      { status: 500 }
    );
  }
}
