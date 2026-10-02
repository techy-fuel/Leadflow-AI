# AutoPilot CRM — Design System

**AutoPilot CRM** is an AI-powered sales operating system for car dealerships — *"Sell More Cars. Close More Deals. Automatically."* It is not just a CRM: it scores leads, automates WhatsApp follow-ups, predicts deal closure, and tells salespeople exactly who to call next.

This project is the design system that powers every AutoPilot surface: the web dashboard, the salesperson mobile app, and the marketing site.

> **Sources:** This system was generated from a written product brief (no prior codebase, Figma, or brand assets existed). The brand — logo, palette, type, components — was created from scratch to match the brief: *premium SaaS, Apple-level clean, white background with dark navy + emerald-green accents, glassmorphism, large cards, smooth animations.* Target users: used-car dealers, auto showrooms, vehicle traders, dealership networks.

---

## Brand at a glance

- **Name / wordmark:** AutoPilot **CRM** — navy "AutoPilot" + emerald "CRM", paired with a navigation-arrow mark in an emerald gradient tile (`assets/logo.svg`, `assets/logo-white.svg`, `assets/mark.svg`).
- **Palette:** Deep navy `#0A2540` (primary), emerald `#059669` (accent), white surfaces, slate neutrals.
- **Type:** Plus Jakarta Sans (display + body), JetBrains Mono (metrics).
- **Feel:** Confident, intelligent, calm. Generous radii, soft navy-tinted shadows, emerald used sparingly to signal *AI* and *conversion*.

---

## CONTENT FUNDAMENTALS

**Voice:** Confident, outcome-driven, and plain-spoken — like a sharp sales manager who happens to love good tooling. Never hypey or jargon-heavy.

- **Person:** Speak to the user as **"you"** ("who to call next", "your dealership"). The AI refers to itself as **"I"** in assistant copy ("I drafted a WhatsApp message"). Salespeople and customers are named (Ahmed Khan, Sara Malik).
- **Casing:** Sentence case for body, buttons, and labels. **Title Case** only for proper nouns, nav items, and plan names. UPPERCASE (with letter-spacing) reserved for tiny eyebrows/labels ("AI INSIGHT", "POPULAR").
- **Tone:** Punchy and confident. Short, active sentences. Lead with the outcome ("Sell more cars."), then the mechanism.
- **Numbers:** Always concrete and specific — "82% closing probability", "3× more inquiries", "AED 4.2M", "+34% conversion uplift". Currency is **AED** (regional / Gulf market). Numbers use tabular figures.
- **AI copy:** The assistant is specific and action-oriented — it names the lead, gives a probability, and offers the next action ("Follow up with Ahmed Khan now. Closing probability: 82%."). It never sounds robotic or generic.
- **Emoji:** Used *sparingly* and only in human/customer-facing chat contexts (a single 🚗 or 👋 in a WhatsApp draft or greeting). Never in UI chrome, headings, buttons, or data labels.
- **Examples:**
  - Headline: *"The first AI car-dealer CRM that helps you close more deals automatically."*
  - Button: *"Start free trial"*, *"Ask AI Assistant"*, *"Send WhatsApp follow-up"*
  - Insight: *"12 leads have not been contacted in 24 hours."*

---

## VISUAL FOUNDATIONS

**Color.** White/very-light-slate app background (`--bg-app`), white cards. Deep navy `#0A2540` for primary actions, the sidebar, and hero surfaces. Emerald `#059669/#10B981` is the single accent — it means *AI*, *positive*, *conversion*, *go*. Slate scale for text and borders. Semantic colors: emerald (success), amber (warning/reserved), red (danger/hot), blue (info/cold). **Lead temperature** has its own triad: Hot (red), Warm (amber), Cold (blue). Restraint is key — a screen is mostly white + navy + slate, with emerald as punctuation.

**Gradients.** Three signature gradients: `--gradient-brand` (navy→emerald, for big CTAs), `--gradient-navy` (sidebar, hero panels, finance summary), `--gradient-emerald` (AI chips, accent buttons). A subtle two-color radial `--gradient-mesh` sits behind hero sections. Gradients are deep and saturated, never pastel or bluish-purple.

**Type.** Plus Jakarta Sans throughout. Display/headings are **800 weight, tight tracking (-0.02 to -0.03em)**. Body is 14px/1.5 regular-to-medium. Metrics and IDs use JetBrains Mono with tabular numerals. Big numbers (KPIs, prices) are 800-weight display with negative tracking.

**Spacing & layout.** 4px base scale. Web app = fixed 248px navy sidebar + 68px white topbar + scrolling content at 24–28px padding. Cards sit on an 18px gap grid. Content max-width 1180px on marketing.

