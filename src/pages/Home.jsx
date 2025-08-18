import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import portfolioData from '../portfolioData';

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

// Enhanced animation keyframes
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
    transform: scale(1);
  }
  25% {
    background-position: 25% 25%;
    transform: scale(1.02);
  }
  50% {
    background-position: 100% 50%;
    transform: scale(1);
  }
  75% {
    background-position: 75% 75%;
    transform: scale(1.01);
  }
  100% {
    background-position: 0% 50%;
    transform: scale(1);
  }
`;

const redPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`;

const bloodRadiate = keyframes`
  0% {
    opacity: 0.1;
    transform: scale(0.8) rotate(0deg);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    opacity: 0.1;
    transform: scale(0.8) rotate(360deg);
  }
`;

const floatingOrb1 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  33% {
    transform: translate(30px, -30px) scale(1.2);
    opacity: 0.4;
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.15;
  }
`;

const floatingOrb2 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1.2);
    opacity: 0.15;
  }
  50% {
    transform: translate(-40px, -50px) scale(0.8);
    opacity: 0.3;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const textureFloat = keyframes`
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.2;
  }
  33% {
    transform: translate(20px, -15px) rotate(1deg);
    opacity: 0.35;
  }
  66% {
    transform: translate(-15px, 10px) rotate(-1deg);
    opacity: 0.15;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: ${props => props.theme.header.height};
  background: #000000;
  background-size: 400% 400%;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: ${props => props.theme.header.mobileHeight};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.06) 0%, transparent 70%),
      radial-gradient(circle at 40% 80%, rgba(185, 28, 28, 0.04) 0%, transparent 65%),
      radial-gradient(circle at 60% 20%, rgba(139, 0, 0, 0.03) 0%, transparent 55%),
      radial-gradient(circle at 90% 40%, rgba(165, 42, 42, 0.03) 0%, transparent 60%),
      radial-gradient(circle at 10% 60%, rgba(128, 0, 0, 0.04) 0%, transparent 65%),
      linear-gradient(135deg, 
        rgba(0, 0, 0, 1) 0%,
        rgba(4, 1, 1, 0.99) 15%,
        rgba(6, 2, 2, 0.98) 25%,
        rgba(8, 3, 3, 0.96) 40%,
        rgba(4, 1, 1, 0.98) 60%,
        rgba(6, 2, 2, 0.98) 75%,
        rgba(4, 1, 1, 0.99) 85%,
        rgba(0, 0, 0, 1) 100%
      ),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 80px,
        rgba(139, 0, 0, 0.015) 80px,
        rgba(139, 0, 0, 0.015) 160px
      );
    animation: ${gradientShift} 25s ease infinite;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(
        circle,
        rgba(220, 38, 38, 0.08) 0%,
        transparent 70%
      ),
      linear-gradient(
        90deg,
        transparent,
        rgba(139, 0, 0, 0.12),
        transparent
      );
    animation: ${shimmer} 4s ease-in-out infinite;
    z-index: 1;
  }
`;

const BackgroundOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  
  &.orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(139, 0, 0, 0.06) 0%, rgba(220, 38, 38, 0.03) 40%, transparent 70%);
    top: 5%;
    left: 5%;
    animation: ${floatingOrb1} 30s ease-in-out infinite, ${redPulse} 8s ease-in-out infinite;
    z-index: 1;
  }
  
  &.orb-2 {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(165, 42, 42, 0.04) 0%, rgba(185, 28, 28, 0.02) 50%, transparent 70%);
    bottom: 10%;
    right: 10%;
    animation: ${floatingOrb2} 35s ease-in-out infinite reverse, ${redPulse} 12s ease-in-out infinite 2s;
    z-index: 1;
  }
  
  &.orb-3 {
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(128, 0, 0, 0.03) 0%, rgba(139, 0, 0, 0.015) 50%, transparent 70%);
    top: 55%;
    left: 65%;
    animation: ${floatingOrb1} 28s ease-in-out infinite 5s, ${redPulse} 10s ease-in-out infinite 4s;
    z-index: 1;
  }
  
  &.orb-4 {
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.025) 0%, transparent 70%);
    top: 15%;
    right: 25%;
    animation: ${textureFloat} 20s ease-in-out infinite 3s, ${bloodRadiate} 15s ease-in-out infinite;
    z-index: 1;
  }
  
  &.orb-5 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(185, 28, 28, 0.02) 0%, transparent 70%);
    bottom: 35%;
    left: 15%;
    animation: ${textureFloat} 25s ease-in-out infinite 7s, ${bloodRadiate} 18s ease-in-out infinite 6s;
    z-index: 1;
  }
`;

