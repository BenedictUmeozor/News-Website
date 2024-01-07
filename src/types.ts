export type News = {
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
};

export type Pagination = {
  limit: number;
  offset: number;
  count: number;
  total: number;
};

export type ApiResponse = {
  pagination: Pagination;
  data: News[];
};
