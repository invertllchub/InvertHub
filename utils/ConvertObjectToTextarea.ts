export function ConvertObjectToTextarea(obj: Record<string, string> = {}) {
  return Object.keys(obj)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => obj[key])
    .join("\n");
}
