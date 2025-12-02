export interface Block {
  type: string;
  data: any; 
}

export interface Article {
  id: string;
  time: number;
  blocks: {
    type: string;
    data: {
      text: string;
      level: number;
    };
  }[];
  version: string;
  author?: string;
}

export interface ArticlesResponse {
  articles: Article[];
}
