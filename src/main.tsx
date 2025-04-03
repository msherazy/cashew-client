import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { TanStackRouterProvider } from '@/providers';

import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackRouterProvider />
  </StrictMode>,
);
