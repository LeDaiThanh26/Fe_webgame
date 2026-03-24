/**
 * Chuyển số giây thành chuỗi "Xh Ym Zs"
 */
export function formatPlayTime(time: number): string {
  const total = Number(time) || 0;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/**
 * Tạo class string từ các điều kiện (cn utility)
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format ngày sang định dạng tiếng Việt
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("vi-VN");
}

/**
 * Format ngày + giờ sang định dạng tiếng Việt
 */
export function formatDateTime(dateStr: string): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return (
    date.toLocaleDateString("vi-VN") +
    " " +
    date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}
