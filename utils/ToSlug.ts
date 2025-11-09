export function toSlug(str: string): string {
  return str
    .trim()                // تشيل المسافات من البداية والنهاية
    .toLowerCase()         // تخلي كله small letters
    .replace(/\s+/g, "-"); // أي مسافات (واحدة أو أكتر) تتحول لـ -
}