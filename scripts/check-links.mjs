#!/usr/bin/env node
import { spawn } from "node:child_process";
import { LinkChecker } from "linkinator";

const PORT = 4178;
const base = `http://127.0.0.1:${PORT}`;

const server = spawn("pnpm", ["exec", "serve", "out", "-l", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
});

function waitForReady(timeoutMs = 30_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("serve did not become ready")),
      timeoutMs,
    );
    const onData = (buf) => {
      const text = buf.toString();
      if (/Accepting connections/i.test(text)) {
        clearTimeout(timer);
        server.stdout.off("data", onData);
        resolve();
      }
    };
    server.stdout.on("data", onData);
    server.stderr.on("data", onData);
    server.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`serve exited early with code ${code}`));
    });
  });
}

try {
  await waitForReady();
  const checker = new LinkChecker();
  const result = await checker.check({
    path: `${base}/`,
    recurse: true,
    linksToSkip: [
      /^mailto:/i,
      // External destinations — only assert internal site links.
      /^https?:\/\/(?!127\.0\.0\.1|localhost)/i,
    ],
  });

  const broken = result.links.filter((l) => l.state === "BROKEN");
  console.log(`Checked ${result.links.length} links (${broken.length} broken)`);
  if (broken.length) {
    for (const b of broken) {
      console.error(`BROKEN ${b.status} ${b.url} (from ${b.parent})`);
    }
    process.exitCode = 1;
  }
} finally {
  server.kill("SIGTERM");
}
