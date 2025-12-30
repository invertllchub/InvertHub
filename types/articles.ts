

// Header
export type HeaderBlock = {
  type: "header";
  data: {
    text: string;
  };
};

// Sub-header
export type SubHeaderBlock = {
  type: "subheader";
  data: {
    text: string;
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

// Link
export type LinkBlock = {
  type: "link";
  data: {
    url: string;
  };
};

// List
export type ListBlock = {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: Array<string | { text: string }>;
    meta?: Record<string, any>;   
  };
};

// Quote 
export type QuoteBlock = {
  type: "quote";
  data: {
    text: string;
    caption?: string;
    alignment?: string;
  };
};


export type Block =
  | HeaderBlock
  | SubHeaderBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | QuoteBlock
  | LinkBlock;




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
  time: number; 
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



export interface ArticlesResponse {
  articles: Article[];
}

export interface ArticleResponse {
  article: Article;
}
