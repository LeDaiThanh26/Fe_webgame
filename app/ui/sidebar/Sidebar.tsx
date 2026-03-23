"use client";

import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import SidebarProfile from "./SidebarProfile";
import SidebarSearch from "./SidebarSearch";
import { useSidebarData } from "@/app/hooks/useSidebarData";

type SidebarProps = {
  isMobile: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProfile?: boolean;
  setIsProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  isMobile,
  isSearchOpen,
  setIsSearchOpen,
  isProfile = false,
  setIsProfile,
}: SidebarProps) {
  const {
    user,
    avatarUrl,
    favouriteGames,
    recentGames,
    recommendedGames,
    totalGame,
    searchGames,
  } = useSidebarData();

  // Khoá scroll khi mở sidebar
  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? "hidden" : "auto";
  }, [isSearchOpen]);

  const closeSidebar = () => {
    setIsSearchOpen(false);
    setIsProfile(false);
  };

  return (
    <>
      {/* Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[90]"
          onClick={closeSidebar}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full ${isProfile ? "bg-[#FFC0CB]" : "bg-[#00ffee]"} shadow-2xl z-[100]
          transition-transform duration-300 ease-in-out
          ${isSearchOpen ? "translate-x-0" : "-translate-x-full"}
          ${isMobile ? "w-full" : "w-[700px]"}
        `}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto no-scrollbar">
          {/* Close button */}
          {isSearchOpen && (
            <button
              onClick={closeSidebar}
              className="absolute cursor-pointer top-6 -right-7 p-[14px] bg-white rounded-full hover:scale-110 transition-transform duration-200 shadow-md"
            >
              <ChevronLeft size={28} className="text-[#002B50]" />
            </button>
          )}

          {/* Profile or Search */}
          {isProfile ? (
            <SidebarProfile
              user={user}
              avatarUrl={avatarUrl}
              totalGame={totalGame}
            />
          ) : (
            <SidebarSearch
              searchGames={searchGames}
              recommendedGames={recommendedGames}
              recentGames={recentGames}
              favouriteGames={favouriteGames}
            />
          )}
        </div>
      </div>
    </>
  );
}
