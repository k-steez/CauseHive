import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} ${({ theme }) => theme.spacing.sectionX};
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sectionYMobile} ${({ theme }) => theme.spacing.sectionXMobile};
  }
`;

export default function Section({ children, className = '', ...props }) {
  return (
    <SectionContainer className={className} {...props}>
      {children}
    </SectionContainer>
  );
}
