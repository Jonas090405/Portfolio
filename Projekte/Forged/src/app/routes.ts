import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/configure',
    Component: ConfiguratorPage,
  },
]);
