import React from "react";
import { Link } from "react-router-dom";

export const CourseDetails = () => {
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
              <h1>Course details</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li> / Course details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* START COURSE DETAILS */}
      <section className="our_event section-padding">
        <div className="container">
          <div className="row">

            {/* LEFT SIDE */}
            <div className="col-lg-8 col-sm-8 col-xs-12">
              <div className="single_event_single">

                <img
                  src="/assets/img/sc.png"
                  className="img-fluid"
                  alt="course"
                />

                <div className="single_event_text_single">
                  <h4>Professional Ceramic Moulding for Beginners</h4>

                  <span><i className="fa fa-calendar"></i> 10 Oct 2024</span>
                  <span><i className="fa fa-clock-o"></i> 7 days</span>
                  <span>
                    <i className="fa fa-table"></i>{" "}
                    <strong>30 Seats Available</strong>
                  </span>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                  </p>

                  <p>
                    It has survived not only five centuries, but also the leap into electronic typesetting...
                  </p>
                </div>
              </div>

             
             

           

             
              


            
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4 col-sm-4 col-xs-12">

              <div className="course_features">
                <h3>Course features</h3>
                <ul>
                  <li><i className="fa fa-calendar"></i> Course duration <b>10 days</b></li>
                  <li><i className="fa fa-user"></i> Total Lectures <b>30</b></li>
                  <li><i className="fa fa-user"></i> Total Students <b>1000</b></li>
                  <li><i className="fa fa-trophy"></i> Certification <b>YES</b></li>
                </ul>
              </div>

              <div className="event_info_price">
                <h4>Price - 60$</h4>
              </div>

              <div className="event_info_register">
                <a className="btn_one" href="#">
                  Register Today
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};