**Corner radii.** Generous and premium: cards `--radius-lg` (18px), large panels `--radius-xl/2xl` (24–32px), buttons `--radius-md` (14px), pills/badges fully round. Phone frames 44px.

**Shadows / elevation.** Soft, **navy-tinted**, layered (`rgba(10,37,64,…)`) — never harsh gray. `--shadow-card` for resting cards, `--shadow-lg/xl` for popovers and hero panels. `--glow-emerald` is a special emerald halo for AI elements. No hard 1px black shadows.

**Glassmorphism.** Used deliberately, not everywhere: the marketing nav bar and floating overlays use `--surface-glass` (72% white) + `--blur-glass` (18px blur, 1.4 saturate) over gradient/imagery. Glass always sits over a colored backdrop, never over plain white.

**Borders.** 1px slate (`--border-soft` / `--border-strong`). Cards = soft border + soft shadow + white fill. Dashed borders for drop-zones and "add" affordances.

**Backgrounds.** Mostly clean white / light-slate. No photographic backgrounds in chrome. Hero/CTA use gradient + mesh. Vehicle imagery is represented by gradient placeholder tiles with a car glyph (no stock photos shipped — see Iconography).

**Imagery vibe.** Cool, professional, navy-leaning. Vehicle thumbnails are solid-color gradient tiles keyed to each car. No grain, no warm filters.

**Motion.** Smooth and quick. `--ease-out` (decelerate) for entrances and hovers, `--ease-spring` for playful pops, 140–400ms durations. Progress rings animate their stroke. No bouncy/infinite decorative loops in product chrome.

**Hover states.** Buttons darken (navy→navy-800) or brighten (emerald via brightness filter); secondary/ghost gain a slate tint. Cards marked `interactive` lift 2px + gain `--shadow-lg`. Nav items gain a translucent white overlay.

**Press states.** Buttons translate down 1px (`translateY(1px)`) — a subtle physical press, no color flip.

**Focus.** Emerald focus ring (`--shadow-focus`, 4px emerald @ 35%) on inputs/selects; border turns emerald.

**Cards.** The atom of the UI: white fill, 1px soft border, `--radius-lg`, `--shadow-card`. Section cards have a 16/20px header with a bottom divider, then padded body. Navy and glass card variants exist for hero/AI/overlay contexts.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) — clean 2px-stroke open-line icons, loaded from CDN (`lucide@0.460.0` UMD). This is a **substitution flag**: the brief specified no icon set, so Lucide was chosen as the closest fit for the premium, technical, minimal aesthetic. Swap freely if you adopt a licensed set.
- **Usage:** Icons are line (stroke), never filled, default size 16–22px, `currentColor` so they inherit text color. Emerald icons signal AI/positive; slate for neutral chrome. A shared `Icon` React helper (`ui_kits/crm-web/icon.jsx`) renders Lucide glyphs by name — use it instead of hand-drawing SVG.
- **Common glyphs:** `car-front`, `users`, `sparkles` (AI), `kanban`, `message-circle` (WhatsApp), `calculator`, `bar-chart-3`, `trending-up`, `zap`, `phone`.
- **Brand mark:** the navigation-arrow logo is the only custom SVG (`assets/`). Charts/funnels are data-viz SVG (`ui_kits/crm-web/charts.jsx`), not icons.
- **Emoji:** not used as icons anywhere in the UI. (Only inside human chat copy, sparingly — see Content Fundamentals.)

---

## INDEX / MANIFEST

**Root**
- `styles.css` — global entry (consumers link this). `@import`s the four token files.
- `readme.md` — this file.
- `SKILL.md` — Agent Skill manifest for downloadable use.
- `assets/` — `logo.svg`, `logo-white.svg`, `mark.svg`.

**Tokens** (`tokens/`)
- `colors.css` · `typography.css` · `spacing.css` (spacing, radii, shadows, motion) · `fonts.css` (Google Fonts import).

**Components** (`window.AutoPilotCRMDesignSystem_9860d1`)
- `core/` — Button, IconButton, Badge, Card, Avatar
- `forms/` — Input, Select
- `data/` — StatCard, LeadScore, AiInsight, ProgressRing
- `navigation/` — Tabs

**UI Kits** (`ui_kits/`)
- `crm-web/` — full interactive web app: Dashboard, Inventory, Leads, Pipeline (kanban), AI Assistant, WhatsApp Automation, Finance Calculator, Reports. Entry: `index.html`.
- `mobile/` — salesperson mobile app: Home, Lead Detail, AI Copilot. Entry: `index.html`.
- `landing/` — marketing site: hero, features, AI demo, testimonials, pricing, FAQ, CTA. Entry: `index.html`.

**Foundation cards** (`guidelines/`) — specimen cards shown in the Design System tab (colors, type, spacing, radii, shadows, brand).
