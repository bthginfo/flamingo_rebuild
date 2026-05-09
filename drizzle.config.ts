import { defineConfig } from 'drizzle-kit';

/**
 * Migrations target the rebuild Neon/Postgres only. Never point POSTGRES_URL
 * at the legacy company-template database.
 */
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? ''
  }
});
