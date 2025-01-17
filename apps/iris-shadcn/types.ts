export interface Medium {
  alt_text: string;
  url: {
    proxy: string;
  };
  dimensions: string;
}

export interface Category {
  description: string;
  id: string;
  medium: Medium;
  name: string;
  slug: string;
}


export interface User {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  slug: string;
  medium: Medium;
}


export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  published_date: string;
  medium?: Medium;
  categories?: Category[];
  users?: User[];
}

export interface FormatNode {
  id: string;
  slug: string;
  name: string;
}

export interface PostNode {
  users: User[];
  categories: Category[];
  medium: Medium;
  format: FormatNode;
  published_date: string;
  id: string;
  excerpt: string;
  status: string;
  subtitle: string;
  title: string;
  slug: string;
}

export interface PostQueryData {
  category: Category | null;
  formats?: {
    nodes: FormatNode[];
  };
  posts: {
    nodes: PostNode[];
  };
}
