'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { DEFAULT_SITE_MICROCOPY, type SiteMicrocopy } from '../site-microcopy';

const MicrocopyContext = createContext<SiteMicrocopy>(DEFAULT_SITE_MICROCOPY);

export function MicrocopyProvider({ value, children }: { value: SiteMicrocopy; children: ReactNode }) {
  return <MicrocopyContext.Provider value={value}>{children}</MicrocopyContext.Provider>;
}

export function useMicrocopy(): SiteMicrocopy {
  return useContext(MicrocopyContext);
}
