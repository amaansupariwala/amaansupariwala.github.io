import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { featuredProjects } from '../data/projects';

const ProjectsContainer = styled.div`
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
    background: ${props => props.theme.colors.gradient.redPurple};
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
  
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 4px;
    background: ${props => props.theme.colors.gradient.redPurple};
    margin: ${props => props.theme.spacing.lg} auto 0;
    border-radius: 2px;
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing['3xl']};
  line-height: 1.6;
`;

const CarouselContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  position: relative;
  height: 600px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradient.redPurple};
    z-index: 10;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-8px);
    transition: all 0.4s ease;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.surface};
  border: 3px dashed ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: 
    linear-gradient(45deg, rgba(245, 158, 11, 0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(245, 158, 11, 0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(245, 158, 11, 0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(245, 158, 11, 0.05) 75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 30px, 30px -30px, -30px 0;
  
  &::before {
    content: '🖼️';
    font-size: 4rem;
    opacity: 0.3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  &::after {
    content: 'Project Image Placeholder';
    position: absolute;
    bottom: ${props => props.theme.spacing.lg};
    left: 50%;
    transform: translateX(-50%);
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.6;
    text-align: center;
  }
`;

const stickyHover = keyframes`
  0% { transform: rotate(-2deg) scale(1); }
  50% { transform: rotate(-1deg) scale(1.02); }
  100% { transform: rotate(-2deg) scale(1); }
`;

const StickyNote = styled(motion.div)`
  position: absolute;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: 8px 8px 8px 20px;
  transform: rotate(-2deg);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
  z-index: 15;
  min-width: 280px;
  max-width: 350px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Darker, more dull backgrounds for better text visibility */
  background: linear-gradient(135deg, #8B7355 0%, #A0855B 100%);
  
  &.top-right {
    top: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
  }
  
  &.bottom-right {
    bottom: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
    background: linear-gradient(135deg, #8B7355 0%, #A0855B 100%);
  }
  
  &.top-left {
    top: ${props => props.theme.spacing.lg};
    left: ${props => props.theme.spacing.lg};
    transform: rotate(1deg);
    background: linear-gradient(135deg, #2F5233 0%, #3A5F3E 100%);
  }
  
  &.bottom-left {
    bottom: ${props => props.theme.spacing.lg};
    left: ${props => props.theme.spacing.lg};
    transform: rotate(2deg);
    background: linear-gradient(135deg, #1A365D 0%, #2C5282 100%);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 20px;
    width: 40px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: rotate(-20deg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    animation: ${stickyHover} 0.6s ease-in-out;
    transform: rotate(-1deg) scale(1.05) translateY(-2px);
    
    &.top-left {
      transform: rotate(0deg) scale(1.05) translateY(-2px);
      box-shadow: 
        0 12px 24px rgba(47, 82, 51, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    &.bottom-left {
      transform: rotate(1deg) scale(1.05) translateY(-2px);
      box-shadow: 
        0 12px 24px rgba(26, 54, 93, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    box-shadow: 
      0 12px 24px rgba(139, 115, 85, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const StickyTitle = styled.h3`
  color: #ffffff;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-family: 'Nunito', 'Arial', sans-serif;
  line-height: 1.2;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.7),
    0 1px 2px rgba(0, 0, 0, 0.5);
`;

const StickyCategory = styled.p`
  color: #e2e8f0;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-family: 'Nunito', 'Arial', sans-serif;
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.4);
`;

const StickyDescription = styled.p`
  color: #f7fafc;
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.4;
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: 'Nunito', 'Arial', sans-serif;
  font-weight: ${props => props.theme.fontWeights.medium};
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.4);
`;

const StickyLink = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: #ffffff;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-family: 'Nunito', 'Arial', sans-serif;
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.4);
  
  svg {
    transition: transform 0.2s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
  
  &:hover svg {
    transform: translateX(2px);
  }
`;

const TagsContainer = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  max-width: 50%;
  z-index: 12;
`;

const Tag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(245, 158, 11, 0.3);
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.9);
  border: none;
  color: white;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(245, 158, 11, 1);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: -25px;
`;

const NextButton = styled(NavigationButton)`
  right: -25px;
`;

const ProjectIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.xl};
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? props.theme.colors.primary : 'rgba(245, 158, 11, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : 'rgba(245, 158, 11, 0.6)'};
  }
`;

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const projects = featuredProjects;

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleProjectClick = (project) => {
    if (project?.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getStickyPosition = (index) => {
    const positions = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];
    return positions[index % positions.length];
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const stickyVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  return (
    <ProjectsContainer ref={ref}>
      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </SectionTitle>
          
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore my key projects that showcase innovation in AI, sports analytics, 
            and software engineering. Each project represents a unique challenge and solution.
          </SectionDescription>
          
          <CarouselContainer>
            <AnimatePresence mode="wait">
              <ProjectCard
                key={currentProject}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() => handleProjectClick(projects[currentProject])}
              >
                <PlaceholderImage />
                
                <StickyNote
                  className={getStickyPosition(currentProject)}
                  variants={stickyVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <StickyCategory>{projects[currentProject]?.category}</StickyCategory>
                  <StickyTitle>{projects[currentProject]?.title}</StickyTitle>
                  <StickyDescription>
                    {projects[currentProject]?.description}
                  </StickyDescription>
                  <StickyLink>
                    <span>Click to explore</span>
                    <ExternalLink size={14} />
                  </StickyLink>
                </StickyNote>
                
                <TagsContainer>
                  {projects[currentProject]?.tags?.slice(0, 4).map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </ProjectCard>
            </AnimatePresence>
            
            <PrevButton onClick={prevProject} disabled={projects.length <= 1}>
              <ChevronLeft size={24} />
            </PrevButton>
            
            <NextButton onClick={nextProject} disabled={projects.length <= 1}>
              <ChevronRight size={24} />
            </NextButton>
          </CarouselContainer>
          
          <ProjectIndicators>
            {projects.map((_, index) => (
              <Indicator
                key={index}
                $active={index === currentProject}
                onClick={() => setCurrentProject(index)}
              />
            ))}
          </ProjectIndicators>
        </Container>
      </Section>
    </ProjectsContainer>
  );
};

export default Projects; 