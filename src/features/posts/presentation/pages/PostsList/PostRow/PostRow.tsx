import type { Post } from '@/features/posts/domain/types';

type PostRowProps = {
  post: Post;
  onPostClick: (post: Post) => void;
};

export const PostRow = ({ post, onPostClick }: PostRowProps) => {
  return (
    <div
      className="px-4 py-4.5 text-start border-b border-black/15   hover:bg-white/50 cursor-pointer truncate w-full"
      onClick={() => {
        onPostClick(post);
      }}
    >
      {post.title}
    </div>
  );
};
