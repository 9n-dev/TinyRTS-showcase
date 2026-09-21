import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Features() {
  const { t } = useContent();
  return <section id="features" className="section features" aria-labelledby="features-title">
    <SectionTitle id="features-title" title={t.features.title} />
    <PixelPanel skin="wood" className="board">
      <ul className="feature-list">
        {t.features.list.map(feature => <li key={feature.body}><PixelPanel className="feature">
          {feature.head && <h3>{feature.head.replace(/\.$/, '')}</h3>}
          <p>{feature.body.charAt(0).toUpperCase() + feature.body.slice(1)}</p>
        </PixelPanel></li>)}
      </ul>
    </PixelPanel>
  </section>;
}
