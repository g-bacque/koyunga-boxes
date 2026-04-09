export function getCategorySlug(category = "") {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getCategoryBackground(category = "") {
  const normalized = category.trim().toLowerCase();

  if (!normalized) return "#ffffff";

  const palette = [
    "#f5f9ff", // azul muy suave
    "#f6fbf7", // verde muy suave
    "#fff8f4", // melocotón muy suave
    "#fbf7ff", // lila muy suave
    "#fffaf0", // crema suave
    "#f7fbfb", // turquesa muy suave
    "#fdf6f8", // rosa muy suave
    "#f8f8ff", // lavanda muy suave
  ];

  let hash = 0;

  for (let i = 0; i < normalized.length; i += 1) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }

  const index = Math.abs(hash) % palette.length;
  return palette[index];
}