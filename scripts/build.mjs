import { execSync } from "node:child_process";
import { rmSync, mkdirSync, writeFileSync } from "node:fs";

// Run your full original build (gallery data + next build + inline css)
execSync("npm run build:site", { stdio: "inherit" });

// Lock is ON by default. Only DEMO_LOCK=false unlocks the real site.
const locked = process.env.DEMO_LOCK !== "false";

if (locked) {
  rmSync("out", { recursive: true, force: true });
  mkdirSync("out");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Demo Ended</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;
         font-family:system-ui,sans-serif;background:#0f172a;color:#f1f5f9;text-align:center}
    .box{max-width:480px;padding:2rem}
    h1{font-size:1.75rem;margin-bottom:.5rem}
    p{color:#94a3b8;line-height:1.6}
    a{color:#38bdf8}
  </style>
</head>
<body>
  <div class="box">
    <h1>This demo preview has ended</h1>
    <p>This was a temporary preview link. To continue with this project, contact
    <a href="mailto:webdev@talent-loop.org">webdev@talent-loop.org</a>.</p>
  </div>
</body>
</html>`;

  writeFileSync("out/index.html", html);
  console.log("DEMO LOCK ON: placeholder only.");
} else {
  console.log("DEMO LOCK OFF: real site deployed.");
}
