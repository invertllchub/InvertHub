export function fromSlug(slug: string): string {
  return slug.replace(/-/g, " ");
}