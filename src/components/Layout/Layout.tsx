import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/sonner';
import { LayoutHeader } from './LayoutHeader';

import Background from '@/assets/images/EverestBackground.jpg';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ScrollArea
      className="h-screen overflow-y-auto bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="mx-auto max-w-[1200px] flex-col">
        <LayoutHeader />

        <div className="mt-4">{children}</div>
      </div>

      <Toaster position="bottom-right" />
    </ScrollArea>
  );
};
