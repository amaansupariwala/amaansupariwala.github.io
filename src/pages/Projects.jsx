import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink, Github } from 'lucide-react';
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
    background: ${props => props.theme.colors.gradient.purpleGold};
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
    background: ${props => props.theme.colors.gradient.purpleGold};
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
  height: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.colors.border};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradient.purpleGold};
    z-index: 10;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  height: 60%;
  overflow: hidden;
  background: #000;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 2;
`;

const PlayPauseButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(147, 51, 234, 0.8);
  border: none;
  color: white;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(147, 51, 234, 1);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProjectTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProjectCategory = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gradient.purpleGold};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const Achievement = styled.div`
  background: rgba(245, 158, 11, 0.2);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.secondary};
  font-weight: ${props => props.theme.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  border: 1px solid ${props => props.theme.colors.secondary};
  
  &::before {
    content: '🏆';
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(147, 51, 234, 0.8);
  border: none;
  color: white;
  cursor: pointer;
  z-index: 4;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(147, 51, 234, 1);
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
  background: ${props => props.$active ? props.theme.colors.primary : 'rgba(147, 51, 234, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : 'rgba(147, 51, 234, 0.6)'};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.md};
`;

const Tag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: rgba(147, 51, 234, 0.2);
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  border: 1px solid rgba(147, 51, 234, 0.3);
`;

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [playingVideo, setPlayingVideo] = useState({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const projects = featuredProjects;

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const toggleVideoPlay = (index) => {
    setPlayingVideo(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
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
              >
                <VideoContainer>
                  <Video
                    src={projects[currentProject]?.videoUrl}
                    poster={projects[currentProject]?.image}
                    muted
                    loop
                    playsInline
                    autoPlay={playingVideo[currentProject]}
                  />
                  <VideoOverlay />
                  <PlayPauseButton onClick={() => toggleVideoPlay(currentProject)}>
                    {playingVideo[currentProject] ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} />
                    )}
                  </PlayPauseButton>
                </VideoContainer>
                
                <ProjectContent>
                  <div>
                    <ProjectHeader>
                      <ProjectTitle>{projects[currentProject]?.title}</ProjectTitle>
                      <ProjectCategory>{projects[currentProject]?.category}</ProjectCategory>
                    </ProjectHeader>
                    
                    <ProjectDescription>
                      {projects[currentProject]?.description}
                    </ProjectDescription>
                    
                    <TagsContainer>
                      {projects[currentProject]?.tags?.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </TagsContainer>
                  </div>
                  
                  <ProjectFooter>
                    <ProjectLinks>
                      <ProjectLink href={projects[currentProject]?.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        View Project
                      </ProjectLink>
                      <ProjectLink href={projects[currentProject]?.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        Code
                      </ProjectLink>
                    </ProjectLinks>
                    
                    <Achievement>
                      {projects[currentProject]?.achievement}
                    </Achievement>
                  </ProjectFooter>
                </ProjectContent>
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