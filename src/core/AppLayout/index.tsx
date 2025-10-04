import { Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { AppRoutesProvider } from '../AppRoutesProvider';

import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export const AppLayout = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <AppRoutesProvider />
      </Suspense>
    </Layout>
  );
};
