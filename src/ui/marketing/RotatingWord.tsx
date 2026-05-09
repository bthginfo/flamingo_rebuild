'use client';

import { useEffect, useState } from 'react';

export function RotatingWord({ words, intervalMs = 3200 }: { words: readonly string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [words.length, intervalMs]);

  return <span className="marketing-rotating-word">{words[index] ?? words[0]}</span>;
}
