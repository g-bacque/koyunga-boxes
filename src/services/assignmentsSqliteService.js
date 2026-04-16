import { getDB } from "./database";
import initialAssignments from "../data/assignments";
import { assertUniqueIds } from "./sqliteUtils";
import { enqueueSqliteWrite } from "./sqliteWriteQueue";

function mapAssignmentRow(row) {
  return {
    id: row.id,
    clientId: row.clientId,
    materialIds: row.materialIds ? JSON.parse(row.materialIds) : [],
    assignedAt: row.assignedAt,
    returnedAt: row.returnedAt ?? null,
    status: row.status ?? "active",
    notes: row.notes ?? "",
  };
}

export const assignmentsSqliteService = {
  async load() {
    const db = await getDB();

    const rows = await db.select(`
      SELECT *
      FROM assignments
      ORDER BY assignedAt DESC, id ASC
    `);

    return rows.map(mapAssignmentRow);
  },

  async saveAll(assignments) {
    return enqueueSqliteWrite(async () => {
      const db = await getDB();

      const safeAssignments = Array.isArray(assignments)
        ? assignments.filter(
            (assignment) => assignment && typeof assignment === "object"
          )
        : [];

      assertUniqueIds(safeAssignments, "assignment");

      await db.execute("DELETE FROM assignments");

      for (const assignment of safeAssignments) {
        await db.execute(
          `
          INSERT INTO assignments (
            id,
            clientId,
            materialIds,
            assignedAt,
            returnedAt,
            status,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            assignment.id,
            assignment.clientId,
            JSON.stringify(assignment.materialIds || []),
            assignment.assignedAt || "",
            assignment.returnedAt || null,
            assignment.status || "active",
            assignment.notes || "",
          ]
        );
      }
    });
  },

  async seedIfEmpty() {
    const db = await getDB();
    const rows = await db.select("SELECT COUNT(*) as count FROM assignments");
    const count = Number(rows?.[0]?.count ?? 0);

    if (count === 0) {
      await this.saveAll(initialAssignments);
    }
  },
};