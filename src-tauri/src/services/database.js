import Database from "@tauri-apps/plugin-sql";

let dbInstance = null;

export async function getDB() {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:koyunga.db");
  }

  return dbInstance;
}