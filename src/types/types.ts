export interface Article {
  id: number;
  title: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
  };
  likeCount: number;
}

export interface BoardsProps {
  bestArticles: Article[];
  totalArticles: Article[];
  totalCount: number;
}

export interface TotalBoardsProps {
  totalArticles: Article[];
  totalCount: number;
}

export interface BestBoardsProps {
  bestArticles: Article[];
}

export interface UserProfile {
  id: number;
  code: string;
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}
