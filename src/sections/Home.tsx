import { PixelButton, PixelPanel } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Home({ onTrailer }: { onTrailer(): void }) {
  const { lang, t } = useContent();
  return <section id="home" className="home section" aria-labelledby="home-title">
    <div className="home-content">
      <PixelPanel className="hero-paper" skin="scroll">
        <h1 id="home-title">TinyRTS</h1>
        <p className="hero-role">{t.hero.tagline}</p>
        <div className="hero-actions">
          {/* A real link to the file: without JavaScript, or opened in a new tab, it still plays the trailer. */}
          <PixelButton id="play-trailer" href={`/media/trailer-${lang}-720p.mp4`} onClick={event => { event.preventDefault(); onTrailer(); }}>
            <span aria-hidden="true">▶</span> {t.hero.watch}</PixelButton>
          <PixelButton href="#maps" className="secondary">{t.hero.explore}</PixelButton>
        </div>
        <p className="hero-note">{t.hero.note}</p>
      </PixelPanel>
    </div>
  </section>;
}
