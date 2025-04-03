import { createTheme } from '@mantine/core';

export const theme = {
  themeConfig: createTheme({
    fontFamily: 'var(--font-display)',
    primaryColor: 'dark',
    primaryShade: 9,
    breakpoints: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  }),
  prefix: 'cashew',
};
