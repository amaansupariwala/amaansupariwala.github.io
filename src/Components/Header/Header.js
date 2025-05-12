import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const zoomBgAnimation = keyframes`
  0% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HeaderSection = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${process.env.PUBLIC_URL}/images/header-background.jpg);
  background-size: cover;
  background-position: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(${process.env.PUBLIC_URL}/images/header-background.jpg);
    background-size: cover;
    background-position: center;
    animation: ${zoomBgAnimation} 10s ease-out forwards;
    z-index: 0;
  }
`;

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${props => props.$scrolled ? '10px 0' : '20px 0'};
  background-color: ${props => props.$scrolled ? '#121212' : 'transparent'};
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.$scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const MenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
  position: absolute;
  right: 20px;
  top: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #121212;
    padding: 20px 0;
  }
`;

const NavItem = styled.li`
  margin: 0 15px;
  
  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

const NavLink = styled.a`
  color: #ffffff !important;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #8e44ad !important;
  }
`;

const nameEntranceAnimation = keyframes`
  0% { font-size: 4.5rem; opacity: 0; transform: translateY(-20px); filter: blur(4px); }
  50% { font-size: 4.2rem; opacity: 0.7; transform: translateY(-5px); filter: blur(0px); }
  75% { font-size: 4rem; transform: translateY(-2px) scale(1.02); }
  90% { transform: translateY(0) scale(0.98); }
  100% { font-size: 3.8rem; opacity: 1; transform: translateY(0) scale(1); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const NameHeading = styled.h1`
  font-size: ${props => props.$scrolled ? '3.5rem' : '3.8rem'};
  margin-bottom: 1.2rem;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
  transition: font-size 0.5s ease;
  animation: ${nameEntranceAnimation} 1.2s ease-out forwards;
  letter-spacing: 1px;
  text-align: center;
  width: 100%;
  display: block;
  
  @media (max-width: 768px) {
    font-size: ${props => props.$scrolled ? '2.4rem' : '2.8rem'};
  }
`;

const fadeInAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  70% { opacity: 0.7; transform: translateY(5px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const TaglineContainer = styled.div`
  margin-bottom: 2.2rem;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  min-height: 36px;
  animation: ${fadeInAnimation} 1.5s ease-out 1.2s both;
`;

const blinkCursor = keyframes`
  0%, 100% { border-right-color: rgba(255, 255, 255, 0.75); }
  50% { border-right-color: transparent; }
`;

const Tagline = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  background: linear-gradient(to right, #8e44ad, #e74c3c, #f39c12);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  border-right: 3px solid rgba(255, 255, 255, 0.75);
  animation: ${blinkCursor} 0.75s step-end infinite;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  position: relative;
  z-index: 1;
  margin-bottom: 3.5rem;
  animation: ${fadeInAnimation} 1.5s ease-out 1.5s both;
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(142, 68, 173, 0.6);
    transform: translateY(-3px);
    animation: ${pulseAnimation} 0.5s ease-in-out;
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const ScrollDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  animation: ${fadeInAnimation} 1.5s ease-out 2s both,
             ${floatAnimation} 2s ease-in-out 3.5s infinite;
  
  &:hover {
    transform: translateY(-3px);
    
    i {
      background: linear-gradient(to right, #8e44ad, #e74c3c, #f39c12);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${pulseAnimation} 0.5s ease-in-out;
    }
  }
`;

const ScrollDownText = styled.p`
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 10px;
  font-family: inherit;
  text-align: center;
  letter-spacing: 0.5px;
`;

const Header = ({ portfolioData }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const taglines = useMemo(() => ["Product Leader", "Basketball Analytics Enthusiast", "Sports Tech Startup Builder", "Off Ball Scorer"], []);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const typewriter = () => {
      const current = taglines[currentIndex];
      
      if (!isDeleting && displayText === current) {
        // Pause at full word
        setTimeout(() => setIsDeleting(true), 1000);
        return;
      }
      
      if (isDeleting && displayText === '') {
        // Move to next word
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        return;
      }
      
      // Update display text
      setDisplayText(prev => 
        isDeleting 
          ? prev.substring(0, prev.length - 1) 
          : current.substring(0, prev.length + 1)
      );
      
      // Set typing speed
      setTypingSpeed(isDeleting ? 80 : 150);
    };
    
    // Add a slight delay to start the typewriter
    const initialDelay = 1500;
    const timer = setTimeout(typewriter, displayText === "" && currentIndex === 0 ? initialDelay : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, taglines, typingSpeed]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeaderSection id="home">
      <Navigation $scrolled={scrolled}>
        <NavContainer>
          <MenuButton onClick={toggleMenu}>
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </MenuButton>
          
          <NavLinks $isOpen={isMenuOpen}>
            <NavItem><NavLink href="#home">Home</NavLink></NavItem>
            <NavItem><NavLink href="#about">About</NavLink></NavItem>
            <NavItem><NavLink href="#experience">Experience</NavLink></NavItem>
            <NavItem><NavLink href="#skills">Skills</NavLink></NavItem>
            <NavItem><NavLink href="#portfolio">Portfolio</NavLink></NavItem>
            <NavItem><NavLink href="#contact">Contact</NavLink></NavItem>
          </NavLinks>
        </NavContainer>
      </Navigation>

      <NameHeading $scrolled={scrolled}>{portfolioData.name}</NameHeading>
      <TaglineContainer>
        <Tagline>{displayText}</Tagline>
      </TaglineContainer>
      
      <SocialLinks>
        {portfolioData.social.map((network, index) => (
          <SocialLink 
            key={index}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={network.name}
          >
            <i className={network.icon}></i>
          </SocialLink>
        ))}
      </SocialLinks>
      
      <ScrollDownContainer onClick={scrollToAbout}>
        <ScrollDownText>Let's scroll to learn more</ScrollDownText>
        <i className="fas fa-chevron-down fa-2x"></i>
      </ScrollDownContainer>
    </HeaderSection>
  );
};

export default Header;