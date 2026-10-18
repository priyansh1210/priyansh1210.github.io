import { useEffect } from 'react';
import { site } from '../content/site';

/** Per-route tab title and meta description. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description ?? site.description);
  }, [title, description]);
}
