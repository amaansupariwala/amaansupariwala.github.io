import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const BackgroundContainer = styled.div`
  min-height: 100vh;
  padding-top: ${props => props.theme.header.height};
  padding-bottom: ${props => props.theme.spacing['4xl']};
  background: ${props => props.theme.colors.background};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: ${props => props.theme.header.mobileHeight};
  }
`;

const JournalSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.lg};
`;

const JournalTitle = styled(motion.h1)`
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
    background: ${props => props.theme.colors.gradient.redPurple};
    margin: ${props => props.theme.spacing.lg} auto 0;
    border-radius: 2px;
  }
`;

const JournalEntry = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing['4xl']};
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EntryImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px dashed ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &::before {
    content: '📸';
    font-size: 3rem;
    opacity: 0.3;
  }
  
  &::after {
    content: 'Image Placeholder';
    position: absolute;
    bottom: ${props => props.theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.6;
  }
`;

const StickyNote = styled(motion.div)`
  background: #ffd700;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  padding: ${props => props.theme.spacing.lg};
  border-radius: 8px 8px 8px 25px;
  position: relative;
  margin: ${props => props.theme.spacing.lg} 0;
  transform: rotate(-1deg);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 20px;
    width: 30px;
    height: 15px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: rotate(-45deg);
  }
  
  &.left {
    margin-left: 0;
    margin-right: auto;
    width: 85%;
    transform: rotate(-2deg);
  }
  
  &.right {
    margin-left: auto;
    margin-right: 0;
    width: 85%;
    transform: rotate(1deg);
    background: linear-gradient(135deg, #ff6b9d 0%, #ffa8cc 100%);
  }
  
  &.center {
    margin: ${props => props.theme.spacing.xl} auto;
    width: 70%;
    transform: rotate(0deg);
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }
  
  h3 {
    color: #2d3748;
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.theme.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  
  p {
    color: #2d3748;
    font-size: ${props => props.theme.fontSizes.md};
    line-height: 1.5;
    margin: 0;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  
  .date {
    font-size: ${props => props.theme.fontSizes.sm};
    color: #4a5568;
    font-style: italic;
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: ${props => props.theme.colors.gradient.redPurple};
  opacity: 0.3;
  transform: translateX(-50%);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    left: 20px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 200px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 0 4px ${props => props.theme.colors.background};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    left: 20px;
  }
`;

const Background = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const journalEntries = [
    {
      id: 1,
      imageType: "childhood",
      notes: [
        {
          type: "left",
          title: "The Beginning",
          content: "Growing up, I was always fascinated by how things worked. From taking apart remote controls to building LEGO contraptions.",
          date: "Early Years"
        }
      ]
    },
    {
      id: 2,
      imageType: "school",
      notes: [
        {
          type: "right",
          title: "First Code",
          content: "Discovered programming in high school. Stayed up late writing my first 'Hello World' - I was hooked immediately.",
          date: "High School"
        }
      ]
    },
    {
      id: 3,
      imageType: "college",
      notes: [
        {
          type: "center",
          title: "University Days",
          content: "Dove deep into computer science and mathematics. Every algorithm felt like solving a puzzle.",
          date: "University"
        }
      ]
    },
    {
      id: 4,
      imageType: "internship",
      notes: [
        {
          type: "left",
          title: "First Real Project",
          content: "Internship at a tech company. Built my first production app - nerve-wracking but incredibly rewarding.",
          date: "Summer Internship"
        }
      ]
    },
    {
      id: 5,
      imageType: "amazon",
      notes: [
        {
          type: "right",
          title: "Amazon Journey",
          content: "Joined Amazon and worked on large-scale systems. Learned what it means to build for millions of users.",
          date: "Professional Life"
        }
      ]
    },
    {
      id: 6,
      imageType: "sports",
      notes: [
        {
          type: "left",
          title: "Sports Meets Tech",
          content: "Discovered my passion for sports analytics. Combining two loves - technology and basketball.",
          date: "Career Pivot"
        }
      ]
    },
    {
      id: 7,
      imageType: "cerebro",
      notes: [
        {
          type: "center",
          title: "Building the Future",
          content: "Co-founded Cerebro Sports. Mark Cuban believed in our vision. This is where AI meets athletics.",
          date: "Present Day"
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const entryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const noteVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <BackgroundContainer ref={ref}>
      <JournalSection>
        <JournalTitle
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          My Journey
        </JournalTitle>
        
        <div style={{ position: 'relative' }}>
          <TimelineLine />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {journalEntries.map((entry, index) => (
              <JournalEntry
                key={entry.id}
                variants={entryVariants}
              >
                <TimelineDot />
                
                <EntryImage />
                
                {entry.notes.map((note, noteIndex) => (
                  <StickyNote
                    key={noteIndex}
                    className={note.type}
                    variants={noteVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      rotate: note.type === 'left' ? -3 : note.type === 'right' ? 2 : 0,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <div className="date">{note.date}</div>
                  </StickyNote>
                ))}
              </JournalEntry>
            ))}
          </motion.div>
        </div>
      </JournalSection>
    </BackgroundContainer>
  );
};

export default Background; 