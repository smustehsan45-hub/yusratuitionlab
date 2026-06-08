import React from "react";
import { Link } from "react-router-dom";

export const Courses = () => {
  return (
    <>
      {/* START COURSE */}
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
              <h1>All Course</h1>

              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li> / Course</li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home_course section-padding">
        <div className="container">
          <div className="row">

            {/* COURSE 1 */}
            <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="single_course">

                <div className="single_c_img">
                  <img
                    src="/assets/img/course/1.png"
                    className="img-fluid"
                    alt="course"
                  />
                  <span>English</span>
                </div>

                <div>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>

                <h4>
                  <Link to="/course">
                    Improve reading, writing, grammar, and communication skills
                  </Link>
                </h4>

        

              </div>
            </div>

            {/* COURSE 2 */}
            <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="single_course">

                <div className="single_c_img">
                  <img
                    src="/assets/img/course/2.png"
                    className="img-fluid"
                    alt="course"
                  />
                  <span>Math</span>
                </div>

                <div>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>

                <h4>
                  <Link to="/course">
                    Build strong problem-solving and mathematical thinking skills
                  </Link>
                </h4>

               

              </div>
            </div>

            {/* COURSE 3 */}
            <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="single_course">

                <div className="single_c_img">
                  <img
                    src="/assets/img/course/3.png"
                    className="img-fluid"
                    alt="course"
                  />
                  <span>Science</span>
                </div>

                <div>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>

                <h4>
                  <Link to="/course">
                   Explore scientific concepts through clear and engaging learning.
                  </Link>
                </h4>

           

              </div>
            </div>

            {/* COURSE 4 */}
            <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="single_course">

                <div className="single_c_img">
                  <img
                    src="/assets/img/course/4.png"
                    className="img-fluid"
                    alt="course"
                  />
                  <span>Primary Level</span>
                </div>

                <div>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>

                <h4>
                  <Link to="/course">
                   Strong foundation courses designed for young learners
                  </Link>
                </h4>

            

              </div>
            </div>

            {/* COURSE 5 */}
            <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="single_course">

                <div className="single_c_img">
                  <img
                    src="/assets/img/course/5.png"
                    className="img-fluid"
                    alt="course"
                  />
                  <span>Secondary Level</span>
                </div>

                <div>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>

                <h4>
                  <Link to="/course">
                    Comprehensive support to help students excel in exams.
                  </Link>
                </h4>

                

              </div>
            </div>

           

          </div>
        </div>
      </section>
      {/* END COURSE */}
    </>
  );
};

