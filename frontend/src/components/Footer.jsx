import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      {/* START FOOTER */}
      <div className="footer section-padding">
        <div className="container">
          <div className="row">
            
            {/* LOGO & SOCIAL */}
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer ">
                <div className="site-logo">
                <Link to="/">
                  <img src="/assets/img/ytcLogo-Photoroom.png" alt="Logo" />
                </Link>
                </div>
                <p>
                 Follow us on social media to keep up to date with our latest offers, workshops, courses and more!
                </p>

                <div className="social_profile">
                  <ul>
                   <li>
  <a
    className="f_whatsapp"
    href="https://wa.me/447775964018"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-whatsapp"></i>
  </a>
</li>

                    <li>
                      <a className="f_twitter" href="https://www.facebook.com/share/1DowEyWvr3/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>

                    <li>
                      <a className="f_instagram" href="https://www.instagram.com/yusratuitionlab?igsh=MW42ZWV4bDAyczMwbw==" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>

                    <li>
                      <a className="f_linkedin" href="https://www.tiktok.com/@yusratuitionlab?_r=1&_t=ZS-96r9bFz9Sc4" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-tiktok"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

         

          

            {/* CONTACT */}
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Contact Info</h4>

                <div className="sf_contact">
                  <span className="ti-map"></span>

                
                </div>

                <div className="sf_contact">
                  <span className="ti-mobile"></span>

                  <p>07775964018</p>
                </div>

              

                <div className="sf_contact">
                  <span className="ti-email"></span>

                  <p>yusratuitionlab@gmail.com</p>
                </div>
              </div>
            </div>

         

          </div>
        </div>
      </div>
      {/* END FOOTER */}

      {/* START COPYRIGHT */}
      <div className="foot_copy">
        <div className="footer_copyright">
          <p>
            &copy; 2026. All Rights Reserved <br /> • Designed by{" "}
            <a
              href="https://www.linkedin.com/in/syed-mustehsan-88b351275"
              target="_blank"
              rel="noreferrer"
            >
              Syed Mustehsan
            </a>{" "}
            
          
          </p>
        </div>
      </div>
      {/* END COPYRIGHT */}
    </>
  );
};

