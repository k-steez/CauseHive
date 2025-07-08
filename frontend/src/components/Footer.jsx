import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing(12)} 0;
`;

const FooterWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 0 ${({ theme }) => theme.spacing(8)};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(8)};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.light};
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
`;

const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const FooterListItem = styled.li`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color ${({ theme }) => theme.transitions.duration.short}ms ${({ theme }) => theme.transitions.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

const FooterExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color ${({ theme }) => theme.transitions.duration.short}ms ${({ theme }) => theme.transitions.easing.easeInOut};

  &:hover {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

const SocialLinks = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const FooterDivider = styled.div`
  margin-top: ${({ theme }) => theme.spacing(12)};
  padding-top: ${({ theme }) => theme.spacing(8)};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <FooterContainer>
        <FooterWrapper>
          <FooterGrid>
            <FooterSection>
              <FooterTitle>CauseHive</FooterTitle>
              <FooterText>Empowering communities through shared moments and impactful causes.</FooterText>
            </FooterSection>
            <FooterSection>
              <FooterTitle>Explore</FooterTitle>
              <FooterList>
                <FooterListItem><FooterLink to="/">Home</FooterLink></FooterListItem>
                <FooterListItem><FooterLink to="/causes">Causes</FooterLink></FooterListItem>
                <FooterListItem><FooterLink to="/photos">Photo Feed</FooterLink></FooterListItem>
              </FooterList>
            </FooterSection>
            <FooterSection>
              <FooterTitle>Get Involved</FooterTitle>
              <FooterList>
                <FooterListItem><FooterLink to="/dashboard">Dashboard</FooterLink></FooterListItem>
                <FooterListItem><FooterLink to="/start-campaign">Start a Campaign</FooterLink></FooterListItem>
              </FooterList>
            </FooterSection>
            <FooterSection>
              <FooterTitle>Contact</FooterTitle>
              <FooterList>
                <FooterListItem><FooterExternalLink href="mailto:support@causehive.org">support@causehive.org</FooterExternalLink></FooterListItem>
                <SocialLinks>
                  <FooterExternalLink href="#">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                  </FooterExternalLink>
                  <FooterExternalLink href="#">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                  </FooterExternalLink>
                  <FooterExternalLink href="#">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123 0 2.716-.012 3.056-.06 4.122-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.122-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808 0-2.429.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.056 1.055-.058 1.219-.058 4.041 0 2.822.002 2.986.058 4.041.044.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.219.058 4.041.058 2.822 0 2.987-.01 4.041-.058.975-.044 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.219.058-4.041 0-2.822-.01-2.986-.058-4.041-.044-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                  </FooterExternalLink>
                </SocialLinks>
              </FooterList>
            </FooterSection>
          </FooterGrid>
          <FooterDivider>
            <p> {new Date().getFullYear()} CauseHive. All rights reserved.</p>
          </FooterDivider>
        </FooterWrapper>
      </FooterContainer>
    </motion.div>
  );
}
