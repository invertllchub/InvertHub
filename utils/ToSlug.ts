export function ToSlug(str: string): string {
  return str
    .trim()                   // تشيل المسافات من البداية والنهاية
    .toLowerCase()            // تخلي كله small letters
    .replace(/\s+/g, "-")     // أي مسافات (واحدة أو أكتر) تتحول لـ "-"
    .replace(/[^\w-]+/g, ""); // تشيل أي رموز غير الحروف/أرقام/-
}
