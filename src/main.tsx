import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/global.css';
import { TanStackRouterProvider } from '@/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackRouterProvider />
  </StrictMode>,
);
