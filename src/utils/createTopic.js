export function createTopic(group, title, details) {
  return { group, title, ...details };
}
