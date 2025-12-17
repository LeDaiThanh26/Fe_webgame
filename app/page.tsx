"use client"
import GameCategoriesSection from "@/app/ui/GameCategoriesSection";
import CategorySection from "@/app/ui/CategorySection";
import { Player, Category } from "./ui/types";
import LeaderBoard from "./ui/LeaderBoard";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "./ui/types";

export async function generateAvatar(): Promise<string> {
  const res = await fetch("https://api.waifu.pics/sfw/waifu");
  const data = await res.json();
  return data.url;
}



export default function Home() {
  const [games, setGames] = useState([]);
  const [Shootinggames, setShootinggames] = useState([]);
  const [Drivinggames, setDrivinggames] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch random 12 games
    fetch('http://localhost:5000/api/games/random-12')
      .then(res => res.json())
      .then(data => setGames(data.data))
      .catch(err => console.error(err));
    
    // Fetch shooter games
    fetch('http://localhost:5000/api/games/category/shooter')
      .then(res => res.json())
      .then(data => setShootinggames(data.data))
      .catch(err => console.error(err));
    
    // Fetch racing games
    fetch('http://localhost:5000/api/games/category/racing')
      .then(res => res.json())
      .then(data => setDrivinggames(data.data))
      .catch(err => console.error(err));
    
    // Fetch all categories with games
    fetch('http://localhost:5000/api/games/allcategory')
      .then(res => res.json())
      .then(data => {
        console.log('Categories response:', data); // Debug log
        // API trả về { data: [...] }
        if (data.data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Categories data is not an array:', data);
          setCategories([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategories([]);
        setLoading(false);
      });
       // Fetch all users
       const fetchUsers = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/users');
          const data = await res.json();
          const userswithAvartar = await Promise.all(
            data.map(async(user: User)=>({
              ...user,
              avatar : await generateAvatar()
            }))
          );
          console.log(userswithAvartar)
          setPlayers(userswithAvartar); 
        } catch (err) {
          console.error(err);
        }
      }; 
      fetchUsers();
      
  }, []);
  
 
  

  const handleViewAll = () => {
    console.log("Xem tất cả leaderboard");
    // Navigate hoặc open modal
  };
  


  return (
    <div className="flex flex-col gap-5 w-[1230px]">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <GameCategoriesSection 
            title="Online Games at GameZone"
            categories={categories}
          />

          <div className="flex w-full gap-7">
            <div className="flex flex-col w-[72%] gap-7">
              <CategorySection
                bannerSrc="/banner_gamehaynhat.png"
                altText="Game Hay Nhất"
                games={games}
                isGameHayNhat={true}
              />
              <CategorySection
                bannerSrc="/banner_gamebansung.png"
                altText="Game bắn súng"
                games={Shootinggames}
              />
              <CategorySection
                bannerSrc="/banner_gameduaxe.png"
                altText="Game đua xe"
                games={Drivinggames}
              />
            </div>
            
            <div className="flex flex-col w-[28%] gap-6">
              <LeaderBoard 
                players={players} 
                onViewAll={handleViewAll}
              />
              <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
                <Image
                  src={"/banner_quangcao3.png"}
                  alt="Quảng cáo game"
                  width={999}
                  height={999}
                  className="rounded-[5px]"
                />
              </div>
              <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
                <Image
                  src={"/banner_quangcao4.jpg"}
                  alt="Quảng cáo game"
                  width={999}
                  height={999}
                  className="rounded-[5px]"
                />

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}