'use client';

import { useEffect } from 'react';
import { useConsent } from '@/lib/consent';
import type { TenantCustomScript } from '@/template-engine/seeds/model';

const URL_RE = /^https?:\/\//i;

function isSafeExternalUrl(raw: string): boolean {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (u.protocol !== 'https:') return false;
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host === '0.0.0.0' || host === '::1') return false;
  if (host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    const [a, b] = host.split('.').map(Number);
    if (a === 10) return false;
    if (a === 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
  }
  return true;
}

function injectScript(s: TenantCustomScript): HTMLScriptElement | null {
  const target = s.placement === 'body' ? document.body : document.head;
  if (!target) return null;
  const code = s.code.trim();
  const tag = document.createElement('script');
  tag.dataset.consentId = s.id;
  if (URL_RE.test(code)) {
    if (!isSafeExternalUrl(code)) {
      console.warn('[TenantConsentScripts] refused unsafe script URL', s.id, code);
      return null;
    }
    tag.src = code;
    tag.async = true;
  } else {
    tag.textContent = s.code;
  }
  target.appendChild(tag);
  return tag;
}

export function TenantConsentScripts({ scripts }: { scripts: readonly TenantCustomScript[] | undefined }) {
  const { consent } = useConsent();

  useEffect(() => {
    if (!scripts || scripts.length === 0) return;

    const allowed = scripts.filter(
      (s) => s.enabled && s.code.trim().length > 0 && (s.category === 'necessary' || consent[s.category])
    );
    const tags = allowed.map(injectScript).filter((t): t is HTMLScriptElement => t !== null);

    return () => {
      for (const tag of tags) {
        try {
          tag.remove();
        } catch {
          /* ignore */
        }
      }
    };
  }, [scripts, consent]);

  return null;
}
