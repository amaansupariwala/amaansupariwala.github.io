import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Youtube, Instagram, ArrowUp } from 'lucide-react';
import portfolioData from '../../portfolioData';

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
  background: ${props => props.theme.colors.gradient.purpleGold};
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

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
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
  background: ${props => props.theme.colors.gradient.purpleGold};
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    youtube: Youtube,
    instagram: Instagram,
  };

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterInfo>
            <FooterTitle>Let's Connect</FooterTitle>
            <FooterDescription>
              Always open to discussing innovative projects, collaboration opportunities, 
              or just connecting with fellow tech enthusiasts.
            </FooterDescription>
            <ContactInfo>
              <Mail size={20} />
              <ContactLink href={`mailto:${portfolioData.email}`}>
                {portfolioData.email}
              </ContactLink>
            </ContactInfo>
            <ContactInfo>
              <span>📍</span>
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
            Built with React, Styled Components, and Framer Motion. 
            Deployed on GitHub Pages.
          </FooterNote>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer; 