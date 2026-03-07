#!/usr/bin/env node

/**
 * Detects the database provider from DATABASE_URL and patches schema.prisma.
 * - "file:" URLs → SQLite (local dev)
 * - Everything else → PostgreSQL (production/Vercel)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = resolve(__dirname, "../prisma/schema.prisma");

// Load .env.local (Next.js convention)
config({ path: resolve(__dirname, "../.env.local") });
config({ path: resolve(__dirname, "../.env") });

const dbUrl = process.env.DATABASE_URL || "";
const isSQLite = dbUrl.startsWith("file:");
const provider = isSQLite ? "sqlite" : "postgresql";

let schema = readFileSync(schemaPath, "utf-8");
schema = schema.replace(
  /provider\s*=\s*"(sqlite|postgresql)"/,
  `provider = "${provider}"`
);

writeFileSync(schemaPath, schema);
console.log(`Prisma provider set to: ${provider}`);
