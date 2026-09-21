import type { CSSProperties } from 'react';
import { sprites } from '../world/sprites.generated';
import type { SpriteId } from '../world/sprites.generated';

/** One sprite of the world as a picture: only its painted box, looping if its sheet has frames.
 * Never enlarged, and shrunk to fit a square of `fit` CSS pixels: a Castle and a sheep share the same column. */
export function Sprite({ id, fit }: { id: SpriteId; fit: number }) {
  const { src, frameW, frameH, frames, fps, box: [x0, y0, x1, y1] } = sprites[id];
  const scale = Math.min(1, fit / (x1 - x0), fit / (y1 - y0));
  const style = {
    width: (x1 - x0) * scale, height: (y1 - y0) * scale,
    backgroundImage: `url(/${src})`, backgroundSize: `${frames * frameW * scale}px ${frameH * scale}px`,
    backgroundPositionY: -y0 * scale, '--from': `${-x0 * scale}px`, '--to': `${-(x0 + frames * frameW) * scale}px`,
    animation: frames > 1 ? `sprite ${frames / fps}s steps(${frames}) infinite` : undefined,
  } as CSSProperties;
  return <span className="sprite" style={style} aria-hidden="true" />;
}
