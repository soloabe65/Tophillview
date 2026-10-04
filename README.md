# Top Hill View Luxury Apartments

A demo website for a luxury apartments business, designed and built by Nathaniel Kenny Olie (Talent Loop Webdev Services) to show what I can build with Next.js and TypeScript.

**Live demo:** [add your Cloudflare Pages link]

## Stack
- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion for animation
- Deployed to Cloudflare Pages as a static export

## Features
- Responsive layout for phones, tablets and desktops
- A dedicated gallery page with photo and video support
- A build script that finds the gallery media automatically and generates the gallery data, so adding a photo or video doesn't need code changes
- Build step that inlines CSS to speed up the first paint

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Build and deploy
```bash
npm run build
npm run deploy
```
The deploy script builds the site and publishes the `out` folder to Cloudflare Pages with Wrangler.

## Built with AI tools
I built this with an AI coding agent, then reviewed, tested and adjusted the result. The agent instruction files (`AGENTS.md` and `CLAUDE.md`) are included in the repo.

Contact: webdev@talent-loop.org
