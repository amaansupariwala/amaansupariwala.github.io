import React, { Component } from 'react';
export default class Resume extends Component {
  render() {
    return (
      <React.Fragment>
      <section id="resume">
  {/* Education
----------------------------------------------- */}
  <div className="row education">
    <div className="three columns header-col">
      <h1><span>Education</span></h1>
    </div>
    <div className="nine columns main-col">
      <div className="row item">
        <div className="twelve columns">
        
          <h3>University of California, Berkeley</h3>
          <p className="info">Bachelors in Computer Science<span>•</span> <em className="date">2019 - 2023</em></p>
          <p className="subtext">Concentration in Finance</p>
          <p className="jobDescription">
            Studied Computer Science, with a concentration in Finance plus Deep Learning AI. 
            <br></br>
            <u>Relevant Courseload:</u> 
            <br></br>• Data Structures and Algorithms
            <br></br>• Software Engineering
            <br></br>• Artificial Intelligence + Machine Learning
            <br></br>• Cloud Computing Iaas
            <br></br>• Machine Architecture
            <br></br>• Financial Statement Analysis
            <br></br>• Corporate Finance
            <br></br>• Risk Assessment with Financial Modeling
          </p>
        </div>
      </div> {/* item end */}
      
    </div> {/* main-col end */}
  </div> {/* End Education */}
  {/* Work
----------------------------------------------- */}
  <div className="row work">
    <div className="three columns header-col">
      <h1><span>Experience</span></h1>
    </div>
    <div className="nine columns main-col">
      <div className="row item">
        <div className="twelve columns">
          <h3>Empowerate Inc</h3>
          <p className="info">Software QA Engineer Intern <span>•</span> <em className="date">Summer 2020</em></p>
          <p className="jobDescription">
          • Engineered an automated testing harness using the Jasmine Testing Framework for our web application. Resulted in the stoppage of manual QA Testing.
            <br></br>
            • Reconfigured database and manipulated server settings to calibrate for AWS Cloud deployment of our web application 
          </p>
        </div>
      </div> {/* item end */}
      <div className="row item">
        <div className="twelve columns">
          <h3> Cal Alumni Association </h3>
          <p className="info">Data Research Analyst <span>•</span> <em className="date">September 2019 - May 2020</em></p>
          <p>
          • Analyzed and Presented Alumni data and metrics for events, engagement, and lead tracking
            <br></br>
            • Employed a NoSQL Database to implement our data visualization tools
            <br></br>
            • Developed algorithmic data learning models for predictive metric analysis
            
          </p>
        </div>
      </div> {/* item end */}
      <div className="row item">
        <div className="twelve columns">
          <h3>Optimus BT</h3>
          <p className="info">Software Development Intern <span>•</span> <em className="date"> February 2019 - September 2019 </em></p>
          <p>
          • Engineered Interface Development Features, as well as design critique for our Node-based web platform on Azure
            <br></br>
            • Archiected back-end functionality and automation | Bash and Azure
            <br></br>
            • Managed product update launches and the coordination of global teams / developers, gaining valuable experience in Product Management
            
          </p>
        </div>
      </div> {/* item end */}
    </div> {/* main-col end */}
  </div> {/* End Work */}
  {/* Skills
----------------------------------------------- */}
  <div className="row skill">
    <div className="three columns header-col">
      <h1><span>Skills</span></h1>
    </div>
    <div className="nine columns main-col">
      <p>Here are a collection of a few of my main Skills, Languages and Technical frameworks. <br></br>I'm happy to discuss in detail any of these skills and how they can be used to help your cause!
      </p>
      <div className="bars">
        <ul className="skills">
          <li><span className="bar-expand photoshop" /><em>Python</em></li>
          <li><span className="bar-expand illustrator" /><em>Javascript</em></li>
          <li><span className="bar-expand wordpress" /><em>AWS Cloud Computing</em></li>
          <li><span className="bar-expand css" /><em>Java</em></li>
          <li><span className="bar-expand html5" /><em>Full Stack Web Development</em></li>
          <li><span className="bar-expand jquery" /><em>Google Scripts</em></li>
        </ul>
      </div>{/* end skill-bars */}
    </div> {/* main-col end */}
  </div> {/* End skills */}
</section>


      </React.Fragment>
    );
  }
}