const TextureElement = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  
  &.texture-1 {
    width: 2px;
    height: 120px;
    background: linear-gradient(180deg, transparent, rgba(139, 0, 0, 0.15), transparent);
    top: 20%;
    left: 12%;
    animation: ${textureFloat} 18s ease-in-out infinite;
  }
  
  &.texture-2 {
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(165, 42, 42, 0.12), transparent);
    top: 65%;
    right: 20%;
    animation: ${textureFloat} 22s ease-in-out infinite 4s;
  }
  
  &.texture-3 {
    width: 1px;
    height: 80px;
    background: linear-gradient(180deg, transparent, rgba(128, 0, 0, 0.1), transparent);
    bottom: 25%;
    right: 35%;
    animation: ${textureFloat} 16s ease-in-out infinite 2s;
  }
`;

const BloodTexture = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.25;
  z-index: 1;
  background-image: 
    radial-gradient(circle at 23% 45%, rgba(139, 0, 0, 0.9) 0.8px, transparent 0.8px),
    radial-gradient(circle at 67% 23%, rgba(165, 42, 42, 0.7) 0.6px, transparent 0.6px),
    radial-gradient(circle at 34% 78%, rgba(128, 0, 0, 0.8) 0.9px, transparent 0.9px),
    radial-gradient(circle at 89% 56%, rgba(220, 38, 38, 0.6) 0.7px, transparent 0.7px),
    radial-gradient(circle at 12% 89%, rgba(139, 0, 0, 0.7) 0.8px, transparent 0.8px),
    radial-gradient(circle at 78% 12%, rgba(185, 28, 28, 0.5) 0.6px, transparent 0.6px),
    radial-gradient(circle at 45% 34%, rgba(165, 42, 42, 0.6) 0.7px, transparent 0.7px),
    radial-gradient(circle at 56% 67%, rgba(128, 0, 0, 0.7) 0.8px, transparent 0.8px),
    radial-gradient(circle at 15% 25%, rgba(139, 0, 0, 0.4) 0.5px, transparent 0.5px),
    radial-gradient(circle at 85% 75%, rgba(220, 38, 38, 0.3) 0.4px, transparent 0.4px),
    radial-gradient(circle at 40% 10%, rgba(165, 42, 42, 0.4) 0.5px, transparent 0.5px),
    radial-gradient(circle at 70% 90%, rgba(128, 0, 0, 0.3) 0.4px, transparent 0.4px);
  background-size: 
    80px 80px,
    120px 120px,
    100px 100px,
    140px 140px,
    70px 70px,
    110px 110px,
    90px 90px,
    130px 130px,
    60px 60px,
    150px 150px,
    85px 85px,
    125px 125px;
  animation: ${textureFloat} 40s ease-in-out infinite;
`;

const SubtleNoise = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.08;
  z-index: 1;
  background-image: 
    radial-gradient(circle at 33% 66%, rgba(255, 255, 255, 0.1) 0.3px, transparent 0.3px),
    radial-gradient(circle at 77% 44%, rgba(255, 255, 255, 0.05) 0.2px, transparent 0.2px),
    radial-gradient(circle at 11% 88%, rgba(255, 255, 255, 0.08) 0.4px, transparent 0.4px),
    radial-gradient(circle at 99% 22%, rgba(255, 255, 255, 0.03) 0.2px, transparent 0.2px),
    radial-gradient(circle at 55% 11%, rgba(255, 255, 255, 0.06) 0.3px, transparent 0.3px);
  background-size: 
    40px 40px,
    65px 65px,
    50px 50px,
    35px 35px,
    55px 55px;
  animation: ${textureFloat} 50s ease-in-out infinite reverse;
`;

const PulsingLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(139, 0, 0, 0.05) 0%, transparent 80%);
  animation: ${redPulse} 6s ease-in-out infinite;
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 ${props => props.theme.spacing.lg};
  z-index: 2;
  position: relative;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: #ffffff;
  line-height: 1.1;
  text-shadow: 
    0 0 30px rgba(255, 255, 255, 0.2), 
    0 0 60px rgba(220, 38, 38, 0.3),
    0 0 90px rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    white-space: normal;
  }
`;

