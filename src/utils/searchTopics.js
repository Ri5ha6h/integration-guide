export function matchesTopic(item, query) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return true;
  const searchable = Object.values(item)
    .flat(Infinity)
    .filter((value) => typeof value === "string")
    .join(" ")
    .toLocaleLowerCase();
  return searchable.includes(normalized);
}
