import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyGetPostsQuery } from '@/features/posts/data/remote';

import { Card } from '@/components/ui/card';
import { PostsListHeader } from './PostsListHeader';
import { PostListRows } from './PostListRows';
import { PaginationBar } from './PaginationBar';

import { postsConfig } from '@/core/AppRoutes/PostsRoutes';
import type { Post } from '@/features/posts/domain/types';

const PostsList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const [getPosts, { data: posts }] = useLazyGetPostsQuery();

  useEffect(() => {
    void getPosts({
      perPage: '10',
      pageNumber: '1',
    });
  }, [getPosts]);

  const handleCreatePost = () => {
    void navigate(postsConfig.createPost.path());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    void getPosts({
      perPage: '10',
      pageNumber: page.toString(),
    });
  };

  const handlePostClick = (post: Post) => {
    void navigate(postsConfig.postDetails.path({ id: post.id.toString() }));
  };

  return (
    <Card className="h-full w-full overflow-hidden bg-white/35 p-0 backdrop-blur-xs gap-0">
      <PostsListHeader onGoToCreatePost={handleCreatePost} />

      {posts && (
        <>
          <PostListRows posts={posts} onPostClick={handlePostClick} />
          <PaginationBar
            currentPage={currentPage}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Card>
  );
};

export default PostsList;
