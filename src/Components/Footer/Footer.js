import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
          <footer>
  <div className="row">
    <div className="twelve columns">
      <ul className="social-links">
      <li><a href="https://linkedin.com/in/amaansupariwala"><i className="fa fa-linkedin" /></a></li>
        <li><a href="https://facebook.com/amaansupariwala"><i className="fa fa-facebook" /></a></li>
        <li><a href="https://github.com/amaansupariwala"><i className="fa fa-dribbble" /></a></li>
        <li><a href="https://twitter.com/amaansupariwala"><i className="fa fa-twitter" /></a></li>
        <li><a href="https://instagram.com/amaansupariwala"><i className="fa fa-instagram" /></a></li>
      </ul>
      <ul className="copyright">
        <li>© Built By <a className="smoothscroll" title="Back to Top" href="#home">Amaan Supariwala</a> with the ReactJS Framework</li>
        <li>Design by <a className="smoothscroll" title="Back to Top" href="#home">Amaan Supariwala</a></li>   
      </ul>
    </div>
    <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
  </div>
</footer>


      </React.Fragment>
    );
  }
}