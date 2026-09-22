import { useEffect, useRef } from 'react';

/** A silent looping clip that plays only while it is on screen, and not at all with reduced motion. */
export function Clip({ id, alt }: { id: string; alt: string }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current!;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.4) element.play().catch(() => {}); else element.pause();
    }, { threshold: [0, 0.4, 1] });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <video ref={video} className="clip" muted loop playsInline preload="metadata" width={960} height={540} aria-label={alt}>
    <source src={`${import.meta.env.BASE_URL}media/clip-${id}.webm`} type="video/webm" />
    <source src={`${import.meta.env.BASE_URL}media/clip-${id}.mp4`} type="video/mp4" />
  </video>;
}
