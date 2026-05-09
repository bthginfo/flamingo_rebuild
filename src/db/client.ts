import { createPool } from '@vercel/postgres';
import { drizzle, type VercelPgDatabase } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';

let cachedDb: VercelPgDatabase<typeof schema> | undefined;

export function isDatabaseConfigured(): boolean {
  return process.env.FLAMINGO_REBUILD_DB === '1' && Boolean(process.env.POSTGRES_URL);
}

export function getDb(): VercelPgDatabase<typeof schema> {
  if (!isDatabaseConfigured()) {
    throw new Error('Rebuild database is not configured. Set FLAMINGO_REBUILD_DB=1 and POSTGRES_URL in the rebuild project only.');
  }

  if (!cachedDb) {
    const pool = createPool();
    cachedDb = drizzle(pool, { schema });
  }

  return cachedDb;
}
