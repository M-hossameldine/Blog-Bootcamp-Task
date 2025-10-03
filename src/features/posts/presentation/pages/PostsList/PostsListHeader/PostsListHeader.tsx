import { Button } from '@/components/ui/button';
import { CardAction, CardHeader, CardTitle } from '@/components/ui/card';

import { Plus, ScrollText } from 'lucide-react';

type PostsListHeaderProps = {
  onGoToCreatePost: () => void;
};

export const PostsListHeader = ({ onGoToCreatePost }: PostsListHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between bg-white px-4 py-4.5">
      <CardTitle className="flex items-center gap-2 text-xl font-semibold">
        <ScrollText className="size-4" /> Post List
      </CardTitle>
      <CardAction>
        <Button
          variant="link"
          size={'sm'}
          className="pis-0 pie-0 h-fit cursor-pointer gap-1.5 p-0 py-0 text-base text-[#7f7f7f] hover:text-[#666666] hover:no-underline has-[>svg]:px-0"
          onClick={onGoToCreatePost}
        >
          <Plus className="mt-0.5 size-4" />
          Create a new post
        </Button>
      </CardAction>
    </CardHeader>
  );
};
