# PitchPilot — AI Co-Founder for Solo Founders

> **HackIndia AI-First Startup Hackathon** | Team **CodeByte**  
> *"Built by AI, to help you build with AI."*

PitchPilot takes a single raw startup idea typed by a solo founder and autonomously generates, in under 90 seconds:
1. **Validation One-Pager**: Problem statement, target market sizing (TAM / SAM / SOM with explicit assumptions), 3 direct competitors with differentiation angles, and risk/opportunity playbooks.
2. **Pitch Deck (10 Slides)**: Investor-ready presentation deck rendered in an interactive slide viewer with keyboard navigation and one-click PDF print export.
3. **Landing Page Copy + Live Preview**: Hero headline, subheadline, 3 value props, CTA copy, and an interactive mini-page rendered inside a responsive browser mockup, plus ready-to-paste React TSX code.
4. **MVP Feature Spec**: Prioritized feature roadmap (Must-have / Should-have / Could-have) with one-sentence technical approaches tailored for AI coding tools like Cursor and Antigravity.

---

## ⚡ Signature Feature: Visible Multi-Agent Pipeline

Instead of a generic loading spinner, PitchPilot features a live, streaming multi-agent visualization:
- **Research Agent**: Estimates TAM/SAM/SOM and identifies 3 direct market incumbents.
- **Strategy Agent**: Formulates the urgent problem statement, macro 'Why Now' catalysts, and risk mitigations.
- **Copywriter Agent**: Writes 10 investor slides and high-converting landing page copy.
- **Spec Agent**: Generates prioritized MVP technical instructions for AI coding assistants.

The UI displays live status transitions (`queued` → `running` → `done`), a live elapsed timer (`Generated in 42s`), and a real-time console log in Geist Mono.

---

## 🛠️ Tech Stack & Design System

- **Framework**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Vercel design system DNA (Geist Sans, Geist Mono, `#0a0a0a` dark mode, `#0070f3` electric accent)
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti
- **AI Engine**: Flexible multi-provider support:
  - Google Gemini API (`GEMINI_API_KEY` or `AI_API_KEY`)
  - Anthropic Claude API (`ANTHROPIC_API_KEY`)
  - Built-in intelligent demo fallback with precomputed startup datasets for instant judge evaluation without API keys.
- **Deployment**: Vercel ready with zero-config `vercel.json`.

---

## 🚀 Quick Start (Local Setup)

```bash
# 1. Clone repository
git clone https://github.com/HackIndiaXYZ/ai-first-startup-hackathon-build-a-startup-using-ai-only-codebyte.git
cd ai-first-startup-hackathon-build-a-startup-using-ai-only-codebyte

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env.local
# Add GEMINI_API_KEY or ANTHROPIC_API_KEY (PitchPilot runs offline presets seamlessly if omitted)

# 4. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

PitchPilot is optimized for 1-click deployment on Vercel:

```bash
# Deploy using Vercel CLI
npx vercel
```

Or deploy via GitHub import in the Vercel Dashboard:
1. Connect the GitHub repository `HackIndiaXYZ/ai-first-startup-hackathon-build-a-startup-using-ai-only-codebyte`.
2. Add optional environment variable: `GEMINI_API_KEY` or `AI_API_KEY`.
3. Click **Deploy**.

---

## 📋 Hackathon AI Usage Report (Required Deliverable)

### 1. The Meta-Narrative
PitchPilot was built using AI to solve the exact problem solo founders face in AI hackathons: turning raw ideas into investor-ready assets. It acts as an autonomous co-founder that builds the pitch, strategy, code, and roadmap.

### 2. AI-Generated vs. Human-Guided Mapping
| Component | Generation Method | Human Oversight Role |
| :--- | :--- | :--- |
| **Next.js 14 Architecture & Code** | 100% AI Generated (Antigravity) | System architecture & requirement prompts |
| **Multi-Agent Prompts** | AI Prompt Engineered | Startup strategist role framing |
| **Vercel Design System & CSS** | 100% AI Engineered | Aesthetic guidelines (Geist typography, dark mode) |
| **Startup Presets & Fallback Intelligence** | AI Synthesized | Industry sector curation (HealthTech, DevTools, FinTech) |

### 3. Foundation Models Utilized
- **Google Gemini 1.5 Flash**: Sub-second JSON generation & multimodal reasoning.
- **Anthropic Claude 3.5 Sonnet**: High-level strategic formulation.
- **Google DeepMind Antigravity**: Autonomous end-to-end full-stack agentic coding.
