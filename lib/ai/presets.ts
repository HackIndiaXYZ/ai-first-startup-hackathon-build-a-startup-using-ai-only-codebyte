import { StartupPlan } from "@/types/startup";

export interface PresetIdea {
  id: string;
  badge: string;
  title: string;
  description: string;
  plan: StartupPlan;
}

export const PRESET_IDEAS: PresetIdea[] = [
  {
    id: "diabetes-cgm",
    badge: "HealthTech / BioAI",
    title: "AI meal planner for diabetics",
    description: "Personalized glycemic forecasting combining CGM telemetry, meal photo analysis, and insulin sensitivity curves.",
    plan: {
      idea: "AI meal planner for diabetics with real-time CGM glycemic response forecasting",
      createdAt: new Date().toISOString(),
      durationSeconds: 42,
      research: {
        targetMarket: "537M global diabetic & pre-diabetic adults using or adopting Continuous Glucose Monitors (CGMs, e.g. Dexcom G7, Abbott Freestyle Libre).",
        marketSize: {
          tam: { value: "$31.4B", description: "Global digital diabetes management & personalized nutrition market by 2028." },
          sam: { value: "$6.2B", description: "US & EU CGM users actively purchasing nutrition software subscriptions." },
          som: { value: "$94M", description: "150,000 paid subscribers at $52/mo within 36 months of launch." },
          assumptions: [
            "12.8M CGM users in the US alone growing at 19.4% CAGR (Dexcom/Abbott Q3 2024 earnings)",
            "Average willingness-to-pay for metabolic coaching is $40–$80/mo (Noom, Levels Health benchmarks)",
            "Direct-to-consumer acquisition CAC of $85 payback in 2.2 months via endocrinologist referrals"
          ]
        },
        competitors: [
          {
            name: "Levels Health",
            oneLineDifferentiation: "PitchPilot predicts exact post-prandial blood spikes *before* eating via computer vision, whereas Levels only graphs retrospective spikes.",
            threatLevel: "High",
            weakness: "Non-diabetic wellness focus, expensive proprietary sensor markups ($199/yr + sensors)."
          },
          {
            name: "Nutrisense",
            oneLineDifferentiation: "Fully automated instant AI dietitian responding in 3 seconds versus human dietitians with 24-hour response lag.",
            threatLevel: "Medium",
            weakness: "High cost of human nutritionists ($225/mo), limited automated meal substitution intelligence."
          },
          {
            name: "MyFitnessPal (Under Armour)",
            oneLineDifferentiation: "Biomarker-coupled glycemic response indexing instead of blunt, uncalibrated calorie counting.",
            threatLevel: "Medium",
            weakness: "Zero continuous blood glucose sensor integration, ad-heavy legacy interface."
          }
        ],
        validationSignal: "83% of surveyed CGM users report meal anxiety when dining out due to unknown glycemic impact."
      },
      strategy: {
        problemStatement: "Diabetics make 180+ daily nutritional decisions while suffering catastrophic blood sugar volatility. Traditional calorie trackers ignore individual insulin sensitivity, and CGM graphs only warn patients *after* irreversible glycemic damage has already occurred.",
        whyNow: "Over-the-counter CGM availability (FDA approval of Dexcom Stelo and Abbott Lingo in 2024) expands the market 10x beyond prescription hurdles, while multimodal vision models can now extract exact macronutrient densities from a single camera snapshot.",
        keyRisks: [
          {
            risk: "FDA classification as Software as a Medical Device (SaMD) if providing diagnostic advice.",
            mitigation: "Position strictly as an educational 'meal preview simulator' under wellness guidelines while gathering clinical trial data for 510(k) pathway.",
            severity: "High"
          },
          {
            risk: "Bluetooth sensor disconnection and proprietary CGM API throttling.",
            mitigation: "Leverage Apple HealthKit and Google Health Connect local sync bridges to guarantee zero-latency data ingest without proprietary cloud locks.",
            severity: "Medium"
          },
          {
            risk: "High churn if users normalize habits after 3 months.",
            mitigation: "Introduce dynamic pantry grocery delivery integrations (Instacart API) and dining-out restaurant geo-recommendations.",
            severity: "Medium"
          }
        ],
        singleBiggestOpportunity: "Becoming the ubiquitous biological intelligence layer between food delivery apps and wearable metabolic sensors.",
        unfairAdvantage: "Proprietary predictive glycemic response neural net trained on multimodal meal photos mapped against 5-minute CGM telemetry deltas."
      },
      copywriter: {
        pitchDeck: [
          {
            slideNumber: 1,
            category: "Vision",
            title: "Predict Your Blood Sugar Before The First Bite",
            subtitle: "The autonomous glycemic copilot for 537 million people living with diabetes.",
            bullets: [
              "Snap a plate, see your projected 2-hour glucose curve in 2 seconds",
              "Powered by CGM telemetry and multimodal nutritional AI",
              "Eliminating post-meal anxiety and diabetic complications forever"
            ],
            takeaway: "Preventing glucose spikes before they start.",
            visualType: "stats"
          },
          {
            slideNumber: 2,
            category: "Problem",
            title: "180 Decisions A Day. All Reactive.",
            subtitle: "Diabetic nutrition tracking is currently broken.",
            bullets: [
              "Current CGMs only ring alarms after spikes reach toxic 200+ mg/dL levels",
              "Generic calorie counters fail: a banana causes a spike in Patient A and flatlines Patient B",
              "$9,600 average annual healthcare expense per diabetic in preventable ER interventions"
            ],
            takeaway: "Diabetics need predictive foresight, not retrospective alarms.",
            visualType: "bullets"
          },
          {
            slideNumber: 3,
            category: "Solution",
            title: "Glucopilot: Autonomous Glycemic Simulation",
            subtitle: "Computer vision meets personal metabolic digital twins.",
            bullets: [
              "Multimodal plate analysis: Instant carb, fat, fiber, and protein segmentation",
              "Personalized sensitivity curve: Learns your unique insulin resistance in 7 days",
              "Counterfactual suggestions: 'Swap brown rice for quinoa to avoid the 45 mg/dL spike'"
            ],
            takeaway: "Actionable food substitutions before you swallow.",
            visualType: "bullets"
          },
          {
            slideNumber: 4,
            category: "Market Size",
            title: "$31.4B Digital Metabolic Health Market",
            subtitle: "Accelerated by over-the-counter CGM democratization.",
            bullets: [
              "TAM: $31.4B global digital diabetes management and metabolic health",
              "SAM: $6.2B US & EU patients actively monitoring via wearables",
              "SOM: $94M capturing 150k subscribers in Year 3"
            ],
            takeaway: "A hyper-engaged, life-critical recurring revenue consumer base.",
            visualType: "stats",
            metrics: [
              { label: "TAM", value: "$31.4B" },
              { label: "SAM", value: "$6.2B" },
              { label: "Year 3 SOM", value: "$94M" }
            ]
          },
          {
            slideNumber: 5,
            category: "Product",
            title: "Zero-Friction 3-Second Interaction",
            subtitle: "Built for daily real-world dining.",
            bullets: [
              "Camera Snap → Instant Glycemic Forecast Overlay",
              "Automated restaurant menu scanner via OCR",
              "Background HealthKit CGM synchronization with zero manual entry"
            ],
            takeaway: "Designed for effortless daily habit formation.",
            visualType: "split"
          },
          {
            slideNumber: 6,
            category: "Business Model",
            title: "Subscription SaaS + Health Plan Reimbursement",
            subtitle: "High margins with high retention.",
            bullets: [
              "Direct-to-Consumer Pro: $29/mo or $299/yr for real-time AI meal simulation",
              "B2B2C Clinic Tier: $45/patient/mo eligible for Remote Patient Monitoring (RPM) CPT codes",
              "88% gross margin software model"
            ],
            takeaway: "Dual B2C self-serve and B2B medical insurance monetization.",
            visualType: "stats"
          },
          {
            slideNumber: 7,
            category: "Traction & Roadmap",
            title: "Clinical Pilot & Rapid User Growth",
            subtitle: "From beta validation to clinical trials.",
            bullets: [
              "Month 0–3: 2,500 beta users logged 450,000 meals with 4.8★ rating",
              "Month 4–9: Integration with Dexcom & Abbott SDKs + Instacart grocery bridge",
              "Month 10–18: Prospective IRB-approved clinical study demonstrating HbA1c reduction"
            ],
            takeaway: "Strong early retention: 74% Month 3 cohort retention.",
            visualType: "timeline"
          },
          {
            slideNumber: 8,
            category: "Competitive Advantage",
            title: "The Glycemic Knowledge Graph",
            subtitle: "A proprietary compounding data flywheel.",
            bullets: [
              "Each validated meal + CGM trace refines our individualized biological model",
              "High switching costs: personal metabolic twins improve accuracy over time",
              "Defensible patent on real-time pre-prandial macronutrient curve simulation"
            ],
            takeaway: "A self-reinforcing algorithmic moat.",
            visualType: "bullets"
          },
          {
            slideNumber: 9,
            category: "Team",
            title: "Biomedical Engineers & Full-Stack AI Builders",
            subtitle: "Complementary domain mastery.",
            bullets: [
              "CEO: Ex-Dexcom Product Lead, Type-1 diabetic for 14 years",
              "CTO: Stanford AI Lab PhD, published author in multimodal computer vision",
              "Advisory Board: 2 Stanford Endocrinology Clinic heads"
            ],
            takeaway: "Uniquely equipped to navigate both clinical and consumer spaces.",
            visualType: "bullets"
          },
          {
            slideNumber: 10,
            category: "The Ask",
            title: "Raising $2.0M Seed Round",
            subtitle: "Scaling from 2.5k to 50k paid subscribers.",
            bullets: [
              "55% Applied ML Engineering & sensor telemetry latency",
              "30% Performance marketing & endocrinology clinic acquisition channel",
              "15% Regulatory & ISO-27001 HIPAA compliance auditing"
            ],
            takeaway: "18 months runway to reach $8M ARR and series A milestones.",
            visualType: "stats",
            metrics: [
              { label: "Target Raise", value: "$2.0M" },
              { label: "Runway", value: "18 Mo" },
              { label: "Milestone", value: "$8M ARR" }
            ]
          }
        ],
        landingPage: {
          heroHeadline: "Predict Your Glucose Before Eating",
          subheadline: "Snap a photo of your plate. See your exact CGM curve in 3 seconds before you take a bite.",
          ctaLabel: "Start Free 14-Day Trial",
          secondaryCtaLabel: "See 3-Minute Live Demo",
          valueProps: [
            {
              title: "Pre-Prandial Vision AI",
              description: "Instantly recognizes meal ingredients and calculates your personalized glycemic spike before eating.",
              iconName: "Zap"
            },
            {
              title: "Syncs With Dexcom & Libre",
              description: "Zero manual data logging. Seamless background sync via Apple Health and Google Health Connect.",
              iconName: "Shield"
            },
            {
              title: "One-Tap Smart Substitutions",
              description: "Recommends effortless ingredient swaps to keep your blood glucose safely in range.",
              iconName: "Cpu"
            }
          ],
          socialProofBadge: "Trusted by 14,000+ CGM users & endocrinologists",
          pricingTeaser: "Try risk-free • No credit card required"
        }
      },
      spec: {
        mustHave: [
          {
            name: "Multimodal Meal Photo Segmentation",
            userStory: "As a diabetic user, I want to photograph my meal so the app automatically estimates carbs and glycemic load.",
            techApproach: "Next.js Route Handler sends image to multimodal LLM with structured JSON output returning ingredient breakdown and estimated net carbs.",
            complexity: "Medium"
          },
          {
            name: "Continuous Glucose Monitor Sync Bridge",
            userStory: "As a user, I want my CGM readings to import automatically without typing blood sugar values.",
            techApproach: "Client-side HealthKit/Health Connect connector polling background glucose data every 5 minutes with SQLite local cache.",
            complexity: "High"
          },
          {
            name: "Predictive Glucose Curve Visualizer",
            userStory: "As a user, I want to view a graph of my anticipated blood sugar over the next 3 hours.",
            techApproach: "Canvas/SVG interactive curve component overlaying user's historical insulin sensitivity against meal macronutrient absorption rates.",
            complexity: "Medium"
          }
        ],
        shouldHave: [
          {
            name: "Smart Food Swaps & Portion Slider",
            userStory: "As a user, I want to adjust portion size dynamically to see how it flattens my spike curve.",
            techApproach: "Client-side state slider instantly recalculating curve polynomial coefficients without round-trip network lag.",
            complexity: "Low"
          },
          {
            name: "Restaurant Menu OCR Scanner",
            userStory: "As a user dining out, I want to photograph a menu and see top diabetic-friendly choices.",
            techApproach: "Tesseract OCR or Gemini Vision parsing menu dishes with immediate traffic-light glycemic ratings.",
            complexity: "Medium"
          },
          {
            name: "Spike Alert Notification & Walk Prompts",
            userStory: "As a user, I want proactive alerts recommending a 10-minute walk if a spike is anticipated.",
            techApproach: "Web Push / Service Worker notification triggered when simulated slope exceeds 3.5 mg/dL per minute.",
            complexity: "Low"
          }
        ],
        couldHave: [
          {
            name: "Instacart Low-Glycemic Grocery Cart Sync",
            userStory: "As a user, I want to add safe meal ingredients directly into my digital grocery cart.",
            techApproach: "Instacart Affiliate API webhook translating recommended weekly meal recipes into itemized cart orders.",
            complexity: "Medium"
          },
          {
            name: "Endocrinologist PDF Export Report",
            userStory: "As a patient, I want to generate a clinical PDF summary of time-in-range for my doctor visits.",
            techApproach: "Headless Chromium PDF generator generating standard ambulatory glucose profile (AGP) charts.",
            complexity: "Medium"
          },
          {
            name: "Family Guardian Glucose Alert Webhook",
            userStory: "As a parent of a diabetic child, I want immediate SMS notifications for impending nighttime hypoglycemia.",
            techApproach: "Twilio API webhook trigger connected to edge threshold monitoring worker.",
            complexity: "Low"
          }
        ],
        recommendedTechStack: {
          frontend: "Next.js 14 App Router, TypeScript, Tailwind CSS, Recharts",
          backend: "Next.js Server Actions with Edge runtime execution",
          aiEngine: "Google Gemini 1.5 Flash Vision for sub-second meal macronutrient classification",
          database: "PostgreSQL (Supabase) with time-series partitions for 5-minute CGM telemetry",
          hosting: "Vercel Enterprise Edge with HIPAA-compliant encryption in transit and at rest"
        }
      }
    }
  },
  {
    id: "micro-saas-bug-triager",
    badge: "DevTools / Autonomous AI",
    title: "Autonomous micro-SaaS bug triager",
    description: "AI agent that inspects Sentry stack traces and GitHub issues, spins up an isolated sandbox, reproduces the bug, and opens a tested pull request.",
    plan: {
      idea: "Autonomous micro-SaaS bug triager that reproduces GitHub issues and generates PR fixes",
      createdAt: new Date().toISOString(),
      durationSeconds: 38,
      research: {
        targetMarket: "45,000+ indie developers, solo founders, and micro-SaaS teams spending 20+ hours weekly on manual bug triage and error reproduction.",
        marketSize: {
          tam: { value: "$18.6B", description: "Global automated software testing and developer productivity tool market." },
          sam: { value: "$3.4B", description: "SaaS startups with 1-10 engineers using GitHub, Linear, and Sentry." },
          som: { value: "$48M", description: "8,000 engineering teams at $499/mo within 24 months." },
          assumptions: [
            "Solo founders spend 35% of engineering time debugging edge-case customer reports",
            "Median cost per engineering hour is $95; autonomous bug reproduction saves 15 hours/week ($5,700/mo)",
            "GitHub Marketplace and Sentry Integration ecosystems provide zero-CAC self-serve distribution"
          ]
        },
        competitors: [
          {
            name: "Codis / Devin (Cognition)",
            oneLineDifferentiation: "PitchPilot BugTriager is a dedicated 1-click GitHub App focused 100% on reproduction and micro-PRs without high $500/mo seats or complex prompts.",
            threatLevel: "High",
            weakness: "Expensive enterprise orientation, high compute burn, broad unconstrained scope."
          },
          {
            name: "Sweep.dev",
            oneLineDifferentiation: "Sweeps write code from comments; BugTriager boots the actual runtime in e2b sandboxes to verify the fix passes unit tests before pinging humans.",
            threatLevel: "Medium",
            weakness: "Frequently generates unverified hallucinated code without executing test suites."
          },
          {
            name: "Sentry Seer",
            oneLineDifferentiation: "Provides end-to-end Git PR branch creation with regression test additions, not just root-cause summaries in an issue comment.",
            threatLevel: "Medium",
            weakness: "Only summarizes telemetry; lacks autonomous sandbox compilation and code generation."
          }
        ],
        validationSignal: "Over 68% of solo founders report issue backlog anxiety as their single largest bottleneck to launching new features."
      },
      strategy: {
        problemStatement: "Solo developers and micro-SaaS teams are overwhelmed by inbound bug reports and Sentry exception noise. 60% of triage time is wasted simply trying to reproduce environment states and write repetitive boilerplate test fixes.",
        whyNow: "Containerized micro-VM sandboxes (e2b, Fly machines) now boot in under 300ms, and LLMs have crossed the threshold of deterministic test-driven synthesis.",
        keyRisks: [
          {
            risk: "AI hallucinating flawed fixes that break production databases or introduce security vulnerabilities.",
            mitigation: "Strict sandbox isolation with required green-light test execution before any PR is submitted, paired with automated AST diff scanning.",
            severity: "High"
          },
          {
            risk: "Runaway compute costs from endless sandbox execution loops.",
            mitigation: "Hard budget timeouts of 120 seconds per bug triage and strict test-suite scope limiting.",
            severity: "Medium"
          },
          {
            risk: "GitHub API rate limits and token authorization fatigue.",
            mitigation: "Official GitHub App granular permissions with webhook event queuing via Redis/Upstash.",
            severity: "Low"
          }
        ],
        singleBiggestOpportunity: "Becoming the default autonomous QA & maintenance engineer for the next 1,000,000 AI-generated software companies.",
        unfairAdvantage: "Continuous fine-tuning on 100,000+ merged open-source bugfix pull requests across TypeScript, Python, and Go."
      },
      copywriter: {
        pitchDeck: [
          {
            slideNumber: 1,
            category: "Vision",
            title: "Zero-Touch Bug Fixes While You Sleep",
            subtitle: "The autonomous QA and bug triager for high-velocity software teams.",
            bullets: [
              "Sentry alert fires → Sandbox boots → Reproduction test passes → PR opened",
              "Saves 15+ engineering hours per week per developer",
              "From customer bug report to verified pull request in 4 minutes"
            ],
            takeaway: "Eliminate manual bug triage forever.",
            visualType: "stats"
          },
          {
            slideNumber: 2,
            category: "Problem",
            title: "Solo Founders Are Drowning In Bug Backlogs",
            subtitle: "The unseen cost of shipping fast.",
            bullets: [
              "40% of developer hours spent reading stack traces and reproducing edge cases",
              "Customer churn spikes when regressions sit unresolved for 5+ days",
              "Existing bug tools only flag errors; they don't fix them"
            ],
            takeaway: "Developers want to build features, not babysit stack traces.",
            visualType: "bullets"
          },
          {
            slideNumber: 3,
            category: "Solution",
            title: "Autonomous Closed-Loop Bug Resolution",
            subtitle: "Not another chat interface. Pure Git automation.",
            bullets: [
              "Webhooks ingest Sentry or GitHub issue stack traces instantly",
              "MicroVM boots isolated repo replica and generates reproducing test case",
              "Agent writes minimal fix, verifies tests turn green, and creates PR"
            ],
            takeaway: "Wake up to green test suites and merged PRs.",
            visualType: "bullets"
          },
          {
            slideNumber: 4,
            category: "Market Size",
            title: "Riding the Explosion of AI-Built Software",
            subtitle: "More code created means more maintenance needed.",
            bullets: [
              "TAM: $18.6B developer tools and autonomous testing",
              "SAM: $3.4B cloud-native startups utilizing continuous delivery",
              "SOM: $48M capturing 8,000 high-growth indie teams"
            ],
            takeaway: "As AI codes faster, autonomous testing is the primary bottleneck.",
            visualType: "stats",
            metrics: [
              { label: "TAM", value: "$18.6B" },
              { label: "SAM", value: "$3.4B" },
              { label: "SOM (24 Mo)", value: "$48M" }
            ]
          },
          {
            slideNumber: 5,
            category: "Product",
            title: "Zero Configuration GitHub App",
            subtitle: "Install in 60 seconds.",
            bullets: [
              "1-click OAuth installation into any GitHub repository",
              "Automatic package manager and test runner detection (npm, pnpm, pytest, cargo)",
              "PRs include verified reproduction code and diff explanation"
            ],
            takeaway: "Frictionless setup with immediate time-to-value.",
            visualType: "split"
          },
          {
            slideNumber: 6,
            category: "Business Model",
            title: "Tiered SaaS with Usage-Based MicroVM Compute",
            subtitle: "Scales with team repository activity.",
            bullets: [
              "Hacker Plan: $49/mo (up to 30 automated PRs/month)",
              "Team Plan: $249/mo (unlimited repositories, priority sandbox queues)",
              "Enterprise: $799/mo (custom VPC execution and dedicated runners)"
            ],
            takeaway: "High willingness-to-pay tied directly to engineering hours saved.",
            visualType: "stats"
          },
          {
            slideNumber: 7,
            category: "Traction & Roadmap",
            title: "Early Developer Love & Rapid Iteration",
            subtitle: "1,200 repositories onboarded during private alpha.",
            bullets: [
              "Alpha: 84% PR acceptance rate on reproducible JavaScript/TypeScript errors",
              "Q2: Python, Ruby on Rails, and Go runtime support",
              "Q3: Bi-directional Linear & Slack triage automation agents"
            ],
            takeaway: "Clear path to becoming the default CI/CD bot.",
            visualType: "timeline"
          },
          {
            slideNumber: 8,
            category: "Competitive Advantage",
            title: "Deterministic Verification Engine",
            subtitle: "Why competitors fail at code fixes.",
            bullets: [
              "We never open a PR unless the newly synthesized test failed before and passed after",
              "Proprietary AST minimizer keeps diffs compact and readable for human maintainers",
              "Feedback loop: Human review comments auto-trigger refined commits"
            ],
            takeaway: "Trust earned through zero false-positive pull requests.",
            visualType: "bullets"
          },
          {
            slideNumber: 9,
            category: "Team",
            title: "Systems Engineers & Open Source Maintainers",
            subtitle: "Built by developers who experienced this pain daily.",
            bullets: [
              "Founders created popular OSS libraries with 40M+ npm downloads",
              "Previous infrastructure engineers at Docker & Datadog",
              "Passionate about developer craftsmanship and sub-second toolchains"
            ],
            takeaway: "Deep domain obsession with developer tooling.",
            visualType: "bullets"
          },
          {
            slideNumber: 10,
            category: "The Ask",
            title: "Raising $1.8M Pre-Seed",
            subtitle: "Accelerating sandbox fleet & developer ecosystem integrations.",
            bullets: [
              "60% Distributed sandbox runner engineering & agent test harnesses",
              "25% Developer relations & GitHub Marketplace co-marketing",
              "15% Legal, SOC2 compliance, and security audits"
            ],
            takeaway: "Targeting $3M ARR with 18 months of operational runway.",
            visualType: "stats",
            metrics: [
              { label: "Target Round", value: "$1.8M" },
              { label: "Runway", value: "18 Mo" },
              { label: "ARR Goal", value: "$3M" }
            ]
          }
        ],
        landingPage: {
          heroHeadline: "Bugs Fixed Before You Wake Up",
          subheadline: "Autonomous GitHub agent that reproduces Sentry issues and opens tested pull requests in 4 minutes.",
          ctaLabel: "Install GitHub App",
          secondaryCtaLabel: "View Sample Pull Request",
          valueProps: [
            {
              title: "Instant Bug Reproduction",
              description: "Spins up isolated micro-VM sandboxes to reproduce stack traces deterministically.",
              iconName: "Zap"
            },
            {
              title: "Verified Green Test Suites",
              description: "Never hallucinates. Only submits pull requests after all new and existing tests pass.",
              iconName: "Shield"
            },
            {
              title: "Clean Minimal Diffs",
              description: "Generates elegant, human-readable commits that respect your project style guide.",
              iconName: "Cpu"
            }
          ],
          socialProofBadge: "Installed on 2,400+ production repositories • 89% PR merge rate",
          pricingTeaser: "Free for open-source • 14-day trial for private repos"
        }
      },
      spec: {
        mustHave: [
          {
            name: "GitHub Webhook & Sentry Ingestion Gateway",
            userStory: "As a developer, I want the bot to automatically respond whenever an issue is labeled or an error spikes.",
            techApproach: "Next.js Route Handler validating HMAC signatures and enqueuing jobs to Upstash Redis queue.",
            complexity: "Medium"
          },
          {
            name: "MicroVM Sandbox Execution Engine",
            userStory: "As an engineering lead, I want bugs reproduced in a secure, isolated sandbox with internet access restrictions.",
            techApproach: "Integration with E2B or Fly Machine SDK to clone repo, install dependencies, and run test suites in under 15 seconds.",
            complexity: "High"
          },
          {
            name: "Automated Git PR Synthesis & Branch Pusher",
            userStory: "As a maintainer, I want to receive a clean Git branch with a descriptive title and reproduction test file.",
            techApproach: "Octokit API client creating branch, committing AST diff, and publishing formatted Markdown pull request description.",
            complexity: "Medium"
          }
        ],
        shouldHave: [
          {
            name: "Interactive Web Sandbox Replay Terminal",
            userStory: "As a reviewer, I want to view the terminal replay of the reproduction test failing and passing.",
            techApproach: "Asciinema / Xterm.js web player embedded directly in the web dashboard or PR description link.",
            complexity: "Medium"
          },
          {
            name: "Slack & Discord Digest Notifications",
            userStory: "As a solo founder, I want a daily summary of resolved bugs posted to my private Slack channel.",
            techApproach: "Slack incoming webhook dispatcher sending interactive block-kit message cards with 1-click merge buttons.",
            complexity: "Low"
          },
          {
            name: "Flaky Test Detector & Auto-Skipper",
            userStory: "As a developer, I don't want the bot wasting cycles on non-deterministic tests.",
            techApproach: "Statistical test history validator flagging assertions with high variance across multiple runs.",
            complexity: "Medium"
          }
        ],
        couldHave: [
          {
            name: "Natural Language Slack Command Bot",
            userStory: "As a founder, I want to type `/fix issue #142` in Slack to initiate an immediate fix sprint.",
            techApproach: "Slack Bot app with slash command routing directly into autonomous triage queue.",
            complexity: "Low"
          },
          {
            name: "Automated Dependency Bump Vulnerability Patching",
            userStory: "As a CTO, I want dependabot alerts automatically resolved with code rewrites for breaking API changes.",
            techApproach: "Codemod AST migration engine running against changelogs of updated npm packages.",
            complexity: "High"
          },
          {
            name: "Private LLM Self-Hosting Gateway",
            userStory: "As an enterprise customer, I want to run all code analysis through our self-hosted Ollama/vLLM instance.",
            techApproach: "Configurable OpenAI-compatible API base URL parameter in team organization settings.",
            complexity: "Medium"
          }
        ],
        recommendedTechStack: {
          frontend: "Next.js 14 App Router, Tailwind CSS, Lucide React, Monaco Editor",
          backend: "Node.js Edge Handlers with Upstash QStash message broker",
          aiEngine: "Claude 3.5 Sonnet & Gemini 1.5 Pro for deep codebase reasoning and test generation",
          database: "Supabase PostgreSQL with Row Level Security for GitHub installation tokens",
          hosting: "Vercel + E2B Sandbox Micro-VM infrastructure"
        }
      }
    }
  },
  {
    id: "fractional-cfo",
    badge: "FinTech / Creator Economy",
    title: "On-demand fractional CFO for creators",
    description: "Real-time cash flow, sponsor receivables factoring, and quarterly estimated tax autopilot for 7-figure digital creators.",
    plan: {
      idea: "On-demand fractional CFO for creator businesses and newsletter operators",
      createdAt: new Date().toISOString(),
      durationSeconds: 44,
      research: {
        targetMarket: "4.2M professional digital creators, podcast networks, and independent newsletter operators earning between $100k and $2M annual gross revenue.",
        marketSize: {
          tam: { value: "$14.2B", description: "Global creator economy financial services and SMB bookkeeping market." },
          sam: { value: "$2.9B", description: "US full-time creators with multi-stream income (Stripe, YouTube AdSense, sponsorships, affiliate)." },
          som: { value: "$36M", description: "12,000 creators at $250/mo within 24 months." },
          assumptions: [
            "Creators have an average of 6 distinct income sources with staggered 60-90 day net terms",
            "Over 72% face severe IRS underpayment penalties due to miscalculated quarterly estimated taxes",
            "Average human fractional CFO charges $2,500–$5,000/month, making human CFOs unattainable for sub-$1M creators"
          ]
        },
        competitors: [
          {
            name: "Bench.co",
            oneLineDifferentiation: "PitchPilot CFO delivers forward-looking cash flow runway predictions and tax withholdings, not just retrospective bookkeeper spreadsheets.",
            threatLevel: "High",
            weakness: "Manual human bookkeeper model with high churn, zero creator-specific sponsorship reconciliation."
          },
          {
            name: "Karat Financial",
            oneLineDifferentiation: "Pure software financial intelligence and cash flow orchestration without requiring creators to switch credit cards.",
            threatLevel: "Medium",
            weakness: "Primarily a credit card issuer; lacks automated quarterly tax distribution calculations."
          },
          {
            name: "QuickBooks Online",
            oneLineDifferentiation: "Zero manual chart-of-accounts bookkeeping: auto-categorizes creator expenses with natural language receipts.",
            threatLevel: "Medium",
            weakness: "Clunky 20-year-old accounting UX, confusing terminology, no sponsor invoice factoring."
          }
        ],
        validationSignal: "Top pain point cited by 84% of surveyed newsletter operators: 'I have no idea how much money I can safely withdraw as owner pay without getting hit by surprise taxes.'"
      },
      strategy: {
        problemStatement: "Digital creators and modern media operators make substantial top-line revenue across volatile channels (sponsorships, Stripe, YouTube AdSense) but operate blind regarding true net margins, quarterly tax liabilities, and runway volatility.",
        whyNow: "Plaid and Stripe Financial Connections make read-only bank aggregation seamless, while modern financial LLMs can accurately parse ambiguous sponsor contracts and W9/1099 disbursements.",
        keyRisks: [
          {
            risk: "Liability for inaccurate tax calculations or penalties.",
            mitigation: "Include clear disclaimers, partner with licensed CPA firms for optional quarterly sign-offs, and maintain conservative tax reserve algorithms.",
            severity: "High"
          },
          {
            risk: "Plaid connection drops requiring periodic user re-authentication.",
            mitigation: "Proactive push alerts and multi-aggregator fallback (Finicity / MX) to prevent stale balance reports.",
            severity: "Medium"
          },
          {
            risk: "Seasonal creator income creating high churn during dry sponsor months.",
            mitigation: "Annual prepaid pricing discount (2 months free) and automated sponsor invoice factoring to smooth cash flow.",
            severity: "Medium"
          }
        ],
        singleBiggestOpportunity: "Becoming the primary operating financial dashboard and treasury account for the world's most profitable single-operator media businesses.",
        unfairAdvantage: "Proprietary sponsorship contract analyzer that extracts payment terms and auto-chases overdue Net-60 brand invoices."
      },
      copywriter: {
        pitchDeck: [
          {
            slideNumber: 1,
            category: "Vision",
            title: "Your Creator Business On Financial Autopilot",
            subtitle: "The intelligent fractional CFO for 7-figure solo media operators.",
            bullets: [
              "Real-time safe-to-withdraw owner pay calculation",
              "Automated quarterly tax reserve allocation",
              "Autonomous invoice chasing for overdue brand sponsorships"
            ],
            takeaway: "Master your creator finances in 2 minutes a week.",
            visualType: "stats"
          },
          {
            slideNumber: 2,
            category: "Problem",
            title: "High Revenue, Zero Visibility",
            subtitle: "Creators are brilliant at content, but blind at cash flow.",
            bullets: [
              "Staggered 30-60-90 day sponsor payment terms create chronic liquidity crunches",
              "Surprise $40k tax bills trigger emergency savings liquidations",
              "Traditional CPAs charge $3k/month and don't understand creator business models"
            ],
            takeaway: "Creators need real-time foresight, not year-end tax panic.",
            visualType: "bullets"
          },
          {
            slideNumber: 3,
            category: "Solution",
            title: "Autonomous Fractional Financial Director",
            subtitle: "Instant clarity on every dollar entering and leaving your business.",
            bullets: [
              "One unified view of Stripe, YouTube AdSense, and sponsor bank accounts",
              "Algorithmic safe owner-draw calculation updated daily",
              "Automated polite invoice reminders that collect receivables 14 days faster"
            ],
            takeaway: "Never worry about taxes or cash flow again.",
            visualType: "bullets"
          },
          {
            slideNumber: 4,
            category: "Market Size",
            title: "$14.2B Creator Financial Infrastructure",
            subtitle: "The fastest growing category of high-margin solo enterprises.",
            bullets: [
              "TAM: $14.2B creator business financial tooling and tax compliance",
              "SAM: $2.9B full-time digital creators earning $100k+ annually",
              "SOM: $36M securing 12,000 top creator subscriptions"
            ],
            takeaway: "High-earning, software-native audience with premium retention.",
            visualType: "stats",
            metrics: [
              { label: "TAM", value: "$14.2B" },
              { label: "SAM", value: "$2.9B" },
              { label: "Target SOM", value: "$36M" }
            ]
          },
          {
            slideNumber: 5,
            category: "Product",
            title: "The Financial Command Center",
            subtitle: "Beautiful simplicity built for non-accountants.",
            bullets: [
              "Safe Owner Draw Dial: Exact dollar amount you can safely transfer to personal checking today",
              "Tax Vault: Automated sub-account segregation for federal and state quarterly estimates",
              "Sponsorship Tracker: Timeline of pending agency disbursements with auto-reminders"
            ],
            takeaway: "Financial peace of mind in a single clean screen.",
            visualType: "split"
          },
          {
            slideNumber: 6,
            category: "Business Model",
            title: "High-Value SaaS + Embedded Financial Services",
            subtitle: "Expanding lifetime value through treasury yield.",
            bullets: [
              "Core Subscription: $149/mo (Solo) to $399/mo (Studio tier)",
              "Invoice Advance Fee: 2.5% fee on instant sponsor invoice factoring",
              "Treasury Yield: Net interest margin on FDIC-insured tax reserve deposits"
            ],
            takeaway: "Diverse revenue streams with exceptional gross margins.",
            visualType: "stats"
          },
          {
            slideNumber: 7,
            category: "Traction & Roadmap",
            title: "Viral Creator Adoption",
            subtitle: "Word-of-mouth growth among creator mastermind networks.",
            bullets: [
              "Beta: 180 creators tracking $24M in annualized creator billings",
              "Over $4.2M in late sponsor invoices successfully recovered",
              "NPS of 82: 4 out of 5 beta creators actively refer peer creators"
            ],
            takeaway: "Exceptional organic word-of-mouth distribution.",
            visualType: "timeline"
          },
          {
            slideNumber: 8,
            category: "Competitive Advantage",
            title: "Creator Industry Payment Benchmarks",
            subtitle: "Data transparency no traditional accountant can match.",
            bullets: [
              "Anonymized sponsor payment timeliness database (know which brands pay late before signing)",
              "CPG and SaaS brand sponsorship rate card benchmarks by CPM and niche",
              "Defensible data moat powered by real-time financial transaction streams"
            ],
            takeaway: "Unlocks proprietary market pricing intelligence for creators.",
            visualType: "bullets"
          },
          {
            slideNumber: 9,
            category: "Team",
            title: "FinTech Veterans & Media Founders",
            subtitle: "The ideal intersection of financial engineering and creator empathy.",
            bullets: [
              "CEO: Ex-Stripe Capital PM and founder of a 200k subscriber tech newsletter",
              "CTO: Senior FinTech Architect (ex-Plaid, Brex)",
              "Head of Tax Strategy: CPA specializing in intellectual property & digital media"
            ],
            takeaway: "Deep empathy and institutional technical rigor.",
            visualType: "bullets"
          },
          {
            slideNumber: 10,
            category: "The Ask",
            title: "Raising $1.5M Seed Round",
            subtitle: "Scaling engineering, banking integrations, and agency partnerships.",
            bullets: [
              "50% Financial engineering & banking API reliability",
              "30% Creator talent agency partnership channel integration",
              "20% Compliance, regulatory licensing, and insurance underwriting"
            ],
            takeaway: "18 months to reach $3.5M ARR with high capital efficiency.",
            visualType: "stats",
            metrics: [
              { label: "Target Raise", value: "$1.5M" },
              { label: "Runway", value: "18 Mo" },
              { label: "ARR Goal", value: "$3.5M" }
            ]
          }
        ],
        landingPage: {
          heroHeadline: "Your Creator Business On Financial Autopilot",
          subheadline: "Real-time safe owner pay, automated quarterly tax reserves, and effortless sponsor invoice collection.",
          ctaLabel: "Connect Your Accounts",
          secondaryCtaLabel: "Calculate Safe Draw",
          valueProps: [
            {
              title: "Safe Owner Pay Dial",
              description: "Know the exact dollar amount you can safely transfer to your personal checking account today.",
              iconName: "Zap"
            },
            {
              title: "Quarterly Tax Vault",
              description: "Automatically sets aside the right percentage for state and federal estimated taxes with zero guesswork.",
              iconName: "Shield"
            },
            {
              title: "Autonomous Invoice Chaser",
              description: "Politely follows up on overdue Net-60 brand sponsor payments, collecting funds 14 days faster.",
              iconName: "Cpu"
            }
          ],
          socialProofBadge: "Managing $45M+ in creator revenue for top YouTubers & newsletter authors",
          pricingTeaser: "Try free for 30 days • Cancel anytime with one click"
        }
      },
      spec: {
        mustHave: [
          {
            name: "Plaid & Stripe Multi-Account Aggregator",
            userStory: "As a creator, I want to connect my business checking and Stripe accounts in one place.",
            techApproach: "Next.js API route exchanging Plaid Link public tokens for secure access tokens stored with AES-256 encryption.",
            complexity: "Medium"
          },
          {
            name: "Safe Owner Pay Algorithm & Dial",
            userStory: "As a creator, I want to see how much I can withdraw without jeopardizing upcoming operational expenses.",
            techApproach: "Deterministic calculation subtracting 90-day projected burn and tax withholdings from liquid balances.",
            complexity: "Low"
          },
          {
            name: "Quarterly Estimated Tax Calculator",
            userStory: "As a solo founder, I want to know my federal and state tax liability every quarter based on real net profit.",
            techApproach: "Tax engine factoring self-employment tax, state tax brackets, and qualified business income (QBI) deductions.",
            complexity: "Medium"
          }
        ],
        shouldHave: [
          {
            name: "Sponsor Contract PDF Ingestion & Net-Term Parser",
            userStory: "As a creator, I want to forward brand agreements to extract due dates and payment terms.",
            techApproach: "Gemini Vision/PDF parser extracting brand name, gross fee, Net-30/60 clauses, and auto-scheduling calendar reminders.",
            complexity: "High"
          },
          {
            name: "Automated Email Follow-Up Dispatcher",
            userStory: "As a creator, I want automated polite email reminders sent to delinquent brand accounting departments.",
            techApproach: "Resend API integration triggered 3 days before and 1 day after invoice due date with custom creator branding.",
            complexity: "Low"
          },
          {
            name: "Expense Receipt OCR Categorizer",
            userStory: "As a creator, I want to photograph production gear receipts and auto-tag them to Schedule C deductions.",
            techApproach: "Camera upload widget with multimodal LLM categorizing camera gear, software subscriptions, and travel expenses.",
            complexity: "Medium"
          }
        ],
        couldHave: [
          {
            name: "Instant Sponsor Invoice Factoring",
            userStory: "As a creator needing immediate cash, I want to advance 85% of an approved invoice today.",
            techApproach: "Embedded capital underwriting pipeline evaluating sponsor creditworthiness and disbursing funds via Stripe Transfer.",
            complexity: "High"
          },
          {
            name: "Brand Sponsorship Rate Benchmark Tool",
            userStory: "As a creator, I want to compare my sponsored post quotes against industry averages for my audience size.",
            techApproach: "Anonymized CPM statistical query interface filtering by platform, follower tier, and engagement rate.",
            complexity: "Medium"
          },
          {
            name: "Accountant 1-Click Tax Season Bundle",
            userStory: "As a creator, I want to send my CPA a single organized ZIP containing all categorized 1099s and expenses.",
            techApproach: "Serverless zip generator compiling organized CSVs and receipt PDFs organized by tax category.",
            complexity: "Low"
          }
        ],
        recommendedTechStack: {
          frontend: "Next.js 14 App Router, TypeScript, Tailwind CSS, Tremor Charts",
          backend: "Next.js Route Handlers with Plaid and Stripe Webhooks",
          aiEngine: "Gemini 1.5 Flash for sponsor contract parsing and expense categorization",
          database: "PostgreSQL (Supabase) with encrypted secrets vault",
          hosting: "Vercel Pro with automated cron jobs for daily cash flow reconciliation"
        }
      }
    }
  }
];

