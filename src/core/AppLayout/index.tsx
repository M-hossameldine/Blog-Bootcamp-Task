import { Layout } from '@/components/Layout';
import { AppRoutesProvider } from '../AppRoutesProvider';

export const AppLayout = () => {
  return (
    <Layout>
      <AppRoutesProvider />
    </Layout>
  );
};
