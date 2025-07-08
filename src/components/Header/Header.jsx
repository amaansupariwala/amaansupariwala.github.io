import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.theme.header.height};
  background: rgba(12, 12, 15, 0.95);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(220, 38, 38, 0.3);
  z-index: ${props => props.theme.zIndices.sticky};
  transition: all 0.3s ease;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  
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
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: 40px;
    width: auto;
    transition: ${props => props.theme.transitions.default};
  }
  
  &:hover img {
    transform: scale(1.05);
    filter: brightness(1.1);
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
    background: rgba(12, 12, 15, 0.98);
    backdrop-filter: blur(15px);
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.lg};
    border-bottom: 1px solid rgba(220, 38, 38, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes.sm};
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  position: relative;
  padding: ${props => props.theme.spacing.sm} 0;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.gradient.redPurple};
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Explicit navigation handler to prevent new windows
  const handleNavClick = (e) => {
    e.stopPropagation();
    closeMobileMenu();
    // Let React Router handle the navigation normally
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/" onClick={closeMobileMenu}>
          <img src="/images/logo1.png" alt="AS" />
        </Logo>
        
        <NavLinks $isOpen={mobileMenuOpen}>
          <li>
            <NavLink
              to="/"
              className={isActive('/') ? 'active' : ''}
              onClick={handleNavClick}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/background"
              className={isActive('/background') ? 'active' : ''}
              onClick={handleNavClick}
            >
              Background
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={isActive('/projects') ? 'active' : ''}
              onClick={handleNavClick}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mission"
              className={isActive('/mission') ? 'active' : ''}
              onClick={handleNavClick}
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