export function getPresetById(id: string): PresetIdea | undefined {
  return PRESET_IDEAS.find((p) => p.id === id);
}

export function generateDynamicPlan(userIdea: string): StartupPlan {
  // Used as high-quality instant fallback or offline demo mode
  const cleanIdea = userIdea.trim();
  return {
    idea: cleanIdea,
    createdAt: new Date().toISOString(),
    durationSeconds: 41,
    research: {
      targetMarket: `Forward-thinking builders, operators, and enterprises seeking automated solutions for: "${cleanIdea.slice(0, 100)}"`,
      marketSize: {
        tam: { value: "$24.8B", description: "Global target market expanding rapidly via AI workflow transformation." },
        sam: { value: "$4.6B", description: "Serviceable segment of digital-first organizations and modern consumers." },
        som: { value: "$62M", description: "Target obtainable capture within 24-36 months of strategic market entry." },
        assumptions: [
          "Market segment expanding at 22.4% compound annual growth rate through 2029",
          "Average annual contract value (ACV) of $1,200 to $4,800 across starter and team tiers",
          "Strong willingness-to-pay driven by direct labor cost displacement and speed gains"
        ]
      },
      competitors: [
        {
          name: "Legacy Incumbent",
          oneLineDifferentiation: "PitchPilot provides autonomous end-to-end execution in seconds versus days of manual configuration.",
          threatLevel: "High",
          weakness: "Complex enterprise onboarding, high annual minimums, slow feature velocity."
        },
        {
          name: "Point Solution Tool",
          oneLineDifferentiation: "Unified multi-agent orchestration replacing fragmented single-purpose utilities.",
          threatLevel: "Medium",
          weakness: "Lacks contextual intelligence across adjacent workflow steps."
        },
        {
          name: "Generic AI Chat Wrappers",
          oneLineDifferentiation: "Purpose-built domain pipelines with deterministic verification rather than unconstrained chatbot hallucinations.",
          threatLevel: "Medium",
          weakness: "Shallow prompts, high hallucination rates, zero exportable artifacts."
        }
      ],
      validationSignal: "Over 79% of surveyed practitioners report high friction in current workflows and are actively seeking autonomous alternatives."
    },
    strategy: {
      problemStatement: `Modern users attempting to solve "${cleanIdea.slice(0, 80)}" encounter fragmented tools, excessive manual overhead, and unpredictable outcomes. Existing workflows demand specialized expertise and hours of repetitive labor.`,
      whyNow: "Breakthroughs in multi-agent LLM reasoning and edge compute allow tasks that once required dedicated human teams to be executed autonomously with superior consistency.",
      keyRisks: [
        {
          risk: "User trust and accuracy requirements in mission-critical workflows.",
          mitigation: "Human-in-the-loop oversight toggles, granular rollback logs, and deterministic verification rules.",
          severity: "High"
        },
        {
          risk: "Platform dependency on underlying foundation model APIs.",
          mitigation: "Model-agnostic routing layer with automatic fallbacks across leading frontier providers.",
          severity: "Medium"
        },
        {
          risk: "Distribution friction against entrenched legacy vendor habits.",
          mitigation: "Frictionless self-serve freemium wedge with sub-60-second time-to-first-value.",
          severity: "Medium"
        }
      ],
      singleBiggestOpportunity: "Capturing the proprietary data feedback loop to build an insurmountable workflow intelligence moat.",
      unfairAdvantage: "Sub-second multi-agent pipeline architecture optimized for immediate, high-fidelity business outputs."
    },
    copywriter: {
      pitchDeck: [
        {
          slideNumber: 1,
          category: "Vision",
          title: "The Autonomous Operating System",
          subtitle: `Transforming how the world approaches: ${cleanIdea.slice(0, 50)}`,
          bullets: [
            "Autonomous multi-agent intelligence replacing manual complexity",
            "From raw concept to production-ready outcomes in under 90 seconds",
            "Built for the next generation of solo founders and high-velocity teams"
          ],
          takeaway: "Empowering single operators with the leverage of an entire enterprise.",
          visualType: "stats"
        },
        {
          slideNumber: 2,
          category: "Problem",
          title: "The Friction-Ridden Status Quo",
          subtitle: "Current solutions are expensive, slow, and fragmented.",
          bullets: [
            "Hundreds of wasted hours spent wrestling with disparate, unintegrated tools",
            "High barrier to entry keeps 90% of prospective builders on the sidelines",
            "Exorbitant agency and consultant fees with inconsistent deliverables"
          ],
          takeaway: "The legacy workflow is obsolete.",
          visualType: "bullets"
        },
        {
          slideNumber: 3,
          category: "Solution",
          title: "Intelligent Autonomous Orchestration",
          subtitle: "10x faster execution with zero configuration.",
          bullets: [
            "Coordinated pipeline of specialized AI agents working synchronously",
            "Guaranteed structured outputs tailored to industry best practices",
            "Frictionless export to production code, presentations, and specifications"
          ],
          takeaway: "Instantaneous, high-fidelity execution.",
          visualType: "bullets"
        },
        {
          slideNumber: 4,
          category: "Market Size",
          title: "Multi-Billion Dollar Modernization Wave",
          subtitle: "Capturing a rapidly expanding global segment.",
          bullets: [
            "TAM: $24.8B total addressable market globally",
            "SAM: $4.6B serviceable software-enabled addressable segment",
            "SOM: $62M Year 3 obtainable revenue milestone"
          ],
          takeaway: "Venture-scale market with compounding annual growth.",
          visualType: "stats",
          metrics: [
            { label: "TAM", value: "$24.8B" },
            { label: "SAM", value: "$4.6B" },
            { label: "Target SOM", value: "$62M" }
          ]
        },
        {
          slideNumber: 5,
          category: "Product",
          title: "Designed For Pure Developer Velocity",
          subtitle: "Minimalist, keyboard-first, and distraction-free.",
          bullets: [
            "Single-input interface: type an idea and watch the agent pipeline execute",
            "Live streaming telemetry showing exactly what each agent is synthesizing",
            "Direct code export, interactive slide carousels, and responsive live previews"
          ],
          takeaway: "An interface that feels magical from the first click.",
          visualType: "split"
        },
        {
          slideNumber: 6,
          category: "Business Model",
          title: "Predictable SaaS + High-Margin Usage",
          subtitle: "Engineered for sustainable, capital-efficient growth.",
          bullets: [
            "Self-serve Starter: $29/mo for solo operators and indie creators",
            "Pro Growth: $99/mo with collaborative workspaces and higher agent concurrency",
            "Enterprise: Custom contract volume with dedicated model fine-tuning"
          ],
          takeaway: "80%+ software gross margins with rapid net expansion.",
          visualType: "stats"
        },
        {
          slideNumber: 7,
          category: "Traction & Roadmap",
          title: "Execution Cadence & Milestones",
          subtitle: "Relentless shipping velocity.",
          bullets: [
            "Phase 1: Core 4-agent autonomous pipeline and validation dashboard",
            "Phase 2: One-click cloud deployment and persistent team workspace synchronization",
            "Phase 3: Autonomous market monitoring agents providing continuous updates"
          ],
          takeaway: "Rapid product iteration driving viral organic distribution.",
          visualType: "timeline"
        },
        {
          slideNumber: 8,
          category: "Defensibility",
          title: "Compounding Algorithmic Moat",
          subtitle: "Why our competitive lead widens every day.",
          bullets: [
            "Proprietary dataset of validated venture hypotheses and execution metrics",
            "High switching costs as users build their central startup intelligence repository",
            "Network effects across creator and founder discovery ecosystems"
          ],
          takeaway: "Sustainable long-term competitive moat.",
          visualType: "bullets"
        },
        {
          slideNumber: 9,
          category: "Team",
          title: "AI-First Builders & Product Crafters",
          subtitle: "Relentlessly focused on user delight.",
          bullets: [
            "Decade of combined experience across full-stack systems and applied ML",
            "Proven track record shipping software loved by thousands of developers",
            "Deep commitment to product aesthetics, latency, and code craftsmanship"
          ],
          takeaway: "The agile team best positioned to execute.",
          visualType: "bullets"
        },
        {
          slideNumber: 10,
          category: "The Ask",
          title: "Raising $1.5M Seed Capital",
          subtitle: "Fueling product innovation and global market distribution.",
          bullets: [
            "60% Engineering & autonomous agent latency optimization",
            "25% Growth, developer evangelism, and community partnerships",
            "15% Operational reserves and secure infrastructure"
          ],
          takeaway: "18 months runway to reach $2M+ ARR.",
          visualType: "stats",
          metrics: [
            { label: "Target Round", value: "$1.5M" },
            { label: "Runway", value: "18 Mo" },
            { label: "ARR Milestone", value: "$2M+" }
          ]
        }
      ],
      landingPage: {
        heroHeadline: "Build Your Startup In 90 Seconds",
        subheadline: "Autonomous 4-agent intelligence that turns your raw idea into a one-pager, deck, landing page, and MVP spec.",
        ctaLabel: "Generate Startup Free",
        secondaryCtaLabel: "View Sample Plan",
        valueProps: [
          {
            title: "Autonomous Agent Chain",
            description: "Four specialized agents research the market, validate strategy, write copy, and architect your MVP.",
            iconName: "Zap"
          },
          {
            title: "Investor-Ready Decks",
            description: "Generate 10 structured, polished slides with exportable presentation views ready for pitch meetings.",
            iconName: "Shield"
          },
          {
            title: "AI-Ready Feature Specs",
            description: "Prioritized Must/Should/Could roadmaps tailored directly for AI coding assistants like Cursor and Antigravity.",
            iconName: "Cpu"
          }
        ],
        socialProofBadge: "Empowering 3,500+ solo founders and builders across 40 countries",
        pricingTeaser: "Zero setup required • Instant generation"
      }
    },
    spec: {
      mustHave: [
        {
          name: "Single-Input Idea Intake & Parsing Engine",
          userStory: "As a founder, I want to type a brief concept and immediately initiate the validation pipeline.",
          techApproach: "Next.js App Router Server Action validating input length and queuing orchestrator execution.",
          complexity: "Low"
        },
        {
          name: "Multi-Agent Pipeline Coordinator",
          userStory: "As a user, I want each agent's output to feed seamlessly into the next agent with real-time feedback.",
          techApproach: "Asynchronous task graph streaming step transitions and partial artifacts via Server-Sent Events or REST polling.",
          complexity: "Medium"
        },
        {
          name: "Interactive Slide Viewer & Exporter",
          userStory: "As a founder, I want to present and print my pitch deck directly from the browser.",
          techApproach: "Responsive 16:9 React carousel component with keyboard navigation and print-optimized media queries.",
          complexity: "Medium"
        }
      ],
      shouldHave: [
        {
          name: "Live Mini Landing Page Frame",
          userStory: "As a user, I want to preview my landing page inside a responsive browser mockup.",
          techApproach: "Sandboxed React component with desktop/mobile viewport toggle and 1-click TSX code copying.",
          complexity: "Medium"
        },
        {
          name: "Markdown & JSON Export Packager",
          userStory: "As a developer, I want to export the entire startup blueprint as Markdown and JSON.",
          techApproach: "Client-side Blob generator formatting all agent data into downloadable documentation files.",
          complexity: "Low"
        },
        {
          name: "Market Competitor Sizing Matrix",
          userStory: "As a founder, I want visual TAM/SAM/SOM cards with explicit assumption formulas.",
          techApproach: "Sleek metric cards displaying percentage ratios and public market reference citations.",
          complexity: "Low"
        }
      ],
      couldHave: [
        {
          name: "One-Click Vercel Deploy Hook",
          userStory: "As a founder, I want to deploy my generated landing page directly to a custom Vercel domain.",
          techApproach: "Vercel REST API integration triggering instant project deployment with generated repository template.",
          complexity: "High"
        },
        {
          name: "Supabase Persistent Project Workspace",
          userStory: "As a returning user, I want to revisit past generated ideas and save multiple revisions.",
          techApproach: "PostgreSQL schema storing user session UUIDs and serialized startup plan JSON payloads.",
          complexity: "Medium"
        },
        {
          name: "AI Pitch Deck Audio Voiceover Rehearsal",
          userStory: "As a founder preparing to pitch, I want an AI voice reciting investor slide speaker notes.",
          techApproach: "Web Speech Synthesis API or ElevenLabs integration narrating slide takeaways on demand.",
          complexity: "Low"
        }
      ],
      recommendedTechStack: {
        frontend: "Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React",
        backend: "Next.js Route Handlers with Server-Sent Events (SSE)",
        aiEngine: "Google Gemini 1.5 Flash / Claude 3.5 Sonnet with JSON Schema validation",
        database: "PostgreSQL (Supabase) for session persistence (v1.1)",
        hosting: "Vercel with Edge Runtime and sub-second cold starts"
      }
    }
  };
}
