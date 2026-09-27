export default function RichText({ children }) {
  const occurrences = new Map();
  return children.split(/(`[^`]+`)/g).map((part) => {
    const occurrence = occurrences.get(part) ?? 0;
    occurrences.set(part, occurrence + 1);
    const isInlineCode = part.startsWith("`") && part.endsWith("`");
    return isInlineCode
      ? <code key={`${part}-${occurrence}`}>{part.slice(1, -1)}</code>
      : part;
  });
}
