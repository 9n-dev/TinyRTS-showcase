import { useState } from 'react';
import { Lightbox } from '../components/Lightbox';
import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Gallery() {
  const { t } = useContent();
  const [open, setOpen] = useState<number | null>(null);
  return <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
    <SectionTitle id="gallery-title" title={t.gallery.title} />
    <PixelPanel skin="wood" className="board">
      <div className="shots">
        {t.gallery.shots.map((shot, index) => <figure key={shot.id} className="frame">
          <a className="shot" href={`/media/${shot.id}.png`} onClick={event => { event.preventDefault(); setOpen(index); }}>
            <img src={`/media/${shot.id}.png`} width={1280} height={720} alt={shot.alt} loading="lazy" />
          </a>
          <figcaption>{shot.caption}</figcaption>
        </figure>)}
      </div>
    </PixelPanel>
    {open !== null && <Lightbox shots={t.gallery.shots} index={open} onIndex={setOpen} />}
  </section>;
}
