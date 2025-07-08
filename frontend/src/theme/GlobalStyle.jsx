import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`;
