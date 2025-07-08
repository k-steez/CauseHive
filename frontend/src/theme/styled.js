import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 0;
  
  @media (min-width: 768px) {
    padding: 6rem 0;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: white;
          
          &:hover {
            background-color: ${({ theme }) => theme.colors.primary}dd;
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return css`
          background-color: ${({ theme }) => theme.colors.secondary};
          color: white;
          
          &:hover {
            background-color: ${({ theme }) => theme.colors.secondary}dd;
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 2px solid ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primary};
          
          &:hover {
            background-color: ${({ theme }) => `${theme.colors.primary}11`};
          }
        `;
      default:
        return '';
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  & + button {
    margin-left: 1rem;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  background-color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-13%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2013l128%20127.9c3.6%203.6%207.8%205.4%2013%205.4s9.4-1.8%2013-5.4L287%2095.2c3.6-3.6%205.4-7.8%205.4-13%200-5-1.8-9.4-5.4-13z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right .7em top 50%;
  background-size: .65em auto;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const AnimatedContainer = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}))``;

export const Flex = styled.div`
  display: flex;
  ${({ gap }) => gap && `gap: ${gap}px`};
  ${({ direction = 'row' }) => `flex-direction: ${direction}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ wrap }) => wrap && 'flex-wrap: wrap'};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ gap = '1.5rem' }) => gap};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  padding: 2rem;
  width: 100%;
  max-width: ${({ width = '500px' }) => width};
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
