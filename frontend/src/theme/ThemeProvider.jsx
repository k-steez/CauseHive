import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './';

export const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
