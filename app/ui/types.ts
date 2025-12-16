export type Player = {
    rank: number;
    name: string;
    experiencePoints: number;
    playTime: string;
    avatar: string;
  };
  export type Game = {
    id: string;
    image: string;
    video: string;
    title: string;
    slug: string;
  };
  
  export type Category = {
    id: string;
    image: string;
    title: string;
    color: string;
    games: Game[];
  };