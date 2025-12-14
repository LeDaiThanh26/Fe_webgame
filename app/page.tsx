import Image from "next/image"
import {FaGrinSquint, FaSearch} from "react-icons/fa"
import GameCard from "@/app/ui/GameCard"
import CategoryCard from "@/app/ui/CategoryCard";
export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex bg-white flex-col w-[1200px] h-[500px] mt-5 rounded-[5px] p-5 shadow-2xl">
      <h1 className="text-2xl font-bold">Online Games at GameZone</h1>
          <CategoryCard image="https://tse1.mm.bing.net/th/id/OIP.qzRrYOwUN9_HkeIlbOBDCwHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" 
                      title="Driving" 
                      color="#0EA5E9"/>
      
      </div>
         
      <div className="flex flex-col">
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
