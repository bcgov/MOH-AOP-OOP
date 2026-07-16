import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      pool: "threads",
      globals: true,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "**/e2e/**"],
      coverage: {
        exclude: [
          "**/dist/**",
          "**/cypress/**",
          "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
        ],
      },
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  })
);
