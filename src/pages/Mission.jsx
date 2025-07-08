import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Target, Clock, ArrowRight } from 'lucide-react';

const MissionContainer = styled.div`
  min-height: 100vh;
  padding-top: ${props => props.theme.header.height};
  padding-bottom: ${props => props.theme.spacing['4xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: ${props => props.theme.header.mobileHeight};
  }
`;

const Section = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${props => props.theme.colors.gradient.purpleGold};
    opacity: 0.3;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 4px;
    background: ${props => props.theme.colors.gradient.purpleGold};
    margin: ${props => props.theme.spacing.lg} auto 0;
    border-radius: 2px;
    position: absolute;
    bottom: -${props => props.theme.spacing.lg};
    left: 50%;
    transform: translateX(-50%);
  }
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const MissionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const PlaceholderCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing['2xl']};
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(147, 51, 234, 0.1),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const PlaceholderText = styled.p`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-style: italic;
`;

const PlaceholderSubText = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gradient.purpleGold};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: ${props => props.theme.shadows.glow};
  
  svg {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const ProgressSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(147, 51, 234, 0.3),
      transparent
    );
    animation: progressShimmer 2s infinite;
  }
  
  @keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.gradient.purpleGold};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 35%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: fillShimmer 2s infinite;
  }
  
  @keyframes fillShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressText = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PreviewSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
  width: 100%;
`;

const PreviewCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.colors.gradient.purpleGold};
    border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const PreviewTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PreviewDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
`;

const NotifyButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const previewItems = [
    {
      title: "AI Innovation Framework",
      description: "Developing a comprehensive approach to AI implementation in various industries."
    },
    {
      title: "Sports Analytics Platform",
      description: "Creating next-generation tools for sports performance analysis and prediction."
    },
    {
      title: "Data-Driven Solutions",
      description: "Building scalable systems that turn complex data into actionable insights."
    }
  ];

  const handleNotifyClick = () => {
    // This would typically open a modal or redirect to a signup form
    alert("Thanks for your interest! I'll notify you when my mission page is ready.");
  };

  return (
    <MissionContainer ref={ref}>
      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Target size={40} />
            My Mission
          </SectionTitle>
          
          <MissionContent>
            <PlaceholderCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <PlaceholderText>
                "I'm still working on this..."
              </PlaceholderText>
              
              <PlaceholderSubText>
                My mission statement is currently being crafted to reflect my vision for the future 
                of AI, sports analytics, and technological innovation. Stay tuned for something amazing!
              </PlaceholderSubText>
              
              <ComingSoonBadge>
                <Clock size={20} />
                Coming Soon
              </ComingSoonBadge>
            </PlaceholderCard>
            
            <ProgressSection>
              <ProgressBar>
                <ProgressFill
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "35%" } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </ProgressBar>
              
              <ProgressText>
                Progress: 35% Complete
              </ProgressText>
            </ProgressSection>
            
            <PreviewSection>
              {previewItems.map((item, index) => (
                <PreviewCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <PreviewTitle>{item.title}</PreviewTitle>
                  <PreviewDescription>{item.description}</PreviewDescription>
                </PreviewCard>
              ))}
            </PreviewSection>
            
            <NotifyButton
              onClick={handleNotifyClick}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify me when ready
              <ArrowRight size={16} />
            </NotifyButton>
          </MissionContent>
        </Container>
      </Section>
    </MissionContainer>
  );
};

export default Mission; 