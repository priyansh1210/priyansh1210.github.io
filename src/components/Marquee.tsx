import './Marquee.css';

/** An endless strip of words. Screen readers get the list once, as plain text. */
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee">
      <p className="visually-hidden">{items.join(', ')}</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-group">
            {items.map((item) => (
              <li key={item}>
                {item}
                <span className="marquee-star">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
