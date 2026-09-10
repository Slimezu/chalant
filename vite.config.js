// vite.config.js
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Stub for the OpenAI Realtime proxy (kept for test compatibility)
export function openAiRealtimeProxy() {
  return {
    name: 'openai-realtime-proxy',
    configureServer() {},
  };
}

export default defineConfig({
  plugins: [cesium(), openAiRealtimeProxy()],
  base: '/chalant/',
  // CRITICAL: Exclude cesium from Vite's dep optimization
  optimizeDeps: {
    exclude: ['cesium']
  },
  // CRITICAL: Dedupe @cesium/engine to avoid multiple instances
  resolve: {
    dedupe: ['@cesium/engine'],
  },
  build: {
    // Ensure Cesium assets are properly bundled
    assetsInlineLimit: 0,
  },
});
