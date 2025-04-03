import { createRootRoute, Outlet } from '@tanstack/react-router';

import { RootProviders } from '@/providers';

const RootComponent = () => {
  return (
    <RootProviders>
      <main className="w-screen h-screen flex flex-col items-center">
        <Outlet />
      </main>
    </RootProviders>
  );
};
export const Route = createRootRoute({
  component: RootComponent,
});
