import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PortfolioSection = styled.section`
  background-color: #1e1e1e !important;
  padding: ${props => props.theme.spacing['4xl']} 0;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  background-color: transparent;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: #f5f5f5 !important;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};

  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, #8e44ad, #e74c3c, #f39c12);
    margin: ${props => props.theme.spacing.lg} auto 0;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  height: 220px;
  cursor: pointer;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid rgba(142, 68, 173, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl}, 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #8e44ad, #e74c3c, #f39c12);
    z-index: 10;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${props => `linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.7)
    ),
    url(${props.$bgImage || `${process.env.PUBLIC_URL}/images/portfolio/placeholder.jpg`})`};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 5;
`;

const ProjectHeader = styled.div``;

const ProjectFooter = styled.div``;

const ProjectTitle = styled.h3`
  color: white;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, #e74c3c, #f39c12);
  }
`;

const ProjectCategory = styled.p`
  color: #f39c12;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.sm};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const Achievement = styled.div`
  background: linear-gradient(135deg, rgba(142, 68, 173, 0.3), rgba(231, 76, 60, 0.3));
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
  color: white;
  font-size: ${props => props.theme.fontSizes.xs};
  display: flex;
  align-items: center;
  max-width: 95%;
  
  i {
    color: #f39c12;
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: white;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  background: linear-gradient(90deg, #8e44ad, #e74c3c);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(90deg, #9b59b6, #c0392b);
  }
  
  i {
    font-size: ${props => props.theme.fontSizes.md};
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const Portfolio = () => {
  const projects = [
    {
      title: "Cerebro Sports",
      category: "Sports Tech",
      image: `${process.env.PUBLIC_URL}/images/portfolio/basketball.jpg`,
      url: "https://cerebrosports.com",
      achievement: "Mark Cuban Investment in Cerebro Sports",
      icon: "fas fa-trophy"
    },
    {
      title: "MIT Sloan",
      category: "Startup Competition",
      image: `${process.env.PUBLIC_URL}/images/portfolio/mit.jpg`,
      url: "https://sloanconference.com",
      achievement: "MIT Sloan Startup Contest Winner",
      icon: "fas fa-award"
    },
    {
      title: "Overtime Elite",
      category: "Professional Basketball",
      image: `${process.env.PUBLIC_URL}/images/portfolio/overtime.jpg`,
      url: "https://overtimeelite.com",
      achievement: "Overtime Elite Analytics Partnership",
      icon: "fas fa-handshake"
    },
    {
      title: "Hoops Dojo",
      category: "Basketball Media",
      image: `${process.env.PUBLIC_URL}/images/portfolio/hoopsdojo.jpg`,
      url: "https://youtube.com/c/hoopsdojo",
      achievement: "Hoops Dojo Media Coverage",
      icon: "fas fa-newspaper"
    }
  ];
  
  return (
    <PortfolioSection id="portfolio">
      <Container>
        <SectionTitle>Featured Projects</SectionTitle>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <ProjectImage $bgImage={project.image} />
              <ProjectContent>
                <ProjectHeader>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <Achievement>
                    <i className={project.icon}></i>
                    {project.achievement}
                  </Achievement>
                </ProjectHeader>
                <ProjectFooter>
                  <ProjectLink 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    View Project
                  </ProjectLink>
                </ProjectFooter>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </PortfolioSection>
  );
};

export default Portfolio;