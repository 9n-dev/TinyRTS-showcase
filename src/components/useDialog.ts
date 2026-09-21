import { useEffect, useRef } from 'react';

/** What every open dialog needs: the page behind stops scrolling, focus goes to the close button and comes back
 * to whatever opened it, and keys reach the dialog (Escape is handled by the caller through onKey). */
export function useDialog(onKey: (key: string) => void) {
  const close = useRef<HTMLButtonElement>(null);
  const handler = useRef(onKey);
  handler.current = onKey;
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const listen = (event: KeyboardEvent) => handler.current(event.key);
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', listen);
    close.current?.focus();
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', listen);
      opener?.focus();
    };
  }, []);
  return close;
}
