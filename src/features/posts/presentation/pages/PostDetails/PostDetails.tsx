import { useParams, useNavigate } from 'react-router-dom';

import {
  useGetPostDetailsQuery,
  useGetAuthorDetailsQuery,
} from '@/features/posts/data/remote';

import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateFormat } from '@/components/DataDisplay/DateFormat';

import { ArrowLeft, User, Calendar } from 'lucide-react';
import { postsConfig } from '@/core/AppRoutes/PostsRoutes';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post } = useGetPostDetailsQuery({ id: id ?? '' });
  const { data: author } = useGetAuthorDetailsQuery(
    {
      id: (post?.userId ?? '').toString(),
    },
    {
      skip: !post?.userId,
    }
  );

  const handleBackToPosts = () => {
    void navigate(postsConfig.postsList.path());
  };

  return (
    <Card className="h-full bg-white/50 backdrop-blur-lg text-start p-0 overflow-hidden grow gap-0">
      <CardHeader className="flex flex-col justify-end items-start gap-4 text-white bg-gradient-to-t from-[#21609A]/75 to-[#00254A]/75 p-6">
        <CardAction>
          <Button
            className="gap-1.5 font-semibold rounded-3xl text-black bg-white/75 cursor-pointer"
            variant="outline"
            onClick={handleBackToPosts}
          >
            <ArrowLeft className="size-4" />
            Back to Posts
          </Button>
        </CardAction>
        <CardTitle className="text-4xl font-bold text-white">
          {post?.title}
        </CardTitle>

        <div className="flex items-center gap-6">
          <p className="flex items-center gap-1.5 text-sm">
            <User className="size-4 opacity-50" /> {author?.name}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Calendar className="size-4 opacity-50" />
            <DateFormat dateString={new Date().toLocaleDateString()} />
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-6 max-w-[600px]">{post?.body}</CardContent>
    </Card>
  );
};

export default PostDetails;
