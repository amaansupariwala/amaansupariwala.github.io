import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ExternalLink, Award, GraduationCap, Briefcase } from 'lucide-react';
import portfolioData from '../portfolioData';

const BackgroundContainer = styled.div`
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
  margin-bottom: ${props => props.theme.spacing['3xl']};
  
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

const IntroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const PhotoContainer = styled(motion.div)`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    order: -1;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
`;

const PhotoFrame = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: ${props => props.theme.colors.gradient.purpleGold};
  border-radius: ${props => props.theme.borderRadius.lg};
  z-index: 1;
`;

const TextContent = styled(motion.div)`
  color: ${props => props.theme.colors.text};
`;

const Bio = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  border: 1px solid ${props => props.theme.colors.border};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ExperienceSection = styled.div`
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const SubSectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const ExperienceCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradient.purpleGold};
    border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ExperienceTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ExperienceCompany = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ExperienceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-items: flex-start;
  }
`;

const ExperienceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ExperienceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AchievementItem = styled.li`
  padding: ${props => props.theme.spacing.sm} 0;
  color: ${props => props.theme.colors.textSecondary};
  position: relative;
  padding-left: ${props => props.theme.spacing.lg};
  
  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const SkillCategory = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const SkillCategoryTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SkillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillName = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const SkillLevel = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const Background = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { number: "3+", label: "Years at Amazon" },
    { number: "15%", label: "Efficiency Improvement" },
    { number: "1M+", label: "Data Points Processed" },
    { number: "5+", label: "AI Models Deployed" }
  ];

  return (
    <BackgroundContainer ref={ref}>
      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            My Background
          </SectionTitle>
          
          <IntroSection>
            <TextContent
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Bio>
                {portfolioData.bio}
              </Bio>
            </TextContent>
            
            <PhotoContainer
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <PhotoFrame />
              <Photo
                src="https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill,g_face,f_auto,q_auto/sample.jpg"
                alt="Amaan Supariwala"
              />
            </PhotoContainer>
          </IntroSection>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
          
          <ExperienceSection>
            <SubSectionTitle>
              <Briefcase size={32} />
              Professional Experience
            </SubSectionTitle>
            
            {portfolioData.experience?.map((exp, index) => (
              <ExperienceCard
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <ExperienceHeader>
                  <div>
                    <ExperienceTitle>{exp.title}</ExperienceTitle>
                    <ExperienceCompany>{exp.company}</ExperienceCompany>
                  </div>
                  <ExperienceDetails>
                    <ExperienceInfo>
                      <Calendar size={16} />
                      {exp.period}
                    </ExperienceInfo>
                    {exp.location && (
                      <ExperienceInfo>
                        <MapPin size={16} />
                        {exp.location}
                      </ExperienceInfo>
                    )}
                    {exp.url && (
                      <ExperienceInfo>
                        <ExternalLink size={16} />
                        <a href={exp.url} target="_blank" rel="noopener noreferrer">
                          View Company
                        </a>
                      </ExperienceInfo>
                    )}
                  </ExperienceDetails>
                </ExperienceHeader>
                
                <ExperienceDescription>
                  {exp.description}
                </ExperienceDescription>
                
                {exp.achievements && (
                  <AchievementsList>
                    {exp.achievements.map((achievement, i) => (
                      <AchievementItem key={i}>
                        {achievement}
                      </AchievementItem>
                    ))}
                  </AchievementsList>
                )}
              </ExperienceCard>
            ))}
          </ExperienceSection>
          
          <ExperienceSection>
            <SubSectionTitle>
              <GraduationCap size={32} />
              Education
            </SubSectionTitle>
            
            {portfolioData.education?.map((edu, index) => (
              <ExperienceCard
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <ExperienceHeader>
                  <div>
                    <ExperienceTitle>{edu.degree}</ExperienceTitle>
                    <ExperienceCompany>{edu.institution}</ExperienceCompany>
                    {edu.concentration && (
                      <ExperienceInfo>
                        <Award size={16} />
                        {edu.concentration}
                      </ExperienceInfo>
                    )}
                  </div>
                  <ExperienceDetails>
                    <ExperienceInfo>
                      <Calendar size={16} />
                      {edu.period}
                    </ExperienceInfo>
                  </ExperienceDetails>
                </ExperienceHeader>
                
                {edu.courses && (
                  <AchievementsList>
                    {edu.courses.map((course, i) => (
                      <AchievementItem key={i}>
                        {course}
                      </AchievementItem>
                    ))}
                  </AchievementsList>
                )}
              </ExperienceCard>
            ))}
          </ExperienceSection>
          
          <ExperienceSection>
            <SubSectionTitle>
              <Award size={32} />
              Skills & Expertise
            </SubSectionTitle>
            
            <SkillsGrid>
              {portfolioData.skills?.map((skillCategory, index) => (
                <SkillCategory
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkillCategoryTitle>{skillCategory.category}</SkillCategoryTitle>
                  {skillCategory.items.map((skill, i) => (
                    <SkillItem key={i}>
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillItem>
                  ))}
                </SkillCategory>
              ))}
            </SkillsGrid>
          </ExperienceSection>
        </Container>
      </Section>
    </BackgroundContainer>
  );
};

export default Background; 