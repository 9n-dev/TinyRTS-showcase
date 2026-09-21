import { useEffect, useRef, useState } from 'react';
import { useContent } from '../i18n';

/** A number that counts up to its value the first time it is seen. */
export function Counter({ to }: { to: number }) {
  const { lang } = useContent();
  const element = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(to); return; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 900);
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element.current!);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to]);
  return <b ref={element}>{new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US').format(value)}</b>;
}
