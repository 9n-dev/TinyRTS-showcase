import { PixelPanel } from './PixelUI';
import { useContent } from '../i18n';

export function Footer() {
  const { t } = useContent();
  return <footer className="site-footer">
    <PixelPanel skin="wood" className="footer-frame">
      <PixelPanel className="footer-content">
        <div><p>{t.footer.rights}</p><p className="attribution">{t.footer.attribution}</p></div>
        <a href="#home">{t.footer.top} <span aria-hidden="true">↑</span></a>
      </PixelPanel>
    </PixelPanel>
  </footer>;
}
