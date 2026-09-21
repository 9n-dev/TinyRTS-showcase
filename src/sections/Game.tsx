import { Clip } from '../components/Clip';
import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Game() {
  const { t } = useContent();
  return <section id="game" className="section game" aria-labelledby="game-title">
    <SectionTitle id="game-title" title={t.game.title} />
    <PixelPanel skin="wood" className="board">
      <PixelPanel className="sheet"><h3>{t.game.heading}</h3>{t.game.paragraphs.map(text => <p key={text}>{text}</p>)}</PixelPanel>
      <div className="clips">
        {t.game.clips.map(clip => <figure key={clip.id} className="frame"><Clip id={clip.id} alt={clip.alt} /><figcaption>{clip.caption}</figcaption></figure>)}
      </div>
    </PixelPanel>
  </section>;
}
