import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider, redirect } from 'react-router';
import App from './app/App.tsx';
import './styles/index.css';

const router = createHashRouter([
  { path: '/', loader: () => redirect('/street') },
  { path: '/:slug', element: <App /> },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
