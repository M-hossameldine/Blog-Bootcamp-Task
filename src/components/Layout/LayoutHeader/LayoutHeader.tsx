import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { postsConfig } from '@/core/AppRoutes/PostsRoutes';

export const LayoutHeader = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    void navigate(postsConfig.postsList.path());
  };

  return (
    <header className="relative flex items-center justify-center rounded-2xl bg-white/50 px-6 py-4 font-semibold text-white backdrop-blur-lg">
      <Button
        variant="link"
        size={'sm'}
        className="absolute top-1/2 left-6 -translate-y-1/2 text-[clamp(14px,2vw,20px)] p-0 text-white cursor-pointer hover:no-underline has-[>svg]:px-0"
        onClick={handleNavigate}
      >
        Elevate
      </Button>
      <h1 className="mx-auto text-[clamp(1rem,2vw,24px)]">
        Frontend Advanced Bootcamp Task
      </h1>
    </header>
  );
};
