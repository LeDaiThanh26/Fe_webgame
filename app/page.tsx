import Image from "next/image";

export default function Home() {
  return (
    <>
     <div className="mx-auto h-[600px] max-w-[960px] overflow-hidden rounded-xl">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; camera; microphone; gamepad; accelerometer; gyroscope; clipboard-write"
        scrolling="no"
        allowFullScreen
      ></iframe>
    </div>

    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Chơi game miễn phí, không cần cài đặt</h1>
          <p className="mt-3 max-w-2xl text-white/90">Hàng nghìn game HTML5: hành động, trí tuệ, thể thao, đua xe, bắn súng, 2 người chơi và hơn thế nữa.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#trending" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-100">Chơi ngay</a>
            <a href="#categories" className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">Khám phá thể loại</a>
          </div>
        </div>


        <Image src="/globe.svg" alt="bg" width={400} height={400} className="pointer-events-none absolute -right-8 -top-10 opacity-30" />
      </section>

      {/* Trending */}
      <section id="trending" className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Xu hướng</h2>
          <a href="#" className="text-sm text-indigo-600 hover:underline">Xem tất cả</a>
        </div>
        <GameGrid count={10} variant="trending" />
      </section>

      {/* New */}
      <section id="new" className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Mới ra mắt</h2>
          <a href="#" className="text-sm text-indigo-600 hover:underline">Xem tất cả</a>
        </div>
        <GameGrid count={10} variant="new" />
      </section>

      {/* Categories */}
      <section id="categories" className="space-y-4">
        <h2 className="text-xl font-semibold">Thể loại</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            "Hành động",
            "Đua xe",
            "Bắn súng",
            "Trí tuệ",
            "Thể thao",
            "2 người chơi",
          ].map((c) => (
            <a key={c} href="#" className="rounded-xl border border-black/10 bg-white px-4 py-6 text-center text-sm font-medium shadow-sm hover:bg-zinc-50 dark:border-white/15 dark:bg-zinc-950 dark:hover:bg-zinc-900">
              {c}
            </a>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}

type GameGridProps = {
  count?: number;
  variant?: "trending" | "new";
};

function GameGrid({ count = 10, variant = "trending" }: GameGridProps) {
  return (

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
    
      {Array.from({ length: count }).map((_, i) => (
        <a
          key={i}
          href="#"
          className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/15 dark:bg-zinc-950"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={variant === "trending" ? "/window.svg" : "/file.svg"}
              alt="Game"
              fill
              className="object-contain p-6 transition group-hover:scale-105"
            />
          </div>
          <div className="p-3">
            <p className="line-clamp-1 text-sm font-medium">
              {variant === "trending" ? "Game hấp dẫn" : "Game mới"} #{i + 1}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {variant === "trending" ? "Hành động • 4.6⭐" : "Phiêu lưu • 4.3⭐"}
            </p>
          </div>
          
        </a>
        
      ))}
    </div>
  );
}
