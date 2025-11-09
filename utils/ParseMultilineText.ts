export function parseMultilineText(value: string | string[] | undefined): string[] {
  if (!value) return []; 
  if (Array.isArray(value)) return value;
  return value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
