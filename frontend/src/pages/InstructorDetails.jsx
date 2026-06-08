import React from "react";
import { Link } from "react-router-dom";

export const InstructorDetails = () => {
  return (
    <>
      {/* START SECTION TOP */}
      <section className="section-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <div
                className="section-top-title wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.3s"
                data-wow-offset="0"
              >
                <h1>Instructor Details</h1>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li> / instructor details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* START INSTRUCTOR PROFILE */}
      <section className="template_agent section-padding">
        <div className="container">
          <div className="row">

            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="single_agent">

                <div className="single_agent_image">
                  <img
                    src="/assets/img/team/team1.jpg"
                    className="img-fluid"
                    alt="instructor"
                  />
                </div>

                <div className="single_agent_content">
                  <h4>Khela hobe ahy hay</h4>
                  <h5>Science Instructor</h5>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                  </p>

                  <ul>
                    <li><i className="fa fa-envelope-o"></i> contact@gmail.com</li>
                    <li><i className="fa fa-phone"></i> (+123) 425 857 954 148</li>
                    <li><i className="fa fa-plane"></i> www.example.com</li>
                    <li><i className="fa fa-skype"></i> skype.myinfo88</li>
                  </ul>
                </div>

                <div className="agent_social">
                  <ul className="list-inline">
                    <li>
                      <a href="#">
                        <img src="/assets/img/fb.svg" alt="facebook" />
                      </a>
                    </li>

                    <li>
                      <a href="#">
                        <img src="/assets/img/pn.svg" alt="pinterest" />
                      </a>
                    </li>

                    <li>
                      <a href="#">
                        <img src="/assets/img/ins.svg" alt="instagram" />
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};