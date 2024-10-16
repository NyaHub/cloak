import { AuthPage } from '@/pages/Auth';
import { RouteProps } from 'react-router-dom';


export enum AppRoutes {
  AUTHORIZATION= 'authorization',
  CAMPAIGNS = 'campaigns',
  CREATE_CAMPAIGNS = 'create_campaign',
  STATISTICS = 'statistics',
  NOT_FOUND = 'not_found'
}


export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.AUTHORIZATION]: '/',
  [AppRoutes.CAMPAIGNS]: '/campaigns',
  [AppRoutes.CREATE_CAMPAIGNS]: '/create',
  [AppRoutes.STATISTICS]: '/statistics',
  [AppRoutes.NOT_FOUND]: '/not_found'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.AUTHORIZATION]: {
    path: RoutePath.authorization,
    element: <AuthPage />
  },
  [AppRoutes.CAMPAIGNS]: {
    path: RoutePath.campaigns,
    element: <></>
  },
  [AppRoutes.CREATE_CAMPAIGNS]: {
    path: RoutePath.create_campaign,
    element: <></>
  },
  [AppRoutes.STATISTICS]: {
    path: RoutePath.statistics,
    element: <></>
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <></>
  }
}