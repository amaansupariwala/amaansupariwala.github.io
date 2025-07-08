import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Play, Maximize2, ExternalLink } from 'lucide-react';

const GameSection = styled.section`
  padding: ${props => props.theme.spacing['2xl']} 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d0036 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #f39c12, transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const GameCard = styled(motion.div)`
  background: rgba(45, 0, 54, 0.3);
  border: 1px solid rgba(142, 68, 173, 0.2);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f39c12, #8e44ad);
    z-index: 1;
  }
`;

const GameTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &::before {
    content: '🏀';
    margin-right: ${props => props.theme.spacing.sm};
  }
`;

const GameDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  aspect-ratio: 16/9;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  background: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const GameIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  backdrop-filter: blur(10px);
  z-index: 2;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, #8e44ad, #e74c3c);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(142, 68, 173, 0.4);
  }
`;

const GameControls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: rgba(142, 68, 173, 0.2);
  color: ${props => props.theme.colors.text};
  border: 1px solid rgba(142, 68, 173, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(142, 68, 173, 0.3);
    border-color: rgba(142, 68, 173, 0.5);
  }
`;

const EasterEggText = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.md};
  font-style: italic;
  opacity: 0.7;
`;

const MiniHoopsGame = () => {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handlePlayGame = () => {
    setShowOverlay(false);
    setGameLoaded(true);
  };

  const handleFullscreen = () => {
    window.open('https://minibasketball.vercel.app', '_blank');
  };

  return (
    <GameSection ref={ref}>
      <Container>
        <GameCard
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <GameTitle>Mini Hoops Challenge</GameTitle>
          <GameDescription>
            Take a quick break and test your basketball skills! This mini-game showcases the fun side of sports technology.
          </GameDescription>
          
          <GameContainer>
            {gameLoaded && (
              <GameIframe
                src="https://minibasketball.vercel.app"
                title="Mini Basketball Game"
                loading="lazy"
                allowFullScreen
              />
            )}
            
            <GameOverlay $show={showOverlay}>
              <PlayButton onClick={handlePlayGame}>
                <Play size={20} />
                Start Game
              </PlayButton>
              <p style={{ color: 'white', fontSize: '0.9rem' }}>
                Click to load the interactive basketball game
              </p>
            </GameOverlay>
          </GameContainer>
          
          <GameControls>
            <ControlButton onClick={handlePlayGame}>
              <Play size={16} />
              Play
            </ControlButton>
            <ControlButton onClick={handleFullscreen}>
              <Maximize2 size={16} />
              Fullscreen
            </ControlButton>
            <ControlButton onClick={handleFullscreen}>
              <ExternalLink size={16} />
              Open in New Tab
            </ControlButton>
          </GameControls>
          
          <EasterEggText>
            🎮 Easter Egg: A fun way to showcase sports meets technology!
          </EasterEggText>
        </GameCard>
      </Container>
    </GameSection>
  );
};

export default MiniHoopsGame; 