import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { ArrowDown } from 'lucide-react';
import PacBorder from '../components/PacBorder/PacBorder';
import portfolioData from '../portfolioData';

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: ${props => props.theme.header.height};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: ${props => props.theme.header.mobileHeight};
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(12, 12, 15, 0.7) 0%,
    rgba(26, 26, 29, 0.8) 100%
  );
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 ${props => props.theme.spacing.lg};
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.gradient.purpleGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  line-height: 1.1;
  filter: drop-shadow(0 0 30px rgba(147, 51, 234, 0.3));
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: ${props => props.theme.fontWeights.medium};
  line-height: 1.4;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroRole = styled(motion.div)`
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  z-index: 10;
  
  svg {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const CTASection = styled(motion.section)`
  padding: ${props => props.theme.spacing['4xl']} 0;
  text-align: center;
  background: ${props => props.theme.colors.gradient.subtle};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const CTATitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const CTADescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.gradient.purpleGold};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.md};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const Home = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const roleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HomeContainer>
      <PacBorder />
      
      <HeroSection>
        <VideoBackground>
          <ReactPlayer
            url="https://res.cloudinary.com/demo/video/upload/v1/samples/sea-turtle.mp4"
            playing
            loop
            muted
            width="100%"
            height="100%"
            className="react-player"
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }
                }
              }
            }}
          />
        </VideoBackground>
        
        <VideoOverlay />
        
        <HeroContent>
          <HeroRole
            variants={roleVariants}
            initial="hidden"
            animate="visible"
          >
            {portfolioData.role}
          </HeroRole>
          
          <HeroTitle
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {portfolioData.name}
          </HeroTitle>
          
          <HeroSubtitle
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            Building the future of sports analytics and AI-driven innovation. 
            Transforming data into actionable insights that drive performance and success.
          </HeroSubtitle>
        </HeroContent>
        
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToNext}
        >
          <span>Scroll to explore</span>
          <ArrowDown size={24} />
        </ScrollIndicator>
      </HeroSection>
      
      <CTASection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CTAContent>
          <CTATitle>Ready to innovate together?</CTATitle>
          <CTADescription>
            Let's discuss your next project and how we can leverage AI and data science 
            to create something extraordinary.
          </CTADescription>
          <CTAButton 
            href={`mailto:${portfolioData.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </CTAButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

export default Home; 