# ICP Refiner — AI-Powered Lead Qualification for B2B SaaS

> Built as part of the Myntmore AI Growth Operator challenge.  
> Turns messy outbound lists into clean, scored, actionable lead pipelines.

---

## The Problem

B2B SaaS founders using LinkedIn and outbound for growth face a consistent issue: low-quality lead lists. Targeting is inconsistent, messaging is generic, and time is wasted on prospects who will never convert.

**Root cause:** No systematic way to qualify leads against a tight Ideal Customer Profile (ICP) before outreach begins.

**Result:** Low connection acceptance (~30%), low reply rates (~25%), and a broken visibility-to-pipeline loop.

---

## The Solution

ICP Refiner is a full-stack web application that automatically scores leads against a defined ICP — so founders spend time only on prospects that are worth reaching out to.

Each lead is evaluated and returned with:
- **ICP Fit Score** — High / Medium / Low
- **Why / Notes** — A short reason for the score
- **Recommended Outreach Angle** — A personalised first message direction

---

## Features

| Feature | Description |
|---|---|
| Internet Identity Login | Secure, passwordless auth via DFINITY Internet Identity |
| ICP Profile Management | Create and store detailed customer profiles (industry, size, pain points, budget) |
| Completeness Scoring | Auto-scores each profile and surfaces refinement suggestions |
| Profile Comparison | Side-by-side comparison to identify gaps and targeting opportunities |
| Export Options | Export profiles as JSON or copy summaries to clipboard |
| Live Lead Scoring | Score individual leads against your ICP in real time |
| Clean Dashboard UI | Dedicated Profiles and Detail pages for an intuitive workflow |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS |
| Backend | Motoko (Internet Computer canister) |
| Auth | Internet Identity |
| Hosting | Internet Computer (ICP) |
| AI | Claude API (claude-sonnet) for lead scoring |

---

## Architecture

```
┌─────────────────────────────────────────┐
│              React Frontend             │
│         (TypeScript + Tailwind)         │
└────────────────┬────────────────────────┘
                 │
     ┌───────────▼───────────┐
     │   Internet Identity   │  ← Passwordless auth
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐
     │   Motoko Canister     │  ← Profile storage & logic
     │  (Internet Computer)  │
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐
     │      Claude API       │  ← AI lead scoring
     └───────────────────────┘
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [DFINITY Canister SDK (dfx)](https://internetcomputer.org/docs/current/developer-docs/setup/install/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Shruti0796/icp-refiner.git
cd icp-refiner
```

2. Install frontend dependencies

```bash
npm install
```

3. Start the local Internet Computer replica

```bash
dfx start --background
```

4. Deploy the canisters

```bash
dfx deploy
```

5. Open the app at the local URL shown after deployment (usually `http://localhost:4943`)

---

## How the AI Scoring Works

The lead scoring agent evaluates each prospect against a fixed ICP:

> **Target ICP:** RevOps or Sales leaders (VP / Director / Head / Manager) at US-based B2B SaaS companies with 50–500 employees.

**Input fields used for scoring:**

- Name
- Job Title
- Company Name
- Industry
- Company Size (employee count)
- Country

**Output for each lead:**

```json
{
  "fitscore": "High",
  "reason": "VP of RevOps at a 120-person US SaaS company — exact ICP match.",
  "outreach_angle": "Lead with pipeline forecasting pain: ask how they currently track forecast accuracy across their stack."
}
```

---

## Two Integration Versions

### Version A — No-Code (Make / Zapier)

Best for: founders who want a daily automated workflow without writing code.

1. Trigger: new rows added to a Google Sheet (Apollo / Sales Nav export)
2. Iterator: processes one lead at a time
3. AI module: sends each row to Claude or GPT-4o with the scoring prompt
4. JSON parser: extracts fit score, reason, and outreach angle
5. Sheet updater: writes three new columns back to the original sheet

No developer needed. Drop a list → get a scored sheet in minutes.

### Version B — Python Script

Best for: founders or operators who want a scalable, schedulable solution.

```python
import pandas as pd
from openai import OpenAI
import json, os

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

def classify_lead(row):
    prompt = f"""You are an expert at qualifying leads for B2B SaaS outbound.
Lead: Name: {row.get('Name')}, Title: {row.get('Title')}, Company: {row.get('Company')},
Industry: {row.get('Industry')}, Employees: {row.get('Company Size')}, Country: {row.get('Country')}.

ICP: RevOps or Sales leaders at US-based B2B SaaS companies (50–500 employees).

Score fit as High/Medium/Low, explain why, and suggest one outreach angle.
Return ONLY JSON: {{"fitscore": "...", "reason": "...", "outreach_angle": "..."}}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    result = json.loads(response.choices[0].message.content.strip())
    return result["fitscore"], result["reason"], result["outreach_angle"]

df = pd.read_csv("outbound_leads.csv")
df[["ICP Fit Score", "Why / Notes", "Recommended Outreach Angle"]] = df.apply(
    lambda row: pd.Series(classify_lead(row)), axis=1
)
df.to_csv("outbound_leads_refined.csv", index=False)
print(f"Processed {len(df)} leads. High-fit: {len(df[df['ICP Fit Score'] == 'High'])}")
```

Install dependencies: `pip install pandas openai`

---

## Sample Output

| Name | Title | Company Size | Country | ICP Fit | Notes |
|---|---|---|---|---|---|
| Marcus Reid | Head of RevOps | 120 employees | United States | ✅ High | Exact title + size + geo match |
| Priya Nair | Sales Director | 310 employees | United States | ✅ High | Senior sales leader in US SaaS |
| Tom Eriksson | VP of Sales | 80 employees | Sweden | ⚠️ Medium | Right title + size, wrong geo |
| Linda Park | Marketing Manager | 95 employees | United States | ❌ Low | Wrong function — not sales/RevOps |

---

## Impact

Fixing ICP clarity first has a cascade effect across the entire outbound motion:

- Better targeting → higher connection acceptance rates
- Relevant messaging → higher reply rates
- Less time wasted on low-fit leads
- Personalized outreach angles ready to use — no manual research needed

---

## Roadmap

- [ ] Bulk CSV upload and batch scoring in the web UI
- [ ] AI-powered market analysis per ICP segment
- [ ] Team collaboration on shared profiles
- [ ] Advanced multi-profile comparison views
- [ ] CRM integrations (HubSpot, Salesforce)
- [ ] Automated outreach sequence generation for High-fit leads

---

## Built With

- [Caffeine AI](https://caffeine.ai) — Deployed on the Internet Computer
- [DFINITY / Internet Computer](https://internetcomputer.org)
- [Anthropic Claude API](https://anthropic.com)

---

## Author

**Shruti** — Built for the Myntmore AI Growth Operator challenge.  
GitHub: [@Shruti0796](https://github.com/Shruti0796)
