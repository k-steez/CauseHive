import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; /* Account for fixed navbar */
  background-color: ${({ theme }) => theme.colors.background};
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
