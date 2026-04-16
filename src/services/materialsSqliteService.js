import { getDB } from "./database";
import initialMaterials from "../data/materials";
import { assertUniqueIds } from "./sqliteUtils";
import { enqueueSqliteWrite } from "./sqliteWriteQueue";

function mapMaterialRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category ?? "",
    level: row.level ?? "",
    status: row.status ?? "available",
    notes: row.notes ?? "",
    currentClientId: row.currentClientId ?? null,
  };
}

export const materialsSqliteService = {
  async load() {
    const db = await getDB();

    const rows = await db.select(`
      SELECT *
      FROM materials
      ORDER BY category, level, id
    `);

    return rows.map(mapMaterialRow);
  },

  async saveAll(materials) {
    return enqueueSqliteWrite(async () => {
      const db = await getDB();

      const safeMaterials = Array.isArray(materials)
        ? materials.filter((material) => material && typeof material === "object")
        : [];

      assertUniqueIds(safeMaterials, "material");

      await db.execute("DELETE FROM materials");

      for (const material of safeMaterials) {
        await db.execute(
          `
          INSERT INTO materials (
            id,
            name,
            category,
            level,
            status,
            notes,
            currentClientId
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            material.id,
            material.name || "",
            material.category || "",
            material.level || "",
            material.status || "available",
            material.notes || "",
            material.currentClientId || null,
          ]
        );
      }
    });
  },

  async seedIfEmpty() {
    const db = await getDB();
    const rows = await db.select("SELECT COUNT(*) as count FROM materials");
    const count = Number(rows?.[0]?.count ?? 0);

    if (count === 0) {
      await this.saveAll(initialMaterials);
    }
  },
};