import React, { Component } from 'react';
export default class Testimonials extends Component {
  render() {
    return (
      <React.Fragment>
      <section id="testimonials">
  <div className="text-container">
    <div className="row">
      <div className="two columns header-col">
        <h1><span>Client Testimonials</span></h1>
      </div>
      <div className="ten columns flex-container">
        <div className="flexslider">
          <ul className="slides">
            <li>
              <blockquote>
                <p>Your work is going to fill a large part of your life, and the only way to be truly satisfied is
                  to do what you believe is great work. And the only way to do great work is to love what you do.
                  If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
                </p>
                <cite>Steve Jobs</cite>
              </blockquote>
            </li> {/* slide ends */}
            <li>
              <blockquote>
                <p>This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                  Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem
                  nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
                </p>
                <cite>Mr. Adobe</cite>
              </blockquote>
            </li> {/* slide ends */}
          </ul>
        </div> {/* div.flexslider ends */}
      </div> {/* div.flex-container ends */}
    </div> {/* row ends */}
  </div>  {/* text-container ends */}
</section>


      </React.Fragment>
    );
  }
}