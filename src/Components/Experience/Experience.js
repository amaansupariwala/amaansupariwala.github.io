import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceSection = styled.section`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing['4xl']} 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
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

const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
`;

// Horizontal timeline track
const TimelineTrack = styled.div`
  position: relative;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    background: #3a3a3a;
    transform: translateY(-50%);
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    overflow-x: auto;
    padding-bottom: 20px;
    margin-bottom: 20px;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background};
      border-radius: ${props => props.theme.borderRadius.full};
    }
    
    &::-webkit-scrollbar-thumb {
      background: #8e44ad;
      border-radius: ${props => props.theme.borderRadius.full};
    }
  }
`;

// Timeline node markers
const TimelineNode = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background-color: ${props => 
    props.$active ? 'transparent' : 
    props.$isHovered ? '#e74c3c' : 
    '#3a3a3a'};
  background: ${props => 
    props.$active ? 'linear-gradient(to right, #8e44ad, #e74c3c, #f39c12)' : 
    'none'};
  border: 2px solid ${props => 
    props.$active ? 'transparent' : 
    props.$isHovered ? '#e74c3c' : 
    '#3a3a3a'};
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin: 0 10px;

  &:hover {
    transform: scale(1.2);
    border-color: ${props => props.$active ? 'transparent' : '#f39c12'};
    background-color: ${props => props.$active ? 'linear-gradient(to right, #8e44ad, #e74c3c, #f39c12)' : '#f39c12'};
  }

  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${props => 
      props.$active ? '#f39c12' : 
      props.$isHovered ? '#f39c12' : 
      'transparent'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
`;

// Company name displayed below timeline node
const NodeLabel = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.$active || props.$isHovered ? '#f39c12' : props.theme.colors.text};
  text-align: center;
  width: 120px;
  transition: all 0.3s ease;
`;

// Year displayed above timeline node
const YearLabel = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.$active || props.$isHovered ? '#e74c3c' : props.theme.colors.text};
  text-align: center;
  transition: all 0.3s ease;
`;

// Container for the detailed experience content
const ExperienceDetailsContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
  padding-bottom: 60px;
  margin-bottom: 30px;
`;

// Card display for the active experience
const ExperienceCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.xl}; 
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg}, 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 800px;
  max-width: 800px;
  min-width: 800px;
  position: relative;
  overflow: visible;
  min-height: 600px;
  height: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 90%;
    max-width: 90%;
    min-width: auto;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #8e44ad, #e74c3c, #f39c12);
  }
`;

const CompanyLogo = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  border: 2px solid rgba(142, 68, 173, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  i {
    font-size: 1.8rem;
    color: #8e44ad;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-right: 80px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ExperienceInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  
  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #e74c3c;
    }
  }
  
  i {
    margin-left: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.md};
    color: #f39c12;
  }
`;

const JobTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: #8e44ad;
`;

const JobMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
  }
`;

