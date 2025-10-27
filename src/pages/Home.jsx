import React from 'react';
import styled from 'styled-components';
import BrickBreaker from '../components/Games/BrickBreaker';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${props => props.theme.header.height};
  padding-left: ${props => props.theme.spacing.md};
  padding-right: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: ${props => props.theme.header.mobileHeight};
  }
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const Card = styled(motion.div)`
  position: relative;
  height: 360px;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  background: ${props => props.theme.colors.surface};
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 12px 24px rgba(0,0,0,0.35);
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardNote = styled.div`
  position: absolute;
  ${props => props.$top ? 'top: 16px;' : 'bottom: 16px;'}
  left: 16px;
  right: 16px;
  background: rgba(12,12,15,0.7);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px 14px;
  color: #fff;
`;
const Home = () => {
  const nextSectionRef = React.useRef(null);

  const scrollToNext = React.useCallback(() => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <HomeContainer>
        <Section>
          <div style={{ color: '#9aa4b2', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            Enjoy a quick game
          </div>
          <BrickBreaker onEnd={scrollToNext} />
        </Section>
      </HomeContainer>

      <Section ref={nextSectionRef} style={{ padding: '40px 16px' }}>
        <CardsGrid>
          <Card initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <CardImg src="/images/young-me-2.png" alt="The Beginning" loading="lazy" />
            <CardNote $top>
              <strong>The Beginning</strong>
              <div>Hey, I'm Amaan. I love Hoops and now I'm building AI products for Basketball's top decision makers.</div>
            </CardNote>
          </Card>
          <Card initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <CardImg src="/images/sloan-win-stage.jpg" alt="The Breakthrough" loading="lazy" />
            <CardNote>
              <strong>The Breakthrough</strong>
              <div>Winning MIT Sloan Sports Analytics Conference.</div>
            </CardNote>
          </Card>
          <Card initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <CardImg src="/images/nature.png" alt="The Vision" loading="lazy" />
            <CardNote $top>
              <strong>The Vision</strong>
              <div>Keep building, keep inspiring.</div>
            </CardNote>
          </Card>
        </CardsGrid>
      </Section>
    </>
  );
};

export default Home;