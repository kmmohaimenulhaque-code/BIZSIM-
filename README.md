# BIZSIM

**Open-source business case simulation and strategic decision-making.**
Make multi-step executive decisions in real historical cases — from Athens in 483 BC to Netflix in 2011 — see what actually happened, with cited sources. Research any live company from public sources and turn the evidence into a playable case.

No accounts. No tracking. Progress stays on your device.

---

## What's inside

| Area | What it does |
|---|---|
| **Case library** | 10 curated cases spanning ancient → modern: Athens (silver fleet), Augustus (military treasury), Medici Bank, Dutch East India Company, Ford, Intel, Apple 1997, Kodak, Nokia, Netflix. Each has **3 linked decisions**, 3 options each, verified outcomes and source links. |
| **6-step method** | Situation → Concept → Evidence → Decision → Outcome → Insight. Pre-decision text is written to avoid spoilers. |
| **Validated impacts** | Each decision reveals what actually happened (with footnoted sources), the *process quality* of your choice, and its effect on three company meters. Alternatives are labelled as counterfactual assessments; base rates counter survivorship bias. |
| **Principles library** | 75 principles from 30 books — *The 48 Laws of Power, Influence, The Prince, Good Strategy Bad Strategy, Competitive Strategy, Blue Ocean, The Innovator's Dilemma, The Art of War, Good to Great, Psychology of Money, Principles, Zero to One, Secrets of the Millionaire Mind, Think and Grow Rich, The Millionaire Fastlane, Only the Paranoid Survive, 7 Powers* and more. Paraphrased and attributed; linked to every decision where they apply. |
| **Live company research** | Real pipeline streamed to the UI: Wikidata entity resolution → structured facts → Wikipedia summary → **SEC EDGAR** audited revenue/net income (10-K, 20-F) and filings → news headlines (Google News → Bing → GDELT fallback) → official website (robots.txt respected) → optional AI case synthesis. Only stages that really run are shown; only sources actually retrieved are listed. |
| **AI case synthesis** | Anthropic, OpenAI-compatible (OpenAI, OpenRouter, Groq, Ollama) or Gemini. The model may cite only retrieved sources and library principles; deterministic validation gates strip anything else. Output is labelled *AI-generated analysis* / *Hypothetical*. |
| **Images** | Openly licensed photographs from **Openverse** (commercial-use licences, credited). Optional AI illustrations via Gemini "Nano Banana" (`gemini-2.5-flash-image`) or OpenAI `gpt-image-1`, always labelled as AI. |
| **Learning profile** | 10 bipolar strategic-thinking dimensions updated by an exponentially weighted average; decisions, completed cases, history match rate and process quality — all computed from your own decisions. Export/import progress as a file. |

Provenance is always visible: **Verified fact** · **Source reference** · **AI-generated analysis** · **Hypothetical scenario**.

---

## Quick start (any computer)

Requires **Node.js 18.17+** (22 recommended).

```bash
npm install          # add ELECTRON_SKIP_BINARY_DOWNLOAD=1 if you don't need the desktop app
cp .env.example .env # optional: add AI keys and SEC_USER_AGENT
npm run build
npm start            # → http://localhost:8787
```

