import { PostRow } from '../PostRow';

import type { Post } from '@/features/posts/domain/types';

type PostListRowsProps = {
  posts: Post[];
  onPostClick: (post: Post) => void;
  isLoading: boolean;
};

export const PostListRows = ({
  posts,
  onPostClick,
  isLoading,
}: PostListRowsProps) => {
  if (posts.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] h-full">
        <p className="text-gray-800">No posts found</p>
      </div>
    );
  }

  return posts.map(post => (
    <PostRow key={post.id} post={post} onPostClick={onPostClick} />
  ));
};
