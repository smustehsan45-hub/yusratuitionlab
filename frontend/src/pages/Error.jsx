import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
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
                <h1>Page Not Found</h1>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li> / 404</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* START 404 SECTION */}
      <section className="zero_area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-xs-12 text-center">
              <div className="error_page">

                <img
                  src="/assets/img/404.svg"
                  className="img-fluid"
                  alt="404 error"
                />

                <h2>Oops! Page not found</h2>

                <p>
                  Hmm. We’re having trouble finding that page. Try again later
                  or check your network connection.
                </p>

                <div className="home_btn">
                  <Link to="/" className="btn_one">
                    Back to Home
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};