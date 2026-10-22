module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm exec serve out -l 4177",
      startServerReadyPattern: "Accepting connections",
      url: ["http://127.0.0.1:4177/"],
      numberOfRuns: 1,
      settings: {
        formFactor: "desktop",
        screenEmulation: { disabled: true },
        maxWaitForFcp: 90000,
        maxWaitForLoad: 90000,
        chromeFlags:
          "--no-sandbox --disable-dev-shm-usage --headless=new --disable-gpu",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
