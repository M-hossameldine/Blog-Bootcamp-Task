import { Toaster } from '@/components/ui/sonner';
import { LayoutHeader } from './LayoutHeader';

import Background from '@/assets/images/EverestBackground.jpg';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="mx-auto flex h-full max-w-[1200px] flex-col">
        <LayoutHeader />

        <div className="h-full mt-4 overflow-y-auto">{children}</div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};