const TypingContainer = styled(motion.div)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .typing-text {
    color: rgba(255, 255, 255, 0.85);
    min-height: 1.2em;
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 0.15),
      0 0 40px rgba(220, 38, 38, 0.2);
  }
  
  .cursor {
    display: inline-block;
    color: ${props => props.theme.colors.accent};
    margin-left: 2px;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const CTASection = styled(motion.section)`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.gradient.subtle};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const StoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const StoryCard = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-8px);
    transition: all 0.4s ease;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: ${props => props.theme.transitions.slow};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StoryStickyNote = styled(motion.div)`
  position: absolute;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: 8px 8px 8px 20px;
  transform: ${props => props.rotate || 'rotate(-2deg)'};
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 15;
  min-width: 220px;
  max-width: 280px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &.golden {
    background: linear-gradient(135deg, #8B7355 0%, #A0855B 100%);
    box-shadow: 
      0 8px 16px rgba(139, 115, 85, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &.green {
    background: linear-gradient(135deg, #2F5233 0%, #3A5F3E 100%);
    box-shadow: 
      0 8px 16px rgba(47, 82, 51, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &.blue {
    background: linear-gradient(135deg, #1A365D 0%, #2C5282 100%);
    box-shadow: 
      0 8px 16px rgba(26, 54, 93, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &.purple {
    background: linear-gradient(135deg, #44337A 0%, #553C9A 100%);
    box-shadow: 
      0 8px 16px rgba(68, 51, 122, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &.top-right {
    top: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
  }
  
  &.bottom-left {
    bottom: ${props => props.theme.spacing.lg};
    left: ${props => props.theme.spacing.lg};
  }
  
  &.top-left {
    top: ${props => props.theme.spacing.lg};
    left: ${props => props.theme.spacing.lg};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 15px;
    width: 30px;
    height: 15px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: rotate(-15deg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:hover {
    transform: ${props => props.rotate || 'rotate(-2deg)'} scale(1.05) translateY(-2px);
    transition: all 0.3s ease;
    
    &.golden {
      box-shadow: 
        0 12px 24px rgba(139, 115, 85, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    &.green {
      box-shadow: 
        0 12px 24px rgba(47, 82, 51, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    &.blue {
      box-shadow: 
        0 12px 24px rgba(26, 54, 93, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    &.purple {
      box-shadow: 
        0 12px 24px rgba(68, 51, 122, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }
`;

const StickyTitle = styled.h3`
  color: #ffffff;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-family: 'Nunito', 'Arial', sans-serif;
  line-height: 1.2;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.7),
    0 1px 2px rgba(0, 0, 0, 0.5);
`;

const StickyText = styled.p`
  color: #f7fafc;
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.4;
  font-family: 'Nunito', 'Arial', sans-serif;
  font-weight: ${props => props.theme.fontWeights.medium};
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.4);
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: ${props => props.theme.colors.gradient.redPurple};
    margin: ${props => props.theme.spacing.md} auto 0;
    border-radius: 2px;
  }
`;

const Home = () => {
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const typingTexts = React.useMemo(() => [
    'Content Creator',
    'Startup Founder',
    'Ex Big Tech Engineer',
    'Curious Explorer',
    'What more can be said?'
  ], []);

  React.useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentFullText = typingTexts[currentIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentFullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, typingTexts]);

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

  return (
    <HomeContainer>
      <HeroSection>
        <BloodTexture />
        <SubtleNoise />
        <PulsingLayer />
        
        <BackgroundOrb className="orb-1" />
        <BackgroundOrb className="orb-2" />
        <BackgroundOrb className="orb-3" />
        <BackgroundOrb className="orb-4" />
        <BackgroundOrb className="orb-5" />
        
        <TextureElement className="texture-1" />
        <TextureElement className="texture-2" />
        <TextureElement className="texture-3" />
        
        <HeroContent>
          <HeroTitle
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {portfolioData.name}
          </HeroTitle>
          
          <TypingContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="typing-text">
              {currentText}
              <span className="cursor">_</span>
            </span>
          </TypingContainer>
        </HeroContent>
      </HeroSection>
      
      <CTASection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <StoryContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            My Journey
          </SectionTitle>
          
          <StoryGrid>
            <StoryCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StoryImage 
                src="/images/young-me-2.png" 
                alt="The Beginning - Young Amaan" 
                loading="lazy"
              />
              <StoryStickyNote 
                className="top-right golden"
                rotate="rotate(-2deg)"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <StickyTitle>The Beginning</StickyTitle>
                <StickyText>I've loved hoops for my whole life.</StickyText>
              </StoryStickyNote>
            </StoryCard>
            
            <StoryCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StoryImage 
                src="/images/sloan-win-stage.jpg" 
                alt="MIT Sloan Sports Analytics Conference Win" 
                loading="lazy"
              />
              <StoryStickyNote 
                className="bottom-left purple"
                rotate="rotate(1deg)"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <StickyTitle>The Breakthrough</StickyTitle>
                <StickyText>Winning MIT Sloan Sports Analytics Conference - the moment that validated our vision and opened doors to bigger opportunities.</StickyText>
              </StoryStickyNote>
            </StoryCard>
            
            <StoryCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StoryImage 
                src="/images/nature.png" 
                alt="The Vision - Future in Nature and Technology" 
                loading="lazy"
              />
              <StoryStickyNote 
                className="top-left blue"
                rotate="rotate(2deg)"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <StickyTitle>The Vision</StickyTitle>
                <StickyText>Looking ahead, I'm not sure where life will take me  But I know I love working in basketball, and I love sharing the journey to inspire others.</StickyText>
              </StoryStickyNote>
            </StoryCard>
          </StoryGrid>
        </StoryContainer>
      </CTASection>
    </HomeContainer>
  );
};

export default Home; 