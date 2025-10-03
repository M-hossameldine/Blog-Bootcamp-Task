import { lazy } from 'react';
import type { AppRouteConfig } from './index';

const PostList = lazy(
  () => import('@/features/posts/presentation/pages/PostsList')
);
const PostDetails = lazy(
  () => import('@/features/posts/presentation/pages/PostDetails')
);
const AddPost = lazy(
  () => import('@/features/posts/presentation/pages/AddPost')
);

export const postsConfig = {
  postsList: {
    route: '/posts',
    path: () => `/posts`,
    element: <PostList />,
  } satisfies AppRouteConfig<{ id: string }>,
  postDetails: {
    route: '/posts/:id',
    path: (args: { id: string }) => `/posts/${args.id}`,
    element: <PostDetails />,
  } satisfies AppRouteConfig<{ id: string }>,
  createPost: {
    route: '/posts/create',
    path: () => '/posts/create',
    element: <AddPost />,
  } satisfies AppRouteConfig,
};
