/**
 * Lấy URL avatar ngẫu nhiên từ waifu.pics
 */
export async function generateAvatar(): Promise<string> {
  const res = await fetch("https://api.waifu.pics/sfw/waifu");
  const data = await res.json();
  return data.url;
}
