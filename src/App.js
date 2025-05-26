import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './Components/Header/Header';
import About from './Components/About/About';
import Experience from './Components/Experience/Experience';
import Skills from './Components/Skills/Skills';
import FeaturedProjects from './Components/Portfolio/FeaturedProjects';
// import Testimonials from './Components/Testimonials/Testimonials';
import ContactMe from './Components/ContactMe/ContactMe';
import Footer from './Components/Footer/Footer'; 
import portfolioData from './portfolioData';
import { theme, GlobalStyles } from './theme';
// import BasketballGame from './Components/BasketballGame/BasketballGame';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Header portfolioData={portfolioData} />
        <FeaturedProjects portfolioData={portfolioData} />
        <About portfolioData={portfolioData} />
        <Experience portfolioData={portfolioData} />
        <Skills portfolioData={portfolioData} />
        {/* <Testimonials portfolioData={portfolioData} /> */}
        <ContactMe portfolioData={portfolioData} />
        <Footer portfolioData={portfolioData} />
      </div>
    </ThemeProvider>
  );
};

export default App;