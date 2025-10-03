import type { Post, Author } from '../../domain/types';

// * Get Posts List Api Interfaces
export type PostsRequestResponse = Post[];

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

// * Get Authors List Api Interfaces
export type AuthorsRequestResult = Author[];

// * Get Post Details Api Interfaces
export type PostDetailsRequestResult = Post;

export type PostDetailsRequestQueryParams = {
  id: string;
};

// * Get Author Details Api Interfaces
export type AuthorDetailsRequestResult = Author;

export type AuthorDetailsRequestQueryParams = {
  id: string;
};
