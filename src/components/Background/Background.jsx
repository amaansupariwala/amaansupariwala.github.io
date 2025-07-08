import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const BackgroundSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d0036 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #8e44ad, transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
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
    background: linear-gradient(90deg, #8e44ad, #e74c3c);
    margin: ${props => props.theme.spacing.lg} auto 0;
    border-radius: 2px;
  }
`;

const BackgroundContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const PhotoContainer = styled(motion.div)`
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    order: -1;
  }
`;

const Photo = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #8e44ad, #e74c3c);
    border-radius: ${props => props.theme.borderRadius.lg};
    z-index: -1;
  }
`;

const PhotoFrame = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: linear-gradient(135deg, #8e44ad, #e74c3c);
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

const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HighlightItem = styled(motion.li)`
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  background: rgba(142, 68, 173, 0.1);
  border: 1px solid rgba(142, 68, 173, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  position: relative;
  
  &::before {
    content: '▸';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    margin-right: ${props => props.theme.spacing.sm};
  }
  
  &:hover {
    background: rgba(142, 68, 173, 0.15);
    border-color: rgba(142, 68, 173, 0.3);
    transform: translateX(5px);
    transition: all 0.3s ease;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const StatCard = styled(motion.div)`
  background: rgba(45, 0, 54, 0.5);
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  border: 1px solid rgba(142, 68, 173, 0.2);
  
  &:hover {
    background: rgba(45, 0, 54, 0.8);
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

const Background = ({ portfolioData }) => {
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

  const highlights = [
    "Computer Science & Finance graduate from UC Berkeley",
    "3+ years as Software Engineer at Amazon",
    "Head of AI at Cerebro Sports (Mark Cuban Investment)",
    "Digital Creator at The Hoops Dojo",
    "AWS Solutions Architect Associate Certified",
    "Passion for sports analytics and AI innovation"
  ];

  const stats = [
    { number: "3+", label: "Years at Amazon" },
    { number: "15%", label: "Efficiency Improvement" },
    { number: "1M+", label: "Data Points Processed" },
    { number: "5+", label: "AI Models Deployed" }
  ];

  return (
    <BackgroundSection ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          My Background
        </SectionTitle>
        
        <BackgroundContent>
          <TextContent
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Bio>
              {portfolioData.bio}
            </Bio>
            
            <HighlightList>
              {highlights.map((highlight, index) => (
                <HighlightItem
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  {highlight}
                </HighlightItem>
              ))}
            </HighlightList>
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
        </BackgroundContent>
        
        <StatsContainer>
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
        </StatsContainer>
      </Container>
    </BackgroundSection>
  );
};

export default Background; 