import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/content/site.ts';

/** Fills the {{...}} placeholders in index.html from src/content/site.ts, so the
 *  tab title and link-preview tags never drift from the content file. */
function htmlFromContent(): Plugin {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const values: Record<string, string> = {
    theme: site.appearance.theme,
    palette: site.appearance.palette,
    name: site.name,
    role: site.role,
    description: site.description,
    email: site.email,
  };
  return {
    name: 'html-from-content',
    transformIndexHtml: (html) =>
      html.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
        key in values ? escape(values[key]) : match,
      ),
  };
}

export default defineConfig({
  plugins: [react(), htmlFromContent()],
  build: {
    rollupOptions: {
      output: {
        // Keep React and the router in their own long-lived chunks so a content
        // change doesn't invalidate the framework code in visitors' caches.
        manualChunks(id) {
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/react')) return 'react';
        },
      },
    },
  },
});
