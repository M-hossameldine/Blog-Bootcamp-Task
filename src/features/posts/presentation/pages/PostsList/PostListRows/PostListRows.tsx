import { PostRow } from '../PostRow';

import type { Post } from '@/features/posts/domain/types';

type PostListRowsProps = {
  posts: Post[];
  onPostClick: (post: Post) => void;
};

export const PostListRows = ({ posts, onPostClick }: PostListRowsProps) => {
  return posts.map(post => (
    <PostRow key={post.id} post={post} onPostClick={onPostClick} />
  ));
};
