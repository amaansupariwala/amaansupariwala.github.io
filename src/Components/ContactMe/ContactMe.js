import React, { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
  background-color: #1e1e1e;
  padding: 80px 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: #8e44ad;
    margin: 20px auto 0;
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  color: #e0e0e0;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 50px;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #252525;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  color: #e0e0e0;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Required = styled.span`
  color: #8e44ad;
  margin-left: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8e44ad;
    box-shadow: 0 0 0 2px rgba(142, 68, 173, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8e44ad;
    box-shadow: 0 0 0 2px rgba(142, 68, 173, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    background-color: #8e44ad;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FormStatus = styled.div`
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: 500;
  display: ${props => props.$visible ? 'block' : 'none'};
  background-color: ${props => props.$success ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  color: ${props => props.$success ? '#27AE60' : '#E74C3C'};
  border: 1px solid ${props => props.$success ? '#27AE60' : '#E74C3C'};
`;

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });
    
    // In a real implementation, you would send this data to a server or service
    // For example, using fetch or axios to send to a serverless function, form service, etc.
    // Options include:
    // 1. Netlify Forms (if hosted on Netlify)
    // 2. Formspree.io
    // 3. EmailJS
    // 4. AWS Lambda or other serverless function that emails you
    
    // Simulating a form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }, 1500);
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>Get In Touch</SectionTitle>
        <SectionDescription>
          I'm always looking to grow my network and build relationships. 
          Send me a message, question, or submit any feedback you have for my portfolio.
          I look forward to hearing from you!
        </SectionDescription>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name<Required>*</Required></Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email<Required>*</Required></Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message<Required>*</Required></Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={status.submitting}>
              {status.submitting ? 'Sending...' : 'Submit'}
            </SubmitButton>
            
            <FormStatus 
              $visible={status.submitted} 
              $success={status.success}
            >
              {status.message}
            </FormStatus>
          </form>
        </FormContainer>
      </Container>
    </ContactSection>
  );
};

export default ContactMe;