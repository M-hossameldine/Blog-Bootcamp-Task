import { postsConfig } from './PostsRoutes';

type RouteWithoutParams = {
  route: string;
  path: () => string;
  element: React.ReactNode;
};

type RouteWithParams<P extends Record<string, string>> = {
  route: string;
  path: (params: P) => string;
  element: React.ReactNode;
};

export type AppRouteConfig<P extends Record<string, string> = never> = [
  P,
] extends [never]
  ? RouteWithoutParams
  : RouteWithParams<P>;

export const authorizedStructure = () => {
  return {
    fallbackRoute: postsConfig.postsList as AppRouteConfig,
    routes: [...Object.values(postsConfig)] as AppRouteConfig[],
  };
};
