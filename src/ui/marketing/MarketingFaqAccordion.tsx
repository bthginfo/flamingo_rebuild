'use client';

import { useId, useState } from 'react';

export function MarketingFaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="fm-faq-accordion" role="list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-p-${i}`;
        const btnId = `${baseId}-b-${i}`;
        return (
          <div key={item.q} className="fm-faq-accordion__item" role="listitem">
            <button
              id={btnId}
              type="button"
              className={`fm-faq-accordion__trigger ${isOpen ? 'is-open' : ''}`}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="fm-faq-accordion__q">{item.q}</span>
              <span className="fm-faq-accordion__icon" aria-hidden>
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="fm-faq-accordion__panel"
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
