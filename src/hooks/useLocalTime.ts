import { useEffect, useMemo, useState } from 'react';

const OPTIONS: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'short',
};

/** A clock for the given IANA time zone, e.g. { time: '14:32', zone: 'GMT+5:30' }. */
export function useLocalTime(timeZone: string) {
  const formatter = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-GB', { ...OPTIONS, timeZone });
    } catch {
      // Unknown zone name: fall back to the visitor's own clock.
      return new Intl.DateTimeFormat('en-GB', OPTIONS);
    }
  }, [timeZone]);

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(id);
  }, []);

  const parts = formatter.formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  return { time: `${part('hour')}:${part('minute')}`, zone: part('timeZoneName') };
}
