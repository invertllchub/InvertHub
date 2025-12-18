/* =========================
   Editor.js Block Types
========================= */

// Header
export type HeaderBlock = {
  type: "header";
  data: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
};

// Paragraph
export type ParagraphBlock = {
  type: "paragraph";
  data: {
    text: string;
  };
};

// Image
export type ImageBlock = {
  type: "image";
  data: {
    file: {
      url: string;
    };
    caption?: string;
    withBorder?: boolean;
    stretched?: boolean;
    withBackground?: boolean;
  };
};

// List
export type ListBlock = {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: Array<string | { text: string }>;
    meta?: Record<string, any>; // optional إذا موجود
  };
};

// Quote (اختياري لكن مفيد)
export type QuoteBlock = {
  type: "quote";
  data: {
    text: string;
    caption?: string;
  };
};

/* =========================
   Block Union
========================= */

export type Block =
  | HeaderBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | QuoteBlock;

/* =========================
   Article
========================= */

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
}


export interface Article {
  id: string;
  time: number; // Editor.js timestamp
  title: string;
  slug: string;
  subTitle?: string;
  description?: string;
  coverImageUrl?: string;
  publicationDate: string;
  author?: string;
  content: {
    time: number;
    blocks: Block[];
    version: string;
  };
  version: string;
  seo?: ArticleSEO;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

/* =========================
   API Responses
========================= */

export interface ArticlesResponse {
  articles: Article[];
}

export interface ArticleResponse {
  article: Article;
}
