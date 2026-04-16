export function assertUniqueIds(items, entityName) {
  const seen = new Set();

  for (const item of items) {
    if (!item || typeof item !== "object") continue;

    if (seen.has(item.id)) {
      throw new Error(
        `Duplicate ${entityName} id detected before save: ${item.id}`
      );
    }

    seen.add(item.id);
  }
}