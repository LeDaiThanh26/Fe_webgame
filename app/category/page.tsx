"use client";

import CategorySection from "@/app/ui/CategorySection";
import LeaderBoard from "@/app/ui/LeaderBoard";
import { Player,Category } from "@/app/ui/types";
interface Game {
  image: string;
  video: string;
  title: string;
  href: string;
  currentPlaying: number;
}

const sampleGames: Game[] = [
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  {
    image:
      "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
    video:
      "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
    title: "YoHoHo.io",
    href: "/g/yohoho-io",
    currentPlaying: 1500,
  },
  
];
const mockPlayers: Player[] = [
  {
    rank: 1,
    name: "Nguyễn Lâm Phong",
    experiencePoints: 365473,
    playTime: "156h10p35s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
  {
    rank: 2,
    name: "Trần Văn A",
    experiencePoints: 320000,
    playTime: "140h20p10s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
  {
    rank: 3,
    name: "Lê Thị B",
    experiencePoints: 280000,
    playTime: "120h15p25s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
  {
    rank: 4,
    name: "Lê Thị B",
    experiencePoints: 280000,
    playTime: "120h15p25s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
  {
    rank: 5,
    name: "Lê Thị B",
    experiencePoints: 280000,
    playTime: "120h15p25s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
  {
    rank: 6,
    name: "Lê Thị B",
    experiencePoints: 280000,
    playTime: "120h15p25s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
  {
    rank: 7,
    name: "Lê Thị B",
    experiencePoints: 280000,
    playTime: "120h15p25s",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.ByOuElmqwpS6F9ScgWwBvAHaHa"
  },
];

export default function CategoryLayout() {
  return (
    <div className="flex flex-col gap-5 w-[1230px] ">
    <div className="flex w-full gap-7">
      {/* LEFT */}
      <div className="flex flex-col w-[72%] gap-7">
        <CategorySection
          bannerSrc="/banner_gamehaynhat.png"
          altText="Game Hay Nhất"
          games={sampleGames}
          isGameHayNhat={true}
        />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-[28%] gap-5">
                <LeaderBoard 
                  players={mockPlayers} 
                />
          </div>
    </div>
    </div>
  );
}
