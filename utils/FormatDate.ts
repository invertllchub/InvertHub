
export default function formatDate(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

