import { z } from "zod";
import {
  ResearchOutput,
  StrategyOutput,
  CopywriterOutput,
  SpecOutput,
  PlanSource,
} from "@/types/startup";
import {
  RESEARCH_AGENT_SYSTEM_PROMPT,
  STRATEGY_AGENT_SYSTEM_PROMPT,
  COPYWRITER_AGENT_SYSTEM_PROMPT,
  SPEC_AGENT_SYSTEM_PROMPT,
} from "./prompts";
import {
  ResearchOutputSchema,
  StrategyOutputSchema,
  CopywriterOutputSchema,
  SpecOutputSchema,
} from "./schemas";
import { PRESET_IDEAS, generateDynamicPlan } from "./presets";

// FIX 2: Extracted named constants for modern AI model versions
// Note: Verify against Google Gemini and Anthropic documentation for active model identifiers.
export const GEMINI_MODEL = "gemini-2.5-flash";
export const CLAUDE_MODEL = "claude-3-5-sonnet-latest";

export interface AgentExecutionResult<T> {
  data: T;
  source: PlanSource;
}

interface GenerateAgentOptions<T> {
  schema: z.ZodType<T>;
  systemPrompt: string;
  userPrompt: string;
}

// FIX 4: Robust JSON extraction and runtime Zod schema validation
function parseJsonResponse<T>(text: string, schema: z.ZodType<T>): T {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }

  const parsedJson = JSON.parse(cleaned);
  const validation = schema.safeParse(parsedJson);

  if (!validation.success) {
    const errorSummary = validation.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    throw new Error(`AI agent returned malformed data schema: ${errorSummary}`);
  }

  return validation.data;
}

// Call Google Gemini API
async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidateText) {
    throw new Error("No text candidate returned from Gemini");
  }
  return candidateText;
}

// Call Anthropic Claude API
async function callClaude(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const endpoint = "https://api.anthropic.com/v1/messages";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 3000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text;
  if (!text) {
    throw new Error("No text returned from Claude");
  }
  return text;
}

export async function executeAgent<T>({
  schema,
  systemPrompt,
  userPrompt,
}: GenerateAgentOptions<T>): Promise<T | null> {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  const claudeKey = process.env.ANTHROPIC_API_KEY;

  if (geminiKey) {
    try {
      const raw = await callGemini(geminiKey, systemPrompt, userPrompt);
      return parseJsonResponse<T>(raw, schema);
    } catch (err) {
      console.warn("Gemini call or schema validation failed, checking alternatives...", err);
    }
  }

  if (claudeKey) {
    try {
      const raw = await callClaude(claudeKey, systemPrompt, userPrompt);
      return parseJsonResponse<T>(raw, schema);
    } catch (err) {
      console.warn("Claude call or schema validation failed, checking fallback...", err);
    }
  }

  return null;
}

// Specific Agent Functions with Zod validation and source tracking
export async function runResearchAgent(idea: string): Promise<AgentExecutionResult<ResearchOutput>> {
  const preset = PRESET_IDEAS.find(
    (p) =>
      p.title.toLowerCase() === idea.toLowerCase() ||
      p.plan.idea.toLowerCase() === idea.toLowerCase()
  );
  if (preset) return { data: preset.plan.research, source: "preset" };

  const result = await executeAgent<ResearchOutput>({
    schema: ResearchOutputSchema,
    systemPrompt: RESEARCH_AGENT_SYSTEM_PROMPT,
    userPrompt: `Analyze this raw startup idea and generate the market research output in JSON:\n\nIdea: "${idea}"`,
  });

  if (result) return { data: result, source: "live" };
  return { data: generateDynamicPlan(idea).research, source: "fallback" };
}

export async function runStrategyAgent(
  idea: string,
  research: ResearchOutput
): Promise<AgentExecutionResult<StrategyOutput>> {
  const preset = PRESET_IDEAS.find(
    (p) =>
      p.title.toLowerCase() === idea.toLowerCase() ||
      p.plan.idea.toLowerCase() === idea.toLowerCase()
  );
  if (preset) return { data: preset.plan.strategy, source: "preset" };

  const result = await executeAgent<StrategyOutput>({
    schema: StrategyOutputSchema,
    systemPrompt: STRATEGY_AGENT_SYSTEM_PROMPT,
    userPrompt: `Generate the validation strategy one-pager in JSON based on the raw idea and research output:\n\nIdea: "${idea}"\n\nResearch Data:\n${JSON.stringify(research, null, 2)}`,
  });

  if (result) return { data: result, source: "live" };
  return { data: generateDynamicPlan(idea).strategy, source: "fallback" };
}

export async function runCopywriterAgent(
  idea: string,
  strategy: StrategyOutput
): Promise<AgentExecutionResult<CopywriterOutput>> {
  const preset = PRESET_IDEAS.find(
    (p) =>
      p.title.toLowerCase() === idea.toLowerCase() ||
      p.plan.idea.toLowerCase() === idea.toLowerCase()
  );
  if (preset) return { data: preset.plan.copywriter, source: "preset" };

  const result = await executeAgent<CopywriterOutput>({
    schema: CopywriterOutputSchema,
    systemPrompt: COPYWRITER_AGENT_SYSTEM_PROMPT,
    userPrompt: `Generate the 10-slide investor pitch deck and high-converting landing page copy in JSON based on:\n\nIdea: "${idea}"\n\nStrategy Data:\n${JSON.stringify(strategy, null, 2)}`,
  });

  if (result) return { data: result, source: "live" };
  return { data: generateDynamicPlan(idea).copywriter, source: "fallback" };
}

export async function runSpecAgent(
  idea: string,
  strategy: StrategyOutput,
  copywriter: CopywriterOutput
): Promise<AgentExecutionResult<SpecOutput>> {
  const preset = PRESET_IDEAS.find(
    (p) =>
      p.title.toLowerCase() === idea.toLowerCase() ||
      p.plan.idea.toLowerCase() === idea.toLowerCase()
  );
  if (preset) return { data: preset.plan.spec, source: "preset" };

  const result = await executeAgent<SpecOutput>({
    schema: SpecOutputSchema,
    systemPrompt: SPEC_AGENT_SYSTEM_PROMPT,
    userPrompt: `Generate the prioritized MVP technical feature specification in JSON based on:\n\nIdea: "${idea}"\n\nStrategy Data:\n${JSON.stringify(strategy, null, 2)}`,
  });

  if (result) return { data: result, source: "live" };
  return { data: generateDynamicPlan(idea).spec, source: "fallback" };
}
