import { MapExplorer } from '../components/MapExplorer';
import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

export function Maps() {
  const { t } = useContent();
  return <section id="maps" className="section maps" aria-labelledby="maps-title">
    <SectionTitle id="maps-title" title={t.maps.title} />
    <PixelPanel skin="wood" className="board">
      <PixelPanel className="sheet"><p>{t.maps.intro}</p><MapExplorer /></PixelPanel>
    </PixelPanel>
  </section>;
}
