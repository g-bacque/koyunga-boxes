import { getDB } from "./database";
import { clientsSqliteService } from "./clientsSqliteService";
import { materialsSqliteService } from "./materialsSqliteService";
import { assignmentsSqliteService } from "./assignmentsSqliteService";

let dbInitPromise = null;

async function runInitDB() {
  const db = await getDB();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      lastName TEXT,
      familyName TEXT,
      phone TEXT,
      email TEXT,
      notes TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      level TEXT,
      status TEXT NOT NULL,
      notes TEXT,
      currentClientId TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY,
      clientId TEXT NOT NULL,
      materialIds TEXT NOT NULL,
      assignedAt TEXT NOT NULL,
      returnedAt TEXT,
      status TEXT NOT NULL,
      notes TEXT
    )
  `);

  /*await db.execute("DELETE FROM clients");
    await db.execute("DELETE FROM materials");
    await db.execute("DELETE FROM assignments");*/

  await clientsSqliteService.seedIfEmpty();
  await materialsSqliteService.seedIfEmpty();
  await assignmentsSqliteService.seedIfEmpty();

  console.log("DB INITIALIZED");
}

export async function ensureDBInitialized() {
  if (!dbInitPromise) {
    dbInitPromise = runInitDB().catch((error) => {
      dbInitPromise = null;
      throw error;
    });
  }

  return dbInitPromise;
}