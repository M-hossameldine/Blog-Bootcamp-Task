import { appApi } from '@/app/api';
import type {
  PostsRequestResult,
  PostsRequestQueryParams,
} from './PostApis.interfaces';

export const PostsApis = appApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<PostsRequestResult, PostsRequestQueryParams>({
      query: ({
        perPage,
        pageNumber,
        authorId,
        searchKeyword,
      }: PostsRequestQueryParams) =>
        `/posts?_limit=${perPage}&_page=${pageNumber}${authorId ? `&userId=${authorId}` : ''}${searchKeyword ? `&q=${searchKeyword}` : ''}`,
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = PostsApis;
