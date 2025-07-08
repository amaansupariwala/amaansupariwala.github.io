import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Youtube, Instagram, ArrowUp, Check } from 'lucide-react';
import portfolioData from '../../portfolioData';

// Custom TikTok Icon Component
const TikTokIcon = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
  </svg>
);

const FooterSection = styled.footer`
  background: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing['2xl']} 0 ${props => props.theme.spacing.lg};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
    text-align: center;
  }
`;

const FooterInfo = styled.div`
  color: ${props => props.theme.colors.text};
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gradient.redPurple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const FooterDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const ContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.md};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  padding: ${props => props.theme.spacing.xs} 0;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
  
  &.copied {
    color: #10b981;
  }
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-items: center;
  }
`;

const SocialTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const BackToTop = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: ${props => props.theme.colors.gradient.redPurple};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FooterNote = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-style: italic;
  opacity: 0.7;
`;

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = portfolioData.email;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy email:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const socialIcons = {
    instagram: Instagram,
    tiktok: TikTokIcon,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
  };

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterInfo>
            <FooterTitle>Let's Connect</FooterTitle>
            <FooterDescription>
              Always open to discussing innovative projects, collaboration opportunities, or just connecting with fellow tech enthusiasts.
            </FooterDescription>
            <ContactInfo>
              <ContactButton
                onClick={copyEmail}
                className={emailCopied ? 'copied' : ''}
              >
                {emailCopied ? (
                  <>
                    <Check size={16} />
                    Email Copied!
                  </>
                ) : (
                  portfolioData.email
                )}
              </ContactButton>
            </ContactInfo>
            <ContactInfo>
              <span></span>
              <span style={{ color: '#94a3b8' }}>{portfolioData.location}</span>
            </ContactInfo>
          </FooterInfo>
          
          <SocialSection>
            <SocialTitle>Follow My Journey</SocialTitle>
            <SocialLinks>
              {portfolioData.social?.map((social, index) => {
                const IconComponent = socialIcons[social.name];
                return (
                  <SocialLink
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    {IconComponent && <IconComponent size={20} />}
                  </SocialLink>
                );
              })}
            </SocialLinks>
            <BackToTop
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={16} />
              Back to Top
            </BackToTop>
          </SocialSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </Copyright>
          <FooterNote>
            May vibe coded this...
          </FooterNote>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer; 