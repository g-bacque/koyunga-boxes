import { getDB } from "./database";
import initialClients from "../data/clients";
import { assertUniqueIds } from "./sqliteUtils";
import { enqueueSqliteWrite } from "./sqliteWriteQueue";

function mapClientRow(row) {
  return {
    id: row.id,
    name: row.name,
    lastName: row.lastName ?? "",
    familyName: row.familyName ?? "",
    phone: row.phone ?? "",
    email: row.email ?? "",
    notes: row.notes ?? "",
  };
}

export const clientsSqliteService = {
  async load() {
    const db = await getDB();
    const rows = await db.select("SELECT * FROM clients ORDER BY name, lastName");
    return rows.map(mapClientRow);
  },

  async saveAll(clients) {
    return enqueueSqliteWrite(async () => {
      const db = await getDB();

      const safeClients = Array.isArray(clients)
        ? clients.filter((client) => client && typeof client === "object")
        : [];

      assertUniqueIds(safeClients, "client");

      await db.execute("DELETE FROM clients");

      for (const client of safeClients) {
        await db.execute(
          `
          INSERT INTO clients (id, name, lastName, familyName, phone, email, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            client.id,
            client.name || "",
            client.lastName || "",
            client.familyName || "",
            client.phone || "",
            client.email || "",
            client.notes || "",
          ]
        );
      }
    });
  },

  async seedIfEmpty() {
    const db = await getDB();
    const rows = await db.select("SELECT COUNT(*) as count FROM clients");
    const count = Number(rows?.[0]?.count ?? 0);

    if (count === 0) {
      await this.saveAll(initialClients);
    }
  },
};