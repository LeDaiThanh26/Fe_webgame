import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebGame - Chơi game online miễn phí",
  description: "Cổng game trực tuyến: Hành động, trí tuệ, đua xe, bắn súng, 2 người chơi và hơn thế nữa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/50">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black">G</span>
              <span className="text-lg font-semibold tracking-tight">WebGame</span>
            </a>
            <nav className="ml-auto hidden gap-6 text-sm sm:flex">
              <a href="#trending" className="hover:text-black dark:hover:text-white">Xu hướng</a>
              <a href="#new" className="hover:text-black dark:hover:text-white">Mới nhất</a>
              <a href="#categories" className="hover:text-black dark:hover:text-white">Thể loại</a>
            </nav>
            <form className="ml-4 flex flex-1 items-center sm:ml-6">
              <input
                type="search"
                placeholder="Tìm game..."
                className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-black/20 dark:border-white/15 dark:bg-zinc-950 dark:focus:border-white/25"
              />
            </form>
          </div>
        </header>
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
