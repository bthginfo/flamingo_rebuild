'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'flamingo_cookie_ack';

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) !== '1') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fm-cookie-notice" role="dialog" aria-label="Hinweis zu Cookies">
      <p>
        Wir verwenden technisch notwendige Cookies für Login und Sitzungen. Mehr in unserer{' '}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <button
        type="button"
        className="button"
        onClick={() => {
          try {
            window.localStorage.setItem(STORAGE_KEY, '1');
          } catch {
            /* ignore */
          }
          setVisible(false);
        }}
      >
        Verstanden
      </button>
    </div>
  );
}
