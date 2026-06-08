import React from "react";

export const Category = () => {
  return (
    <>
      {/* START CATEGORY */}
      <section
        className="top_cat__area section-padding"
        style={{
          backgroundImage: "url(/assets/img/bg/shape-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container">

          {/* SECTION TITLE */}
          <div className="section-title text-center">
            <h2>Start your journey With us</h2>

            <p>
              We offer a brand new approach to the most basic learning paradigms.
              Choose from a wide range of learning options and gain new skills!
              Our school is know.
            </p>
          </div>

          {/* CARDS */}
          <div className="row">

            <div
              className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
            >
              <div className="single_tp">
                <span className="sc_one">01</span>

                <h3>
                  Expert <br /> Teacher
                </h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur notted adipisicing elit
                  ut labore.
                </p>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
            >
              <div className="single_tp">
                <span className="sc_two">02</span>

                <h3>
                  Quality <br /> Education
                </h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur notted adipisicing elit
                  ut labore.
                </p>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
              data-wow-offset="0"
            >
              <div className="single_tp">
                <span className="sc_three">03</span>

                <h3>
                  Remote <br /> Learning
                </h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur notted adipisicing elit
                  ut labore.
                </p>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
              data-wow-offset="0"
            >
              <div className="single_tp">
                <span className="sc_four">04</span>

                <h3>
                  Life Time <br /> Support
                </h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur notted adipisicing elit
                  ut labore.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* END CATEGORY */}
    </>
  );
};

