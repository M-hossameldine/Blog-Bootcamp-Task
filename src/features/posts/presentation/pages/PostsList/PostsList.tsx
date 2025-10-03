import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyGetPostsQuery } from '@/features/posts/data/remote';
import { useGetAuthorsQuery } from '@/features/posts/data/remote';

import { Card, CardContent } from '@/components/ui/card';
import { PostsListHeader } from './PostsListHeader';
import { AuthorFilter } from './AuthorFilter';
import { PostListRows } from './PostListRows';
import { PaginationBar } from './PaginationBar';

import { postsConfig } from '@/core/AppRoutes/PostsRoutes';
import type { Post } from '@/features/posts/domain/types';

const PostsList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const [getPosts, { data: postsList }] = useLazyGetPostsQuery();
  const { data: authors } = useGetAuthorsQuery(undefined);

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

  const handleAuthorChange = (authorId: string) => {
    setCurrentPage(1);
    const isAll = authorId === 'all';
    void getPosts({
      perPage: '10',
      pageNumber: '1',
      authorId: isAll ? undefined : authorId,
    });
  };

  const handlePostClick = (post: Post) => {
    void navigate(postsConfig.postDetails.path({ id: post.id.toString() }));
  };

  return (
    <Card className="h-full w-full overflow-hidden bg-white/35 p-0 backdrop-blur-xs gap-0">
      <PostsListHeader onGoToCreatePost={handleCreatePost} />

      {postsList && (
        <CardContent className="p-0 overflow-y-auto">
          <div className="flex justify-between gap-4 px-4 py-4.5 bg-black/10 border-b border-black/15">
            <AuthorFilter
              authors={authors ?? []}
              onChange={handleAuthorChange}
            />
          </div>
          <PostListRows posts={postsList.data} onPostClick={handlePostClick} />
          <PaginationBar
            currentPage={currentPage}
            totalPages={postsList.totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default PostsList;
