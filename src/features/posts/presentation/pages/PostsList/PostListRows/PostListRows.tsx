import { CardContent } from '@/components/ui/card';
import { PostRow } from '../PostRow';

import type { Post } from '@/features/posts/domain/types';

type PostListRowsProps = {
  posts: Post[];
  onPostClick: (post: Post) => void;
};

export const PostListRows = ({ posts, onPostClick }: PostListRowsProps) => {
  return (
    <CardContent className="p-0 overflow-y-auto">
      {posts.map(post => (
        <PostRow key={post.id} post={post} onPostClick={onPostClick} />
      ))}
    </CardContent>
  );
};
