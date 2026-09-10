// vite.config.js
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';

// Stub for the OpenAI Realtime proxy.
// The original project used this Vite plugin to broker your OpenAI API key
// server-side so it never touched the browser. Since we're using a local
// llama.cpp model instead, this is a no-op — but it must still be exported
// so test files (hudSummaryResponse.test.mjs) and any other importers don't
// break at module load time.
export function openAiRealtimeProxy() {
  return {
    name: 'openai-realtime-proxy',
    configureServer() {
      // Intentionally empty — the local model server handles inference.
    },
  };
}

export default defineConfig({
  plugins: [cesium(), openAiRealtimeProxy()],
  base: '/chalant/',
});
