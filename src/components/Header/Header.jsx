import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.theme.header.height};
  background: ${props => props.$scrolled ? 'rgba(12, 12, 15, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(147, 51, 234, 0.2)' : 'none'};
  z-index: ${props => props.theme.zIndices.sticky};
  transition: all 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: ${props => props.theme.header.mobileHeight};
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  height: 100%;
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  position: relative;
  
  &::before {
    content: 'AS';
    background: ${props => props.theme.colors.gradient.purpleGold};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.xl};
  margin: 0;
  padding: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(12, 12, 15, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.lg};
    border-bottom: 1px solid rgba(147, 51, 234, 0.2);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes.sm};
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.gradient.purpleGold};
    transition: width 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Nav>
        <Logo to="/" onClick={closeMobileMenu}>
          AS
        </Logo>
        
        <NavLinks $isOpen={mobileMenuOpen}>
          <li>
            <NavLink
              to="/"
              className={isActive('/') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/background"
              className={isActive('/background') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Background
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={isActive('/projects') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mission"
              className={isActive('/mission') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Mission
            </NavLink>
          </li>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 