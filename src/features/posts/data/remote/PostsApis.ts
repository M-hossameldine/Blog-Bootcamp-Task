import { appApi } from '@/app/api';
import type {
  PostsRequestResult,
  PostsRequestQueryParams,
  PostsRequestResponse,
  PostDetailsRequestResult,
  PostDetailsRequestQueryParams,
  AddPostRequestResult,
  AddPostRequestPayload,
  AuthorsRequestResult,
  AuthorDetailsRequestResult,
  AuthorDetailsRequestQueryParams,
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

    getPostDetails: builder.query<
      PostDetailsRequestResult,
      PostDetailsRequestQueryParams
    >({
      query: ({ id }: PostDetailsRequestQueryParams) => `/posts/${id}`,
    }),
    getAuthors: builder.query<AuthorsRequestResult, undefined>({
      query: () => `/users`,
    }),

    addPost: builder.mutation<AddPostRequestResult, AddPostRequestPayload>({
      query: (payload: AddPostRequestPayload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
      }),
    }),

    getAuthorDetails: builder.query<
      AuthorDetailsRequestResult,
      AuthorDetailsRequestQueryParams
    >({
      query: ({ id }: AuthorDetailsRequestQueryParams) => `/users/${id}`,
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useGetAuthorsQuery,
  useGetPostDetailsQuery,
  useAddPostMutation,
  useLazyGetAuthorDetailsQuery,
  useGetAuthorDetailsQuery,
} = PostsApis;
