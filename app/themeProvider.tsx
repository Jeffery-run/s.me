'use client';

import React, { memo } from 'react';
import { ThemeProvider } from 'next-themes';

const ThemeProv = memo(({ children } : { children:React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
));

export default ThemeProv;
