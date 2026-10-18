import { site } from '../../content/site';
import './Cat.css';

type Props = { mode?: 'run' | 'idle' };

/** Stacked bottom to top; each is a stencil the CSS fills with a colour.
 *  The stripes can be switched off in site.ts (appearance.catStripes). */
const withStripes = (layers: string[]) => layers.filter((l) => l !== 'stripe' || site.appearance.catStripes);
const RUN_LAYERS = withStripes(['fill', 'stripe', 'line', 'eye']);
const STAND_LAYERS = withStripes(['fill', 'shade', 'stripe', 'cream', 'line', 'eye']);

/**
 * A flat 2D ginger cat, as stencil strips in public/cat/ that Cat.css colours.
 *  - run: a 12-frame gallop traced from Eadweard Muybridge's photographs of a
 *    galloping cat (Animal Locomotion, plate 719, 1887; public domain)
 *  - idle (404 page): a standing pose traced from FrolicForge's cat sprite
 *    (https://frolicforge.itch.io/cat-animation-high-res)
 * Both were smoothed into the same flat style. The original source images are
 * in /vendor (not committed).
 */
export default function Cat({ mode = 'run' }: Props) {
  const layers = mode === 'run' ? RUN_LAYERS : STAND_LAYERS;
  const prefix = mode === 'run' ? 'cat-layer--run-' : 'cat-layer--';
  return (
    <div className={`cat cat--${mode}`}>
      <span className="cat-shadow" />
      <div className={`cat-frame cat-frame--${mode}`}>
        <div className="cat-strip">
          {layers.map((layer) => (
            <i key={layer} className={`cat-layer ${prefix}${layer}`} />
          ))}
        </div>
      </div>
      {mode === 'idle' && <span className="cat-q">?</span>}
    </div>
  );
}
