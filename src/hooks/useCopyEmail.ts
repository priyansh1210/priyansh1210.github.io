import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '../content/site';

/** Copies the email to the clipboard; falls back to opening the mail app. */
export function useCopyEmail(email = site.email) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
      return true;
    } catch {
      window.location.href = `mailto:${email}`;
      return false;
    }
  }, [email]);

  return { copied, copy };
}
