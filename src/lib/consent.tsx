/**
 * DSGVO-Zustimmung für Tenant-Sites (Flamingo Rebuild).
 * Kategorien wie im Legacy-Admin; Speicher unter eigenem localStorage-Key.
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export type ConsentState = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  ts: number;
  v: number;
};

const STORAGE_KEY = 'flamingo.consent.v1';
const CURRENT_VERSION = 1;

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  ts: 0,
  v: CURRENT_VERSION
};

function load(): ConsentState {
  if (typeof window === 'undefined') return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.v !== CURRENT_VERSION) return DEFAULT_CONSENT;
    return {
      necessary: true,
      functional: !!parsed.functional,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      ts: typeof parsed.ts === 'number' ? parsed.ts : 0,
      v: CURRENT_VERSION
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

function save(state: ConsentState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

type ConsentContextValue = {
  consent: ConsentState;
  needsDecision: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  setConsent: (patch: Partial<Omit<ConsentState, 'necessary' | 'v' | 'ts'>>) => void;
  revoke: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setState] = useState<ConsentState>(() => load());

  useEffect(() => {
    save(consent);
  }, [consent]);

  const acceptAll = useCallback(() => {
    setState({ necessary: true, functional: true, analytics: true, marketing: true, ts: Date.now(), v: CURRENT_VERSION });
  }, []);
  const rejectAll = useCallback(() => {
    setState({ necessary: true, functional: false, analytics: false, marketing: false, ts: Date.now(), v: CURRENT_VERSION });
  }, []);
  const setConsent = useCallback((patch: Partial<Omit<ConsentState, 'necessary' | 'v' | 'ts'>>) => {
    setState((prev) => ({ ...prev, ...patch, necessary: true, ts: Date.now(), v: CURRENT_VERSION }));
  }, []);
  const revoke = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    setState({ ...DEFAULT_CONSENT });
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      needsDecision: consent.ts === 0,
      acceptAll,
      rejectAll,
      setConsent,
      revoke
    }),
    [consent, acceptAll, rejectAll, setConsent, revoke]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    return {
      consent: DEFAULT_CONSENT,
      needsDecision: false,
      acceptAll: () => {},
      rejectAll: () => {},
      setConsent: () => {},
      revoke: () => {}
    };
  }
  return ctx;
}
