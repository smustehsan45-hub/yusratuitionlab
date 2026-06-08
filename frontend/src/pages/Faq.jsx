import React from "react";
import { Link } from "react-router-dom";

export const Faq = () => {
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
              <h1>Faq</h1>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li> / Faq</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* START FAQ */}
      <section className="faq_area section-padding">
        <div className="container">
          <div className="row justify-content-center">

            {/* FAQ ACCORDION */}
            <div className="col-lg-7 col-sm-12 col-xs-12">
              <div className="accordion" id="accordionExample">

                {/* ITEM 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      What classes do you offer?
                    </button>
                  </h2>

                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We offer English, Math, Science, Primary Level, and Secondary Level tuition.
                    </div>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Do you provide one-to-one tutoring?
                    </button>
                  </h2>

                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes, we offer both one-to-one and group classes depending on student needs.
                    </div>
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Are classes online or physical?
                    </button>
                  </h2>

                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We provide both online and in-person classes for flexible learning.
                    </div>
                  </div>
                </div>

                {/* ITEM 4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Who are your tutors?
                    </button>
                  </h2>

                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Our tutors are experienced, qualified, and dedicated to helping students improve.
                    </div>
                  </div>
                </div>

                {/* ITEM 5 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Do you help with school exams?
                    </button>
                  </h2>

                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes, we focus on exam preparation, homework help, and concept building.
                    </div>
                  </div>
                </div>

                {/* ITEM 6 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      What age groups do you teach?
                    </button>
                  </h2>

                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We teach students from primary level up to secondary school.
                    </div>
                  </div>
                </div>

                {/* ITEM 7 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSeven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      How can I enroll?
                    </button>
                  </h2>

                  <div
                    id="collapseSeven"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can contact us directly via WhatsApp or visit our tuition center.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* IMAGE SIDE */}
            <div className="col-lg-5 col-sm-12 col-xs-12">
              <div className="faq_img">
                <img
                  src="/assets/img/faq.jpg"
                  alt="faq"
                  className="img-fluid"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};