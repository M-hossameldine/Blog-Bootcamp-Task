import { appApi } from '@/app/api';
import type {
  PostsRequestResult,
  PostsRequestQueryParams,
  PostsRequestResponse,
  AuthorsRequestResult,
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

      transformResponse: (response: PostsRequestResponse, meta, args) => {
        const totalCount = Number(meta?.response?.headers.get('x-total-count'));
        const totalPages = Math.ceil(totalCount / Number(args.perPage));

        return {
          data: response,
          totalPages,
        };
      },
    }),
    getAuthors: builder.query<AuthorsRequestResult, undefined>({
      query: () => `/users`,
    }),
  }),
});

export const { useLazyGetPostsQuery, useGetAuthorsQuery } = PostsApis;
