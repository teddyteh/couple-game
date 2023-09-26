import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    ".": "src/index.ts",
  },
  banner: {
    js: "'use client'",
  },
  format: ["cjs"],
  noExternal: [/^(?!aws-sdk$).*/], // aws-sdk is already available in Lambda
  dts: true,
});
