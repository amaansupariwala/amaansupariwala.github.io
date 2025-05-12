import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkillsSection = styled.section`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
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

const SkillsIntro = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing['2xl']};
  text-align: center;
  color: ${props => props.theme.colors.text};
`;

const SkillsCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background-color: #23242a;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  position: relative;
  overflow: hidden;
`;

const CategoryTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #8e44ad, #e74c3c, #f39c12);
  }
`;

const CategoryIcon = styled.i`
  margin-right: ${props => props.theme.spacing.sm};
  color: #e74c3c;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: ${props => props.theme.spacing.md};
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
`;

const getSkillColor = (name) => {
  const colors = {
    react: { main: '#61DAFB', gradient: 'linear-gradient(135deg, #61DAFB, #2D97B7)' },
    javascript: { main: '#F7DF1E', gradient: 'linear-gradient(135deg, #F7DF1E, #EAC117)' },
    typescript: { main: '#3178C6', gradient: 'linear-gradient(135deg, #3178C6, #235A97)' },
    python: { main: '#3776AB', gradient: 'linear-gradient(135deg, #3776AB, #FFD43B)' },
    java: { main: '#ED8B00', gradient: 'linear-gradient(135deg, #ED8B00, #5382A1)' },
    node: { main: '#339933', gradient: 'linear-gradient(135deg, #339933, #68A063)' },
    html: { main: '#E34F26', gradient: 'linear-gradient(135deg, #E34F26, #F06529)' },
    sql: { main: '#4479A1', gradient: 'linear-gradient(135deg, #4479A1, #3498db)' },
    aws: { main: '#FF9900', gradient: 'linear-gradient(135deg, #FF9900, #232F3E)' },
    gcp: { main: '#4285F4', gradient: 'linear-gradient(135deg, #4285F4, #EA4335)' },
    docker: { main: '#2496ED', gradient: 'linear-gradient(135deg, #2496ED, #0DB7ED)' },
    kubernetes: { main: '#326CE5', gradient: 'linear-gradient(135deg, #326CE5, #062C5E)' },
    data: { main: '#e74c3c', gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)' },
    machine: { main: '#9b59b6', gradient: 'linear-gradient(135deg, #9b59b6, #8e44ad)' },
    nlp: { main: '#3498db', gradient: 'linear-gradient(135deg, #3498db, #2980b9)' },
    llm: { main: '#1abc9c', gradient: 'linear-gradient(135deg, #1abc9c, #16a085)' },
    product: { main: '#f39c12', gradient: 'linear-gradient(135deg, #f39c12, #e67e22)' },
    agile: { main: '#2ecc71', gradient: 'linear-gradient(135deg, #2ecc71, #27ae60)' },
    default: { main: '#3a3d4d', gradient: 'linear-gradient(135deg, #3a3d4d, #5a627a)' }
  };
  
  const lowerName = name.toLowerCase();
  
  for (const [key, value] of Object.entries(colors)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  
  return colors.default;
};

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  min-width: 70px;
  min-height: 70px;
  max-width: 70px;
  max-height: 70px;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.background || 'linear-gradient(135deg, #3a3d4d, #5a627a)'};
  transition: all 0.3s ease;
  aspect-ratio: 1/1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
    max-width: 60px;
    max-height: 60px;
  }
