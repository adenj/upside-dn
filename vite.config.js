import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      minify: "esbuild",
      sourcemap: true,
    },
    server: {
      port: 3000,
    },
    plugins: [react()],
  };
});
