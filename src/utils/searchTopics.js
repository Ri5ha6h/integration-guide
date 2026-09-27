function collectStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

export function matchesTopic(item, query) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return true;
  const searchable = collectStrings(item).join(" ").toLocaleLowerCase();
  return searchable.includes(normalized);
}
