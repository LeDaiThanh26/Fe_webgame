import Image from "next/image"
import {FaGrinSquint, FaSearch} from "react-icons/fa"
import PokiCard from "@/app/ui/PokiCard"
import GameCard from "@/app/ui/GameCard"

export default function Home() {
  return (
    <div className="flex "> {/* gap tạo khoảng cách đều */}
      <div className="flex flex-col">
        <PokiCard/>
        <GameCard 
          image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
          video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
          title="YoHoHo.io"
          href="/en/g/yohoho-io"
        />
      </div>
      <div className="flex flex-col">
        <GameCard 
          image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=408,height=408,fit=cover,f=auto/0c3d1446c6992c2b88a9498de054688b/level-devil.png"
          video="https://v.poki-cdn.com/c38a1218-5d2f-4d92-98ec-e924414a8a48/thumbnail.3x3.vp9.mp4"
          title="Level Devil"
          href="/en/g/Level Devil"
        />
        <GameCard 
          image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
          video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
          title="YoHoHo.io"
          href="/en/g/yohoho-io"
        />
      </div>
    </div>
  );
}
