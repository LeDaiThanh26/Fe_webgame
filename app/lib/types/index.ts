// ============================================================
// CENTRALIZED TYPES – tất cả type dùng chung đặt tại đây
// ============================================================

export type Game = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  thumbnail?: string;
  image?: string | string[];
  video: string;
  slug: string;
  currentPlaying?: number;
  category?: string;
};

export type GameDetail = {
  _id: string;
  name: string;
  slug: string;
  dev?: string;
  release_date?: string;
  last_update?: string;
  technology?: string;
  platforms: string[];
  thumbnail?: string;
  image?: string[];
  description?: string;
  how_to_play?: string;
  link_game?: string;
  video?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Category = {
  id: string;
  image: string;
  title: string;
  color: string;
  games: Game[];
};

export type Player = {
  name: string;
  experiencePoints: number;
  playTime: string | number;
  avatar: string;
};

export type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  experiencePoints: number;
  playTime: number;
};

export type FavouriteGame = {
  _id: string;
  name: string;
  thumbnail: string;
  video: string;
  slug: string;
};

export type CommentData = {
  _id: string;
  id_user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  comment: string;
  createdAt: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalComments: number;
};

// Admin
export type AdminGame = {
  _id: string;
  name: string;
  slug: string;
  dev?: string;
  release_date?: string;
  technology?: string;
  platforms?: string[] | string;
  category?: string;
  thumbnail?: string;
  image?: string[] | string;
  description?: string;
  how_to_play?: string;
  link_game?: string;
  video?: string;
  createdAt?: string;
  updatedAt?: string;
};
