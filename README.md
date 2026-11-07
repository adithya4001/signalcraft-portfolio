# Signalcraft — Data into decisions

A B.Tech Data Science portfolio by Vuppu Adithya Kumar, built around an evidence-led interactive feature.

**Live site:** https://production.d16lksi1y92jlg.amplifyapp.com/

## Signal Lab

Choose one of five questions: map a market, read hiring demand, predict program eligibility, recommend campaign budget shifts, or discover talent beyond keywords. The router compares fixed mission and case-study tags, selects the strongest overlap, and explains the match with inputs, method, outcome, and a relevant link.

The score is a deterministic count of shared tags, not AI confidence. It does not call an LLM, collect free-form visitor text, or create visitor profiles. The deployed version computes in the browser and remains usable without an API.

## Portfolio contents

- Three internships across data research, campaign analysis, and AI.
- Projects in hiring analytics, talent discovery, an NSAP eligibility classifier, and an IPL auction simulator.
- An accessible eight-card achievement deck with keyboard and swipe controls.
- Certificate titles and public verification links; the supplied British Airways / Forage certificate PDF is in the assets directory.

## AWS deployment

The live version is a static site hosted by **AWS Amplify Hosting**. It was deployed manually from a ZIP to the `production` branch. There is no active Lambda, API Gateway, database, Bedrock model, or analytics backend in this deployment. The client-side feature is the intended working path for the published build.

## Run locally

No build step or package installation is required. From the repository root, run:

```powershell
python -m http.server 8000
```

Then open http://localhost:8000.

## Source files

- `index.html` — page structure and portfolio content.
- `styles.css` — responsive visual system and interaction states.
- `app.js` — Signal Lab routing and achievement-card interactions.
- `config.js` — optional API endpoint configuration; blank in the static deployment.
- `assets/` — the linked Forage certificate PDF.

## Evidence and limitations

Project metrics are described in context. The campaign analysis reports a recommendation, not a measured uplift. The NSAP project reports 92.5% cross-validation accuracy. The Naukri certificate verifies participation; its percentile and shortlist are reported results. The hiring dashboard is linked as a PDF report and presentation.
