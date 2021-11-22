export type BlogContentDatatype = {
  id: string;
  content: string;
  createdAt: string;
  publishedAt: string;
  revisedAt?: string;
  thumbnail?: {
    url: string;
    height?: number;
    width?: number;
  };
  title: string;
  updatedAt: string;
};
