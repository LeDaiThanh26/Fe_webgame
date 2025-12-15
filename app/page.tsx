"use client"
import {FaGrinSquint, FaSearch,FaChevronRight} from "react-icons/fa"
import GameCard from "@/app/ui/GameCard"
import GameCardV2 from "@/app/ui/GameCardV2"
import CategoryCard from "@/app/ui/CategoryCard";
import Image from "next/image";
import CategorySection from "@/app/ui/CategorySection";

export default function Home() {
  const sampleGames = [
    {
        image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
        video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
        title: "YoHoHo.io",
        href: "/g/yohoho-io",
        currentPlaying: 1500
    },
    {
      image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
      video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
      title: "YoHoHo.io",
      href: "/g/yohoho-io",
      currentPlaying: 1500
  },
  {
    image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},
{
  image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
  video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
  title: "YoHoHo.io",
  href: "/g/yohoho-io",
  currentPlaying: 1500
},

];
  return (
    <div className="flex flex-col gap-5 w-[1230px] ">
      <div className="flex bg-white flex-col w-full h-[520px] mt-5 rounded-[5px] py-5 pl-5 shadow-[0_6px_16.3px_rgba(0,0,0,0.5)]">
          <h1 className="text-3xl font-bold my-3">Online Games at GameZone</h1>
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <CategoryCard image="https://tse1.mm.bing.net/th/id/OIP.qzRrYOwUN9_HkeIlbOBDCwHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" 
                          title="Driving" 
                          color="#0EA5E9"/>
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 h-full w-[33px] rounded-r-2xl">
                <FaChevronRight size={20} className="text-gray-500" />
              </div>

            </div> 
            <div className="flex items-center">
              <CategoryCard image="https://tse4.mm.bing.net/th/id/OIP.BjSEPZ5nXCnMDMqBBVzBhQHaD4?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" 
                        title="For Girls" 
                        color="#db61c9"/>
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 h-full w-[33px] rounded-r-2xl">
                <FaChevronRight size={20} className="text-gray-500" />
              </div>

            </div>
            <div className="flex items-center">
              <CategoryCard image="https://th.bing.com/th/id/R.a64fd915a34c87e9a2c3d2e0f74109fb?rik=kZtUnnEipprgyw&pid=ImgRaw&r=0" 
                        title="Shooting" 
                        color="#b88b1e"/>
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
              <GameCard 
                image="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg"
                video="https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4"
                title="YoHoHo.io"
                href="/en/g/yohoho-io"
              />
               <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 h-full w-[33px] rounded-r-2xl">
                <FaChevronRight size={20} className="text-gray-500" />
              </div>
            </div>  
            
            
          </div>      
      </div>
      <div className="flex w-full gap-7">
          <div className="flex flex-col w-[72%] gap-7">
              <CategorySection
                  bannerSrc="/banner_gamehaynhat.png"
                  altText="Game Hay Nhất"
                  games={sampleGames}
                  isGameHayNhat= {true}
              />
              <CategorySection
                  bannerSrc="/banner_gamebansung.png"
                  altText="Game bắn súng"
                  games={sampleGames}
              />
              <CategorySection
                  bannerSrc="/banner_gameduaxe.png"
                  altText="Game đua xe"
                  games={sampleGames}
                  // class={}
              />
          </div>
          <div className="flex flex-col w-[28%] gap-5">
              <div className="bg-white h-[600px]">
              </div>
              <div className="bg-white h-[600px]">
              </div>
          </div>
      </div>
      
    </div>
  );
}
