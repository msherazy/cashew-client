import { type FC, type PropsWithChildren } from 'react';

import MantineWrapper from '@/providers/mantine';

export const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  return <MantineWrapper>{children}</MantineWrapper>;
};

export * from './router';
