import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      {/* START ABOUT US */}
      <section className="ab_area section-padding">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
            >
              <div className="ab_img">
                <img src="/assets/img/about1.png" className="img-fluid" alt="about" />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
              data-wow-offset="0"
            >
              <div className="ab_content">
                <h2>We Are Providing The Online Course In Global World</h2>

                <p>
                We offer a fresh and modern approach to basic learning, making education simple, effective, and engaging for every student.

                </p>

                

                <ul>
                  <li><span className="ti-check"></span> Get access to <b>multiple</b> courses</li>
                  <li><span className="ti-check"></span> Popular topics to learn</li>
                  <li><span className="ti-check"></span> Find the right tutor</li>
                </ul>

                <Link className="btn_one" to="/course">
                  View All Courses <i className="ti-arrow-top-right"></i>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* START VIDEO */}
      <section
        className="vid_area va2"
        style={{
          backgroundImage: "url(/assets/img/bg/video.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 vp_top wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
            >
              <div className="video-area2">
                <a
                  href="https://www.youtube.com/watch?v=RXv_uIN6e-Y"
                  className="magnific_popup video-button"
                >
                  <i className="fa fa-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


<br />
      {/* INSTRUCTOR + FREE COURSE */}
      <section className="insfreecourse section-padding">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-sm-12 col-xs-12">
              <div
                className="single_ins"
                style={{
                  backgroundImage: "url(/assets/img/ins1.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <div className="single_ins_content">
                  <h4>Build Your Career</h4>
                  <h1>Become a Tutor</h1>
                  <p>Learn at your own pace, move between multiple courses.</p>
                  <a className="btn_one" href="/apply">
                    Apply now <i className="ti-arrow-top-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 col-xs-12">
              <div
                className="single_ins"
                style={{
                  backgroundImage: "url(/assets/img/ins2.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <div className="single_ins_content">
                  <h4>Build Your Career</h4>
                  <h1>Get Free Courses</h1>
                  <p>Learn at your own pace, move between multiple courses.</p>
                  <a className="btn_one" href="/contact">
                    Contact now <i className="ti-arrow-top-right"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

     
    
    </>
  );
};

