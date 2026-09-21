import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Credits() {
  const { t } = useContent();
  return <section id="credits" className="section credits" aria-labelledby="credits-title">
    <SectionTitle id="credits-title" title={t.credits.title} />
    <PixelPanel skin="wood" className="board">
      <PixelPanel className="sheet">
        <ul className="credit-list">
          {t.credits.list.map(credit => <li key={credit.before}>{credit.before}
            {credit.link && <a href={credit.link.href} target="_blank" rel="noreferrer">{credit.link.text}</a>}{credit.after}</li>)}
        </ul>
      </PixelPanel>
    </PixelPanel>
  </section>;
}
