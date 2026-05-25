// import { defineConfig } from "@playwright/test";

// export default defineConfig({
//   testDir: "./tests/e2e",

//   use: {
//     baseURL: "http://localhost:3000",
//     headless: true,
//   },

//   webServer: {
//     command: "npm run dev",
//     port: 3000,
//     reuseExistingServer: true,
//   },
// });



import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",

  fullyParallel: true,

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      // dependencies: ["setup"],
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});