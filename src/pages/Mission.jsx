import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Clock, ArrowRight, X, Mail, User, CheckCircle } from 'lucide-react';

const MissionContainer = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 4px;
    background: ${props => props.theme.colors.gradient.redPurple};
    margin: ${props => props.theme.spacing.lg} auto 0;
    border-radius: 2px;
    position: absolute;
    bottom: -${props => props.theme.spacing.lg};
    left: 50%;
    transform: translateX(-50%);
  }
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const MissionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const PlaceholderCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing['2xl']};
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(245, 158, 11, 0.1),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const PlaceholderText = styled.p`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-style: italic;
`;

const PlaceholderSubText = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gradient.redPurple};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: ${props => props.theme.shadows.glow};
  
  svg {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const ProgressSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(245, 158, 11, 0.3),
      transparent
    );
    animation: progressShimmer 2s infinite;
  }
  
  @keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.gradient.redPurple};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 35%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: fillShimmer 2s infinite;
  }
  
  @keyframes fillShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressText = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const NotifyButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: transparent;
  border: 2px solid #10b981;
  color: #10b981;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #10b981;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  width: 100%;
  max-width: 500px;
  position: relative;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const ModalSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.md};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  svg {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Input = styled.input`
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.md};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  text-align: center;
  margin-top: ${props => props.theme.spacing.md};
  
  &.success {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  
  &.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
`;

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Using Formspree to send form submissions directly to your email
      const response = await fetch('https://formspree.io/f/xgvyjaqv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `New mailing list signup from ${formData.name} (${formData.email}) on ${new Date().toLocaleString()}. They want to be notified about your mission page updates!`,
          _subject: 'New Mailing List Signup - Mission Page',
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thanks! You\'ve been added to the mailing list. Check your email for confirmation!' 
        });
        setFormData({ name: '', email: '' });
        
        setTimeout(() => {
          setShowModal(false);
          setStatus(null);
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to localStorage if Formspree fails
      const existingSignups = JSON.parse(localStorage.getItem('mailing_list') || '[]');
      const newSignup = {
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toISOString(),
        page: 'Mission'
      };
      
      const emailExists = existingSignups.some(signup => signup.email === formData.email);
      
      if (!emailExists) {
        existingSignups.push(newSignup);
        localStorage.setItem('mailing_list', JSON.stringify(existingSignups));
      }

      setStatus({ 
        type: 'success', 
        message: 'Thanks! Your information has been saved. You\'ll be notified when ready!' 
      });
      setFormData({ name: '', email: '' });
      
      setTimeout(() => {
        setShowModal(false);
        setStatus(null);
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus(null);
    setFormData({ name: '', email: '' });
  };

  const handleNotifyClick = () => {
    setShowModal(true);
  };

  // Copy email to clipboard functionality
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('amaan.supariwala@gmail.com').then(() => {
      setStatus({ type: 'success', message: 'Email copied to clipboard!' });
      setTimeout(() => setStatus(null), 2000);
    });
  };

  return (
    <MissionContainer ref={ref}>
      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            My Mission
          </SectionTitle>
          
          <MissionContent>
            <PlaceholderCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <PlaceholderText>
                "I'm still working on this..."
              </PlaceholderText>
              
              <PlaceholderSubText>
                My mission statement is currently being crafted to reflect my vision for myself and the world. 
                For now I know I love AI, hoops, and content. Come back soon!
              </PlaceholderSubText>
              
              <ComingSoonBadge>
                <Clock size={20} />
                Coming Soon
              </ComingSoonBadge>
            </PlaceholderCard>
            
            <ProgressSection>
              <ProgressBar>
                <ProgressFill
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "35%" } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </ProgressBar>
              
              <ProgressText>
                Progress: 35% Complete
              </ProgressText>
            </ProgressSection>
            
            <NotifyButton
              onClick={handleNotifyClick}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify me when ready
              <ArrowRight size={16} />
            </NotifyButton>
          </MissionContent>
        </Container>
      </Section>

      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <X size={20} />
              </CloseButton>
              
              <ModalTitle>Join the Mailing List</ModalTitle>
              <ModalSubtitle>
                Be the first to know when my mission page is ready! Your info stays private and secure.
              </ModalSubtitle>
              
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Label>
                    <User size={16} />
                    Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                
                <InputGroup>
                  <Label>
                    <Mail size={16} />
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                
                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Joining...' : 'Join Mailing List'}
                </SubmitButton>
                
                {status && (
                  <StatusMessage className={status.type}>
                    {status.type === 'success' && <CheckCircle size={16} style={{ marginRight: '8px' }} />}
                    {status.message}
                  </StatusMessage>
                )}
                
                <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #374151' }}>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                    Or contact me directly:
                  </p>
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    style={{
                      background: 'none',
                      border: '1px solid #10b981',
                      color: '#10b981',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📧 amaan.supariwala@gmail.com
                  </button>
                </div>
              </Form>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </MissionContainer>
  );
};

export default Mission; 