# Al-A'lawn — Metaphysical World

A standalone spiritual-guidance website, separate from the main Al-A'lawn Portal, focused entirely on five services: Istikhara, Islamic numerology, Quranic Ruqyah, and spiritual support for marriage and childbirth matters. Dark, mystical "night sky" theme.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## What's Included

- **Pages:** Home (services grid), About, Contact (WhatsApp-based — no email/backend needed), Disclaimer
- **Theme:** Deep indigo/violet night-sky palette, starfield background, gold "moonlight" accents, Cinzel/Cormorant Garamond + Amiri fonts
- **Contact:** Submitting the form opens WhatsApp with the message pre-filled — nothing to configure
- **Disclaimer:** A dedicated page (and inline notes on sensitive services) making clear this is advisory, spiritual guidance — not a substitute for medical, psychological, or professional care

## A note on content

The "Spiritual Support for Childbirth & Infertility Delays" service card carries a visible note that it is offered
alongside — never in place of — qualified medical care, and the homepage links to the Disclaimer page above the
fold. This wording was adapted slightly from the original brief for that reason; everything else matches your
content as given.

## Editing Content

- `content/site-config.ts` — name, tagline, email, phone, WhatsApp number
- `content/services.ts` — the five services (Urdu / Arabic / English text each)

## Deploying

Push to GitHub, then import at [netlify.com](https://netlify.com) or [vercel.com/new](https://vercel.com/new) — build settings are auto-detected.
