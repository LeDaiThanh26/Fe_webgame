"use client"
import GameCategoriesSection from "@/app/ui/GameCategoriesSection";
import CategorySection from "@/app/ui/CategorySection";
import { Player,Category } from "./ui/types";
import LeaderBoard from "./ui/LeaderBoard";
import Image from "next/image";

export default function Home() {
  /// đoạn ni là call api ra mảng dữ liệu
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
  const mockCategories: Category[] = [
    {
      id: "driving",
      image: "https://tse1.mm.bing.net/th/id/OIP.qzRrYOwUN9_HkeIlbOBDCwHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Driving",
      color: "#0EA5E9",
      games: [
        {
          id: "yohoho-1",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "yohoho-2",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "yohoho-3",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "yohoho-4",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "yohoho-5",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "yohoho-6",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        }
      ]
    },
    {
      id: "for-girls",
      image: "https://tse4.mm.bing.net/th/id/OIP.BjSEPZ5nXCnMDMqBBVzBhQHaD4?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "For Girls",
      color: "#db61c9",
      games: [
        {
          id: "girls-game-1",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "girls-game-2",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "girls-game-3",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "girls-game-4",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "girls-game-5",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "girls-game-6",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        }
      ]
    },
    {
      id: "shooting",
      image: "https://th.bing.com/th/id/R.a64fd915a34c87e9a2c3d2e0f74109fb?rik=kZtUnnEipprgyw&pid=ImgRaw&r=0",
      title: "Shooting",
      color: "#b88b1e",
      games: [
        {
          id: "shooting-game-1",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "shooting-game-2",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "shooting-game-3",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "shooting-game-4",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "shooting-game-5",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        },
        {
          id: "shooting-game-6",
          image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
          video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
          title: "YoHoHo.io",
          href: "/en/g/yohoho-io"
        }
      ]
    }
  ];


  const handleViewAll = () => {
    console.log("Xem tất cả leaderboard");
    // Navigate hoặc open modal
  };
  const handleNavigateCategory = (categoryId: string) => {
    console.log(`Navigate to category: ${categoryId}`);
    // router.push(`/category/${categoryId}`) hoặc mở modal
  };



  return (
    <div className="flex flex-col gap-5 w-[1230px] ">
      <GameCategoriesSection 
          title="Online Games at GameZone"
          categories={mockCategories}
          onNavigateCategory={handleNavigateCategory}
      />

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
          <div className="flex flex-col w-[28%] gap-6">
                <LeaderBoard 
                  players={mockPlayers} 
                  onViewAll={handleViewAll}
                />
              <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
                <Image
                  src={"/banner_quangcao3.png"}
                  alt="Quảng cáo game"
                  width={999}
                  height={999}
                  className="rounded-[5px]"
                >
                </Image>
                
              </div>
              <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
                <Image
                  src={"/banner_quangcao4.jpg"}
                  alt="Quảng cáo game"
                  width={999}
                  height={999}
                  className="rounded-[5px]"
                >
                </Image>
                
              </div>
          </div>
      </div>
      
    </div>
  );
}
