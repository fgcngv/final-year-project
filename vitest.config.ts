// import { defineConfig } from "vitest/config";

// export default defineConfig({
//   test: {
//     environment: "jsdom",
//     setupFiles: "./vitest.setup.ts",
//   },
// });


import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});