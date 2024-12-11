// components
import HomePage from 'pages/HomePage/HomePage';

// types
import { RouteName } from './routes';
import { TAppRoutesData } from '../types';

export const APP_ROUTES_DATA: TAppRoutesData = [
  {
    Component: HomePage,
    guards: [],
    name: RouteName.home,
  },
];
