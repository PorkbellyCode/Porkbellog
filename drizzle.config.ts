// drizzle.config.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import type { Config } from 'drizzle-kit';

// Next.js의 환경 변수 로드 순서를 모방합니다.
// 1. .env.local
// 2. .env
dotenv.config({ path: resolve(__dirname, '.env.local') });
dotenv.config({ path: resolve(__dirname, '.env') });

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config;