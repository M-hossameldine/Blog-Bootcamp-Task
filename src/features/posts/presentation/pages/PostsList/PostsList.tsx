import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyGetPostsQuery } from '@/features/posts/data/remote';
import { useGetAuthorsQuery } from '@/features/posts/data/remote';

import { Card, CardContent } from '@/components/ui/card';
import { SearchInput } from '@/components/DataEntry/SearchInput';
import { PostsListHeader } from './PostsListHeader';
import { AuthorFilter } from './AuthorFilter';
import { PostListRows } from './PostListRows';
import { PaginationBar } from './PaginationBar';

import { postsConfig } from '@/core/AppRoutes/PostsRoutes';
import type { Post } from '@/features/posts/domain/types';

const PostsList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [authorId, setAuthorId] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [newSearchKeyword, setNewSearchKeyword] = useState('');

  const [getPosts, { data: postsList, isLoading: isPostsLoading }] =
    useLazyGetPostsQuery();
  const { data: authors } = useGetAuthorsQuery(undefined);

  const handleCreatePost = () => {
    void navigate(postsConfig.createPost.path());
  };

  const handleFiltersChange = useCallback(
    (filters: {
      pageNumber: string;
      authorId: string;
      searchKeyword: string | undefined;
    }) => {
      const isAll = filters.authorId === 'all';

      void getPosts({
        perPage: '10',
        pageNumber: filters.pageNumber,
        authorId: isAll ? undefined : filters.authorId,
        searchKeyword: filters.searchKeyword ?? undefined,
      });

      setCurrentPage(Number(filters.pageNumber));
      setAuthorId(filters.authorId);
      setSearchKeyword(filters.searchKeyword ?? '');
    },
    [getPosts]
  );

  const handlePostClick = (post: Post) => {
    void navigate(postsConfig.postDetails.path({ id: post.id.toString() }));
  };

  useEffect(() => {
    // * load first listing page on mount
    void getPosts({
      perPage: '10',
      pageNumber: '1',
    });
  }, [getPosts]);

  useEffect(() => {
    // * debounce search keyword for 500ms
    const timeout = setTimeout(() => {
      if (newSearchKeyword !== searchKeyword) {
        handleFiltersChange({
          authorId,
          pageNumber: '1',
          searchKeyword: newSearchKeyword,
        });
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [authorId, newSearchKeyword, searchKeyword, handleFiltersChange]);

  return (
    <Card className="h-full w-full overflow-hidden bg-white/50 p-0 backdrop-blur-xs gap-0">
      <PostsListHeader onGoToCreatePost={handleCreatePost} />

      {postsList && (
        <CardContent className="p-0 overflow-y-auto">
          <div className="flex justify-between gap-10 px-4 py-4.5 bg-black/10 border-b border-black/15">
            <SearchInput
              onChange={searchKeyword => {
                setNewSearchKeyword(searchKeyword);
              }}
              placeholder="Search for a post..."
            />
            <AuthorFilter
              authors={authors ?? []}
              onChange={authorId => {
                handleFiltersChange({
                  authorId,
                  searchKeyword,
                  pageNumber: '1',
                });
              }}
            />
          </div>
          <PostListRows
            posts={postsList.data}
            onPostClick={handlePostClick}
            isLoading={isPostsLoading}
          />
          <PaginationBar
            currentPage={currentPage}
            totalPages={postsList.totalPages}
            onPageChange={pageNumber => {
              handleFiltersChange({
                pageNumber: pageNumber.toString(),
                authorId,
                searchKeyword,
              });
            }}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default PostsList;
