import type { Post } from '../../domain/types';

export type PostsRequestResponse = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PostsRequestResult = Post[];

export type PostsRequestQueryParams = {
  pageNumber: string;
  perPage: string;
  authorId?: string;
  searchKeyword?: string;
};