const JobPeriod = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  
  i {
    margin-right: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const JobLocation = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  
  i {
    margin-right: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const JobDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const SectionDivider = styled.div`
  height: 2px;
  background: linear-gradient(to right, rgba(142, 68, 173, 0.2), rgba(231, 76, 60, 0.7), rgba(243, 156, 18, 0.2));
  margin: ${props => props.theme.spacing.lg} 0;
`;

const SectionLabel = styled.h5`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: #8e44ad;
  margin-bottom: ${props => props.theme.spacing.md};
  
  i {
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AchievementItem = styled.li`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  padding-left: ${props => props.theme.spacing.lg};
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #e74c3c;
    font-weight: bold;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const SkillTag = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  background-color: rgba(142, 68, 173, 0.2);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(231, 76, 60, 0.4);
    transform: translateY(-2px);
  }
`;

const LinksList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.md};
  color: #8e44ad;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e74c3c;
    transform: translateY(-2px);
  }
  
  i {
    font-size: ${props => props.theme.fontSizes.md};
  }
`;

const ProgressIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 3px;
  background: linear-gradient(to right, #8e44ad, #e74c3c, #f39c12);
  width: ${props => `${props.$progress}%`};
  transform: translateY(-50%);
  z-index: 2;
  transition: width 0.5s ease;
`;

const getCompanyIcon = (company) => {
  switch(company.toLowerCase()) {
    case 'cerebro sports':
      return 'fas fa-basketball-ball';
    case 'the hoops dojo':
      return 'fas fa-basketball-ball';
    case 'anb systems':
      return 'fas fa-building';
    case 'cloud at california':
      return 'fas fa-cloud';
    case 'empowerate':
      return 'fas fa-lightbulb';
    case 'cal alumni association':
      return 'fas fa-university';
    case 'optimus technologies':
    default:
      return 'fas fa-laptop-code';
  }
};

const Experience = ({ portfolioData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Custom ordering of experiences based on user requirements
  const customOrderExperiences = () => {
    const experienceCopy = [...portfolioData.experience];
    
    // Override company names where needed
    experienceCopy.forEach(exp => {
      // Add comma before "Inc" in Empowerate
      if (exp.company.toLowerCase().includes("empowerate")) {
        exp.company = "Empowerate, Inc";
      }
      // Change Amazon to Amazon.com
      if (exp.company.toLowerCase().includes("amazon")) {
        exp.company = "Amazon.com";
      }
    });
    
    // Find each company by name and arrange in specified order
    const orderedCompanies = [
      "Optimus BT",        // 1. Leftmost
      "Cal Alumni Association", // 2
      "Empowerate, Inc",   // 3
      "Cloud at California", // 4
      "ANB Systems",       // 5
      "Amazon.com",        // 6 
      "The Hoops Dojo",    // 7
      "Cerebro Sports"     // 8. Rightmost
    ];
    
    // Override Cerebro Sports date to 2025
    const cerebroIndex = experienceCopy.findIndex(exp => 
      exp.company.toLowerCase().includes("cerebro sports")
    );
    
    if (cerebroIndex !== -1) {
      experienceCopy[cerebroIndex].period = "Jan 2025 - Present";
    }
    
    // Sort based on custom order
    return experienceCopy.sort((a, b) => {
      const indexA = orderedCompanies.findIndex(company => 
        a.company.toLowerCase().includes(company.toLowerCase())
      );
      const indexB = orderedCompanies.findIndex(company => 
        b.company.toLowerCase().includes(company.toLowerCase())
      );
      
      // If both companies are in our ordered list
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // If only one is in the list, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // Default sort by date
      return 0;
    });
  };

  const sortedExperiences = customOrderExperiences();
  
  // Find Cerebro Sports index in the sorted array to set as default
  const cerebroIndex = sortedExperiences.findIndex(exp => 
    exp.company.toLowerCase().includes("cerebro sports")
  );
  
  // Set the initial active index to Cerebro Sports (or 0 if not found)
  const [activeIndex, setActiveIndex] = useState(cerebroIndex !== -1 ? cerebroIndex : 0);

  const handleNodeClick = (index) => {
    setActiveIndex(index);
  };
  
  const handleNodeHover = (index) => {
    setHoveredIndex(index);
  };
  
  const handleNodeLeave = () => {
    setHoveredIndex(null);
  };
  
  const getYear = (periodString) => {
    const match = periodString.match(/\d{4}/);
    return match ? match[0] : periodString.substring(0, 4);
  };
  
  const getProgressPercentage = () => {
    return ((activeIndex + 1) / sortedExperiences.length) * 100;
  };
  
  return (
    <ExperienceSection id="experience">
      <Container>
        <SectionTitle>Professional Experience</SectionTitle>
        
        <TimelineContainer>
          <TimelineTrack>
            <ProgressIndicator $progress={getProgressPercentage()} />
            
            {sortedExperiences.map((experience, index) => (
              <div key={index} style={{ position: 'relative', zIndex: 10 }}>
                <TimelineNode 
                  $active={activeIndex === index}
                  $isHovered={hoveredIndex === index}
                  onClick={() => handleNodeClick(index)}
                  onMouseEnter={() => handleNodeHover(index)}
                  onMouseLeave={handleNodeLeave}
                />
                <YearLabel 
                  $active={activeIndex === index}
                  $isHovered={hoveredIndex === index}
                >
                  {getYear(experience.period)}
                </YearLabel>
                <NodeLabel 
                  $active={activeIndex === index}
                  $isHovered={hoveredIndex === index}
                >
                  {experience.company}
                </NodeLabel>
              </div>
            ))}
          </TimelineTrack>
          
          <ExperienceDetailsContainer>
            <AnimatePresence mode="wait">
              <ExperienceCard
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CompanyLogo>
                  <i className={getCompanyIcon(sortedExperiences[activeIndex].company)} />
                </CompanyLogo>
                
                <ExperienceHeader>
                  <ExperienceInfo>
                    <CompanyName>
                      {sortedExperiences[activeIndex].url ? (
                        <a 
                          href={sortedExperiences[activeIndex].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {sortedExperiences[activeIndex].company}
                          <i className="fas fa-external-link-alt" />
                        </a>
                      ) : (
                        sortedExperiences[activeIndex].company
                      )}
                    </CompanyName>
                    <JobTitle>{sortedExperiences[activeIndex].title}</JobTitle>
                    <JobMeta>
                      <JobPeriod>
                        <i className="fas fa-calendar-alt" />
                        {sortedExperiences[activeIndex].period}
                      </JobPeriod>
                      <JobLocation>
                        <i className="fas fa-map-marker-alt" />
                        {sortedExperiences[activeIndex].location}
                      </JobLocation>
                    </JobMeta>
                  </ExperienceInfo>
                </ExperienceHeader>
                
                <JobDescription>
                  {sortedExperiences[activeIndex].description}
                </JobDescription>
                
                <SectionDivider />
                
                <SectionLabel>
                  <i className="fas fa-trophy" />
                  Key Achievements
                </SectionLabel>
                <AchievementsList>
                  {sortedExperiences[activeIndex].achievements.map((achievement, idx) => (
                    <AchievementItem key={idx}>{achievement}</AchievementItem>
                  ))}
                </AchievementsList>
                
                <SectionLabel>
                  <i className="fas fa-tools" />
                  Skills & Technologies
                </SectionLabel>
                <SkillsList>
                  {sortedExperiences[activeIndex].skills.map((skill, idx) => (
                    <SkillTag key={idx}>{skill}</SkillTag>
                  ))}
                </SkillsList>
                
                <SectionDivider />
                
                <SectionLabel>
                  <i className="fas fa-link" />
                  Relevant Links
                </SectionLabel>
                <LinksList>
                  <LinkItem 
                    href={sortedExperiences[activeIndex].url || "https://google.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe" />
                    Website
                  </LinkItem>
                  <LinkItem 
                    href={sortedExperiences[activeIndex].workUrl || "https://google.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-briefcase" />
                    Work Attached
                  </LinkItem>
                </LinksList>
              </ExperienceCard>
            </AnimatePresence>
          </ExperienceDetailsContainer>
        </TimelineContainer>
      </Container>
    </ExperienceSection>
  );
};

export default Experience; 