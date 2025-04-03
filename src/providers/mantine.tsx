import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { FC, PropsWithChildren } from 'react';

import { theme } from '@/constants';

const MantineWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider classNamesPrefix={theme.prefix} theme={theme.themeConfig}>
      <Notifications
        position="top-right"
        autoClose={3000}
        styles={{
          notification: {
            marginBottom: 8,
          },
        }}
      />
      {children}
    </MantineProvider>
  );
};
export default MantineWrapper;
