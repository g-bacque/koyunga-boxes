import materials from "./src/data/materials.js";

const counts = {};

for (const material of materials) {
  if (!material?.id) continue;
  counts[material.id] = (counts[material.id] || 0) + 1;
}

const duplicates = Object.entries(counts).filter(([, count]) => count > 1);

if (duplicates.length === 0) {
  console.log("No duplicate IDs found.");
} else {
  console.log("Duplicate IDs found:");
  duplicates.forEach(([id, count]) => {
    console.log(`${id} -> ${count} times`);
  });
}