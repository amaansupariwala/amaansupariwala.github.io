import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
    rgba(24, 24, 27, 0.7) 0%,
    rgba(45, 0, 54, 0.8) 100%
  );
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${props => props.theme.spacing.lg};
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #8e44ad, #e74c3c, #f39c12);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(142, 68, 173, 0.3);
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
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  
  &::after {
    content: '';
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, transparent, #8e44ad);
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const Hero = ({ portfolioData }) => {
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
    const element = document.querySelector('[name="background"]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
        <span>Scroll</span>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 