`;

const SkillName = styled.span`
  font-size: 0.55rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: white;
  text-align: center;
  margin-top: ${props => props.theme.spacing.xs};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  line-height: 1.1;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SkillIcon = styled.i`
  font-size: 1.3rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Skills = () => {
  // Define skill categories with their respective skills and proficiency levels
  const skillCategories = [
    {
      category: "Product Management",
      icon: "fas fa-tasks",
      skills: [
        { name: "Agile/Scrum", icon: "fas fa-sync" },
        { name: "User Research", icon: "fas fa-users" },
        { name: "Wireframing", icon: "fas fa-pencil-ruler" },
        { name: "Prototyping", icon: "fas fa-drafting-compass" },
        { name: "Roadmapping", icon: "fas fa-map" },
        { name: "MVP Definition", icon: "fas fa-lightbulb" },
        { name: "A/B Testing", icon: "fas fa-vial" },
        { name: "KPI Definition", icon: "fas fa-tachometer-alt" },
        { name: "Stakeholder Management", icon: "fas fa-handshake" },
        { name: "Product Strategy", icon: "fas fa-chess" },
        { name: "UX Design", icon: "fas fa-palette" },
        { name: "Customer Journey", icon: "fas fa-route" }
      ]
    },
    {
      category: "Development & Engineering",
      icon: "fas fa-code",
      skills: [
        { name: "React", icon: "fab fa-react" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "TypeScript", icon: "fab fa-js" },
        { name: "Python", icon: "fab fa-python" },
        { name: "Java", icon: "fab fa-java" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "HTML/CSS", icon: "fab fa-html5" },
        { name: "SQL", icon: "fas fa-database" },
        { name: "GraphQL", icon: "fas fa-project-diagram" },
        { name: "CI/CD", icon: "fas fa-sync-alt" },
        { name: "Git", icon: "fab fa-git-alt" },
        { name: "Pandas", icon: "fas fa-table" },
        { name: "Django", icon: "fab fa-python" },
        { name: "MongoDB", icon: "fas fa-database" },
        { name: "Redis", icon: "fas fa-server" }
      ]
    },
    {
      category: "Data & Analytics",
      icon: "fas fa-chart-bar",
      skills: [
        { name: "Data Science", icon: "fas fa-brain" },
        { name: "Machine Learning", icon: "fas fa-robot" },
        { name: "NLP", icon: "fas fa-language" },
        { name: "LLM Development", icon: "fas fa-comment-dots" },
        { name: "PySpark", icon: "fas fa-fire" },
        { name: "Data Visualization", icon: "fas fa-chart-line" },
        { name: "Jupyter", icon: "fas fa-book-open" },
        { name: "Statistical Analysis", icon: "fas fa-calculator" },
        { name: "Computer Vision", icon: "fas fa-eye" },
        { name: "ETL Pipelines", icon: "fas fa-filter" },
        { name: "TensorFlow", icon: "fas fa-cogs" },
        { name: "PyTorch", icon: "fas fa-fire-alt" }
      ]
    },
    {
      category: "Cloud Infrastructure",
      icon: "fas fa-cloud",
      skills: [
        { name: "AWS", icon: "fab fa-aws" },
        { name: "GCP", icon: "fab fa-google" },
        { name: "Azure", icon: "fab fa-microsoft" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "Kubernetes", icon: "fas fa-dharmachakra" },
        { name: "Microservices", icon: "fas fa-network-wired" },
        { name: "CI/CD Pipelines", icon: "fas fa-code-branch" },
        { name: "API Design", icon: "fas fa-plug" },
        { name: "Serverless", icon: "fas fa-bolt" },
        { name: "Lambda", icon: "fas fa-atom" }
      ]
    }
  ];
  
  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle>Skills & Expertise</SectionTitle>
        <SkillsIntro>
          My technical toolkit features a diverse range of skills honed through professional experience and continuous learning.
        </SkillsIntro>
        
        <SkillsCategoriesContainer>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <CategoryTitle>
                <CategoryIcon className={category.icon} />
                {category.category}
              </CategoryTitle>
              
              <SkillsGrid
                as={motion.div}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {category.skills.map((skill, i) => {
                  const colorInfo = getSkillColor(skill.name);
                  return (
                    <SkillItem 
                      key={i}
                      variants={itemVariants}
                      background={colorInfo.gradient}
                    >
                      <SkillIcon className={skill.icon} />
                      <SkillName>{skill.name}</SkillName>
                    </SkillItem>
                  );
                })}
              </SkillsGrid>
            </SkillCategory>
          ))}
        </SkillsCategoriesContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 