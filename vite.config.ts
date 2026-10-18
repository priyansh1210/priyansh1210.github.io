import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/content/site.ts';
import { projects } from './src/content/projects.ts';

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

/** GitHub Pages serves files, not routes. A copy of index.html at every route
 *  (work/inspector/index.html, about/index.html, …) makes direct links load
 *  with HTTP 200 — which link previews and search engines need — and
 *  404.html sends any other path to the app's own "not found" page. */
function staticRoutes(): Plugin {
  return {
    name: 'static-routes',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const page = bundle['index.html'];
      if (!page || page.type !== 'asset') return;
      const routes = [
        ...site.nav.map((item) => item.to.replace(/^\//, '')),
        'contact',
        ...projects.map((p) => `work/${p.slug}`),
      ];
      for (const route of routes) {
        this.emitFile({ type: 'asset', fileName: `${route}/index.html`, source: page.source });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: page.source });
    },
  };
}

export default defineConfig({
  plugins: [react(), htmlFromContent(), staticRoutes()],
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
