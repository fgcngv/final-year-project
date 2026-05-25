

// import { defineConfig } from "vitest/config";
// import path from "path";

// export default defineConfig({
//   test: {
//     environment: "jsdom",
//     setupFiles: "./vitest.setup.ts",
//   },

//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./"),
//     },
//   },
// });



import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",

    setupFiles: "./vitest.setup.ts",

    // ✅ VERY IMPORTANT
    exclude: [
      "tests/e2e/**",
      "node_modules/**",
      "dist/**",
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});