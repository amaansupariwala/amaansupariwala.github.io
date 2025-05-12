import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing['4xl']} 0;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -200px;
    right: -200px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(142, 68, 173, 0.1) 0%, rgba(142, 68, 173, 0) 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -200px;
    left: -200px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(231, 76, 60, 0.1) 0%, rgba(231, 76, 60, 0) 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 1;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ProfileCard = styled(motion.div)`
  position: relative;
  background-color: transparent;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 280px;
  width: 100%;
  height: 100%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 120%; /* Control aspect ratio */
  overflow: hidden;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%; /* Adjust vertical position to focus on face */
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const AboutHeading = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
`;

const AboutText = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
  
  a {
    color: #e74c3c;
    text-decoration: none;
    font-weight: ${props => props.theme.fontWeights.semibold};
    transition: all 0.3s ease;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, #e74c3c, #f39c12);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }
    
    &:hover {
      color: #f39c12;
      
      &:after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
`;

const ContactDetails = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.6));
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
  backdrop-filter: blur(5px);
  border: 1px solid rgba(142, 68, 173, 0.2);
  position: relative;
`;

const ContactHeading = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(to right, #e74c3c, #f39c12);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
  
  i {
    color: #e74c3c;
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const SealImageContainer = styled.div`
  position: absolute;
  top: -30px;
  right: -20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.md};
  border: 2px solid rgba(142, 68, 173, 0.3);
  overflow: hidden;
`;

const SealImage = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const About = ({ portfolioData }) => {
  return (
    <AboutSection id="about">
      <Container>
        <AboutGrid>
          <ProfileCard
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProfileImageContainer>
              <ProfileImage src="images/headshot.jpg" alt="Amaan Supariwala" />
            </ProfileImageContainer>
          </ProfileCard>
          
          <AboutContent>
            <AboutHeading
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </AboutHeading>
            
            <AboutText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              After studying Computer Science and Finance at UC Berkeley, I became a software engineer at Amazon.com, developing products on the ground. I realized my passion for basketball covering the NBA and producing trivia and statistics videos through my basketball channel: <a href="https://www.youtube.com/@TheHoopsDojo/shorts" target="_blank" rel="noopener noreferrer">The Hoops Dojo</a>.
              <br/><br/>
              Eventually, I left my big tech job to combine my passion for basketball and technology by bringing AI to basketball recruiting. I now operate as the Chief Product and AI Officer at <a href="https://cerebrosports.com" target="_blank" rel="noopener noreferrer">Cerebro Sports</a>, a pre-seed sports tech startup focused on democratizing sports analytics.
            </AboutText>
            
            <ContactDetails
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SealImageContainer>
                <SealImage>
                  <img src="/images/berkeley-seal.png" alt="UC Berkeley Seal" />
                </SealImage>
              </SealImageContainer>
              
              <ContactHeading>Contact Details</ContactHeading>
              <ContactInfo>
                <ContactItem>
                  <i className="fas fa-user"></i>
                  <span>Amaan Supariwala</span>
                </ContactItem>
                <ContactItem>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Seattle, WA</span>
                </ContactItem>
                <ContactItem>
                  <i className="fas fa-envelope"></i>
                  <span>amaan.supariwala@gmail.com</span>
                </ContactItem>
              </ContactInfo>
            </ContactDetails>
          </AboutContent>
        </AboutGrid>
      </Container>
    </AboutSection>
  );
};

export default About;