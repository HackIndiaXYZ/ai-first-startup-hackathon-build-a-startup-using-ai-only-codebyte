import { z } from "zod";

export const CompetitorSchema = z.object({
  name: z.string(),
  oneLineDifferentiation: z.string(),
  threatLevel: z.enum(["High", "Medium", "Low"]).catch("Medium"),
  weakness: z.string(),
});

export const MarketMetricSchema = z.object({
  value: z.string(),
  description: z.string(),
});

export const MarketSizeSchema = z.object({
  tam: MarketMetricSchema,
  sam: MarketMetricSchema,
  som: MarketMetricSchema,
  assumptions: z.array(z.string()).default([]),
});

export const ResearchOutputSchema = z.object({
  targetMarket: z.string(),
  marketSize: MarketSizeSchema,
  competitors: z.array(CompetitorSchema).min(1),
  validationSignal: z.string(),
  sourceCitations: z.array(z.string()).optional(),
});

export const RiskItemSchema = z.object({
  risk: z.string(),
  mitigation: z.string(),
  severity: z.enum(["High", "Medium", "Low"]).catch("Medium"),
});

export const StrategyOutputSchema = z.object({
  problemStatement: z.string(),
  whyNow: z.string(),
  keyRisks: z.array(RiskItemSchema).min(1),
  singleBiggestOpportunity: z.string(),
  unfairAdvantage: z.string(),
});

export const DeckSlideSchema = z.object({
  slideNumber: z.number(),
  category: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  takeaway: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  visualType: z.enum(["bullets", "stats", "split", "timeline"]).catch("bullets").optional(),
});

export const ValuePropSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconName: z.string(),
});

export const LandingPageCopySchema = z.object({
  heroHeadline: z.string(),
  subheadline: z.string(),
  ctaLabel: z.string(),
  secondaryCtaLabel: z.string(),
  valueProps: z.array(ValuePropSchema).min(1),
  socialProofBadge: z.string(),
  pricingTeaser: z.string().optional(),
});

export const CopywriterOutputSchema = z.object({
  pitchDeck: z.array(DeckSlideSchema).min(1),
  landingPage: LandingPageCopySchema,
});

export const MvpFeatureSchema = z.object({
  name: z.string(),
  userStory: z.string(),
  techApproach: z.string(),
  complexity: z.enum(["Low", "Medium", "High"]).catch("Medium"),
});

export const SpecOutputSchema = z.object({
  mustHave: z.array(MvpFeatureSchema).min(1),
  shouldHave: z.array(MvpFeatureSchema).default([]),
  couldHave: z.array(MvpFeatureSchema).default([]),
  recommendedTechStack: z.object({
    frontend: z.string(),
    backend: z.string(),
    aiEngine: z.string(),
    database: z.string(),
    hosting: z.string(),
  }),
});