Development with hot reload: `npm run dev` (UI on http://localhost:5173, API on :8787).

Validate curated content (structure, sources, principles, anti-spoiler check): `npm run check` (add `-- --urls` to verify every source link).

### Configuration (`.env`)

Copy `.env.example` → `.env` (server) or → `bizsim.env` in the app data folder (desktop: `~/.config/bizsim/` on Linux). Then restart.

See also **`bizsim.env.example`** in the repo root for a ready-to-copy template (same settings, desktop-oriented comments).

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` / `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` | Enables AI case synthesis (first found: Anthropic → OpenAI → Gemini, or set `LLM_PROVIDER`). A free Gemini key also enables image generation. |
| `GEMINI_MODEL`, `GEMINI_IMAGE_MODEL` | **Leave empty.** BIZSIM asks Google which models your key can use and picks the newest stable `flash` / `flash-image` model, and falls back automatically if a pinned model is retired (HTTP 404). Set only to pin a model. |
| `OPENAI_BASE_URL` | Any OpenAI-compatible endpoint, including local Ollama (`http://localhost:11434/v1`). |
| `IMAGE_PROVIDER` | `gemini`, `openai` or `none`. |
| `SEC_USER_AGENT` | **Required by the SEC** to read EDGAR: your name and email, e.g. `Jane Doe jane@example.com`. No key needed. |
| `CORS_ORIGINS` | Allowed origins for a hosted server used by mobile apps (default `*`). |

### Setup instructions (desktop env file)

Create the desktop config directory and a minimal `bizsim.env` (Linux example). Replace the placeholders with your real values, then restart BIZSIM.

```bash
mkdir -p ~/.config/bizsim
cat > ~/.config/bizsim/bizsim.env <<'EOF'
GEMINI_API_KEY=paste-your-key-here
SEC_USER_AGENT=Your Name your@email.com
EOF
```

- **macOS:** `~/Library/Application Support/bizsim/bizsim.env`
- **Windows:** `%APPDATA%\bizsim\bizsim.env`
- Full template with every optional setting: copy from `bizsim.env.example` (or `.env.example` for the server).

**Troubleshooting**
- *Constructing the case → “responded 404”*: the AI model name was retired. Remove `GEMINI_MODEL` from your settings file (auto-pick handles it) and restart.
- *Reading the official website → timed out / 403*: some sites block automated readers. Research continues with the other sources; this is expected.
- *Settings shows a feature as off*: check the file location and that there are no spaces around `=`.

## Install everywhere

- **Web / self-host:** `npm start` or Docker (see below).
- **Desktop:** build installers with the scripts in `package.json` (`npm run dist:*`).
- **Android:** Chrome → menu → *Install app*.

```bash
npm run dist:win     # → release/BIZSIM Setup 1.0.0.exe   (build on Windows)
npm run dist:mac     # → release/BIZSIM-*.dmg
npm run dist:linux   # → release/BIZSIM-*.AppImage
```

Desktop API keys: copy `.env.example` to `bizsim.env` in the app's data folder — `%APPDATA%/bizsim` on Windows, `~/Library/Application Support/bizsim` on macOS, `~/.config/bizsim` on Linux.

### Automated builds (GitHub Actions)
`.github/workflows/build.yml` builds Windows, macOS and Linux installers plus an Android debug APK on every `v*` tag (or manually). Set the repository variable `BIZSIM_API_URL` for the Android build.

### Server hosting (Docker)

```bash
docker build -t bizsim .
docker run -p 8787:8787 --env-file .env bizsim
```

## Architecture

```
shared/           Content and rules used by both client and server
  cases/          Curated cases (early.js, modern.js) — sources, decisions, outcomes
  books.js        30 books, 75 paraphrased principles
  dimensions.js   10 profile dimensions, domains, eras, the 6-step method
  validate.js     Deterministic quality gates (sources, principles, ranges, spoilers)
server/src/       Express API (no database; stateless apart from caches)
  research/       wikidata.js, sources.js (Wikipedia, SEC EDGAR, news, website), pipeline.js (SSE stages)
  ai/             llm.js (Anthropic / OpenAI-compatible / Gemini), caseSynth.js (dossier → validated case)
  images/         Openverse search, Gemini / OpenAI generation
  lib/http.js     Timeouts, size limits, SSRF guard, robots.txt, rate limiting
client/src/       React + Vite single-page app
  styles/         tokens.css (design tokens, dark + light), app.css (components, responsive)
  lib/            store.js (local-first state), sim.js (simulation engine), api.js
  pages/          Dashboard, Explore, CasePlayer, Research, Workspace (profile, library, settings…)
electron/         Desktop shell that embeds the server
```

**API:** `GET /api/status` · `GET /api/cases` · `GET /api/library` · `GET /api/research/stream?q=` (Server-Sent Events: `stage`, `source`, `result`, `failure`, `end`) · `POST /api/research` · `GET /api/images/search?q=` · `POST /api/images/generate`.

**Design system:** Inter Variable (Swiss-modernist grotesque; the requested "Swiss Air" face is not openly licensed, so Inter is bundled with Neue Haas Grotesk / Helvetica Neue fallbacks), tabular numerals for all figures, 4 px spacing grid, three radii, four surface levels, glass reserved for floating surfaces (top bar, search, tooltips, mobile sheets) with solid fallbacks, 150–300 ms motion, `prefers-reduced-motion` respected, WCAG-AA text contrast.

---

## Content standards

- Historical outcomes cite sources; key figures were checked against them.
- Book principles are short paraphrases with attribution — no passages reproduced.
- No invented statistics: charts show only SEC XBRL data, labelled with units, fiscal periods and the exact XBRL tags.
- Unknowns are stated as unknowns.

To add a case, copy an existing one in `shared/cases/`, add it to `shared/cases/index.js`, then run `npm run check`.

## Licence
MIT. Data from Wikidata (CC0), Wikipedia (CC BY-SA), SEC EDGAR (public domain), Openverse images (individual licences, credited in-app).
