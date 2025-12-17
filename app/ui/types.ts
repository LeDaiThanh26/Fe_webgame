export type Player = {

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

  export type User ={
    id: string;
    name: string;
    email: string;
    experiencePoints: number;
    playTime: number
  }
  