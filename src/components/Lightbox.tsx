import type { Content } from '../content/en';
import { useContent } from '../i18n';
import { useDialog } from './useDialog';

type Shot = Content['gallery']['shots'][number];

export function Lightbox({ shots, index, onIndex }: { shots: Shot[]; index: number; onIndex(index: number | null): void }) {
  const { t } = useContent();
  const go = (step: number) => onIndex((index + step + shots.length) % shots.length);
  const close = useDialog(key => {
    if (key === 'Escape') onIndex(null);
    if (key === 'ArrowLeft') go(-1);
    if (key === 'ArrowRight') go(1);
  });
  const shot = shots[index];
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.caption}
    onClick={event => { if (event.target === event.currentTarget) onIndex(null); }}>
    <button ref={close} className="lightbox-close" type="button" aria-label={t.ui.close} onClick={() => onIndex(null)}>×</button>
    <button className="lightbox-prev" type="button" aria-label={t.ui.prev} onClick={() => go(-1)}>‹</button>
    <figure>
      <img src={`/media/${shot.id}.png`} alt={shot.alt} />
      <figcaption>{shot.caption} <span className="lightbox-count">{index + 1} / {shots.length}</span></figcaption>
    </figure>
    <button className="lightbox-next" type="button" aria-label={t.ui.next} onClick={() => go(1)}>›</button>
  </div>;
}
