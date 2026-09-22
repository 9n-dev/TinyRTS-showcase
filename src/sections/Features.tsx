import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Features() {
  const { t } = useContent();
  return <section id="features" className="section features" aria-labelledby="features-title">
    <SectionTitle id="features-title" title={t.features.title} />
    <PixelPanel skin="wood" className="board">
      <ul className="feature-list">
        {t.features.list.map(feature => <li key={feature.head}><PixelPanel className="feature">
          <img src={`${import.meta.env.BASE_URL}media/${feature.shot}.png`} width={1280} height={720} alt={feature.alt} loading="lazy" />
          <h3>{feature.head}</h3>
          <p>{feature.body}</p>
        </PixelPanel></li>)}
      </ul>
      <PixelPanel className="sheet"><p>{t.features.extras}</p></PixelPanel>
    </PixelPanel>
  </section>;
}
