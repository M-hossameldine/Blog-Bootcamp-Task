import type { Post, Author } from '../../domain/types';

export type PostsRequestResponse = {
  id: number;
  userId: number;
  title: string;
  body: string;
}[];

export type PostsRequestResult = {
  data: Post[];
  totalPages: number;
};

export type PostsRequestQueryParams = {
  pageNumber: string;
  perPage: string;
  authorId?: string;
  searchKeyword?: string;
};

export type AuthorsRequestResponse = Author[];

export type AuthorsRequestResult = Author[];
