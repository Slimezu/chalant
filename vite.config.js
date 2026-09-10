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
  // Expose Cesium as a browser global so any code that references
  // `Cesium.*` without importing it resolves correctly. This fixes
  // "Uncaught ReferenceError: Cesium is not defined" at runtime.
  define: {
    'window.Cesium': 'Cesium',
  },
  // Exclude cesium from Vite's dep optimization
  optimizeDeps: {
    exclude: ['cesium'],
  },
  // Dedupe @cesium/engine to avoid multiple instances
  resolve: {
    dedupe: ['@cesium/engine'],
  },
  build: {
    // Ensure Cesium assets are properly bundled
    assetsInlineLimit: 0,
  },
});
