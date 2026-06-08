import React from "react";
import { Link } from "react-router-dom";

export const ContactUs = () => {
  return (
    <>
      {/* START SECTION TOP */}
      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div
              className="section-top-title wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
            >
              <h1>Get In Touch</h1>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li> / Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* START ADDRESS */}
      <section className="address_area section-padding">
        <div className="container">
          <div className="row text-center">

            {/* LOCATION */}
            <div className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp">
              <div className="single_address sa_one">
                <i className="ti-map"></i>
                <h4>Our Location</h4>
                <p>
                  Wakefield <br />
                  England, UK
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp">
              <div className="single_address sa_two">
                <i className="ti-mobile"></i>
                <h4>Telephone</h4>
                <p>07775964018</p>
               
              </div>
            </div>

            {/* EMAIL */}
            <div className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp">
              <div className="single_address sa_three">
                <i className="ti-email"></i>
                <h4>Send email</h4>
                <p>yusratuitionlab@gmail.com</p>
                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <div id="contact" className="contact_area section-padding">
        <div className="container">
          <div className="row">

            {/* FORM */}
            <div className="col-lg-7 col-sm-12 col-xs-12 wow fadeInUp">
              <div className="contact">

                <form className="form">
                  <div className="row">

                    <div className="form-group col-md-6">
                      <label>Name</label>
                      <input type="text" className="form-control" required />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Your Email</label>
                      <input type="email" className="form-control" required />
                    </div>

                    <div className="form-group col-md-12">
                      <label>Your Subject</label>
                      <input type="text" className="form-control" required />
                    </div>

                    <div className="form-group col-md-12">
                      <label>Your Message</label>
                      <textarea
                        rows="6"
                        className="form-control"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn_one">
                        Send Message
                      </button>
                    </div>

                  </div>
                </form>

              </div>
            </div>

          
          

          </div>
        </div>
      </div>
    </>
  );
};