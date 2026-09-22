import { useContent } from '../i18n';
import { useDialog } from './useDialog';

/** Rendered only while open, so closing it destroys the video and the sound stops. */
export function TrailerModal({ onClose }: { onClose(): void }) {
  const { lang, t } = useContent();
  const close = useDialog(key => { if (key === 'Escape') onClose(); });
  return <div className="modal" role="dialog" aria-modal="true" aria-label={t.ui.trailerTitle}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-box">
      <button ref={close} className="modal-close" type="button" aria-label={t.ui.close} onClick={onClose}>×</button>
      <video controls autoPlay playsInline preload="auto" poster={import.meta.env.BASE_URL + "media/trailer-poster.jpg"}>
        <source src={`${import.meta.env.BASE_URL}media/trailer-${lang}-720p.webm`} type="video/webm" />
        <source src={`${import.meta.env.BASE_URL}media/trailer-${lang}-720p.mp4`} type="video/mp4" />
      </video>
    </div>
  </div>;
}
