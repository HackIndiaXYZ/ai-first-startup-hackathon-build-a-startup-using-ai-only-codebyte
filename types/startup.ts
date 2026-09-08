export interface Competitor {
  name: string;
  oneLineDifferentiation: string;
  threatLevel: "High" | "Medium" | "Low";
  weakness: string;
}

export interface MarketSize {
  tam: { value: string; description: string };
  sam: { value: string; description: string };
  som: { value: string; description: string };
  assumptions: string[];
}

export interface ResearchOutput {
  targetMarket: string;
  marketSize: MarketSize;
  competitors: Competitor[];
  validationSignal: string;
  sourceCitations?: string[];
}

export interface RiskItem {
  risk: string;
  mitigation: string;
  severity: "High" | "Medium" | "Low";
}

export interface StrategyOutput {
  problemStatement: string;
  whyNow: string;
  keyRisks: RiskItem[];
  singleBiggestOpportunity: string;
  unfairAdvantage: string;
}

export interface DeckSlide {
  slideNumber: number;
  category: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  takeaway: string;
  metrics?: { label: string; value: string }[];
  visualType?: "bullets" | "stats" | "split" | "timeline";
}

export interface ValueProp {
  title: string;
  description: string;
  iconName: string;
}

export interface LandingPageCopy {
  heroHeadline: string;
  subheadline: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
  valueProps: ValueProp[];
  socialProofBadge: string;
  pricingTeaser?: string;
}

export interface CopywriterOutput {
  pitchDeck: DeckSlide[];
  landingPage: LandingPageCopy;
}

export interface MvpFeature {
  name: string;
  userStory: string;
  techApproach: string;
  complexity: "Low" | "Medium" | "High";
}

export interface SpecOutput {
  mustHave: MvpFeature[];
  shouldHave: MvpFeature[];
  couldHave: MvpFeature[];
  recommendedTechStack: {
    frontend: string;
    backend: string;
    aiEngine: string;
    database: string;
    hosting: string;
  };
}

export type PlanSource = "live" | "preset" | "fallback";

export interface StartupPlan {
  idea: string;
  createdAt: string;
  durationSeconds: number;
  source?: PlanSource;
  research: ResearchOutput;
  strategy: StrategyOutput;
  copywriter: CopywriterOutput;
  spec: SpecOutput;
}

export type AgentStageId = "research" | "strategy" | "copywriter" | "spec";

export interface AgentStage {
  id: AgentStageId;
  name: string;
  role: string;
  caption: string;
  status: "idle" | "queued" | "running" | "done" | "error";
  startedAt?: number;
  completedAt?: number;
  logs: string[];
}
