export function ConvertTextareaToObject(text: string) {
  const lines = text.split("\n").filter(line => line.trim() !== "");
  const result: Record<string, string> = {};

  lines.forEach((line, index) => {
    result[(index + 1).toString()] = line.trim();
  });

  return result;
}
