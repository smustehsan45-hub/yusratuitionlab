import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      {/* START HOME */}
      <section
        className="home_bg hb_height"
        style={{
          backgroundImage: "url(/assets/img/bg/home-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container">
          <div className="row">

            {/* LEFT TEXT */}
            <div className="col-lg-6 col-sm-12 col-xs-12">
              <div className="hero-text ht_top">
                <h1>
                  <span>Yusra Tuition Lab</span> <br /> Yes To Learning
                </h1>

                <p>
               Expert tutoring across a wide range of subjects and levels, with personalised support designed to build confidence, improve grades, and help every student succeed.
                </p>
              </div>

              <div className="home_sb">
                <form className="banner_subs">
                  <input
                    type="text"
                    className="form-control home_si"
                    placeholder="Search your course here"
                    required
                  />

                  <button type="button" className="subscribe__btn">
                    Search <i className="fa fa-paper-plane-o"></i>
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-lg-6 col-sm-12 col-xs-12">
              <div className="hero-text-img">
                <img
                  src="/assets/img/home-img2.png"
                  className="img-fluid"
                  alt="home"
                />

          
              </div>
            </div>

          </div>
        </div>
      </section>

   
      {/* START CATEGORY */}
<section
  className="top_cat__area section-padding"
  style={{
    backgroundImage: "url('/assets/img/bg/shape-1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}
>
  <div className="container">
    <div className="section-title text-center">
      <h2>Start your journey with us</h2>
      <p>
       Unlock your potential with expert tutoring tailored to every learning style and academic goal. From exam preparation to long-term confidence building, our experienced tutors are here to support every step of the journey.
      </p>
    </div>

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
            Expert <br /> Tutor
          </h3>
          <p>
           Learn from experienced professionals dedicated to helping every student grow with confidence, skill, and personalised guidance.
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
            We provide high-quality learning experiences designed to build strong foundations, practical knowledge, and lasting success.
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
           Access flexible online classes and resources from anywhere, making learning convenient without compromising on quality.

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
            Accessible <br /> and Affordable
          </h3>
          <p>
            We offer affordable workshops, courses, and learning opportunities designed to make professional education accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* END CATEGORY */}
{/* START CATEGORY */}
<section
  className="top_cat__area section-padding"
  style={{
    backgroundImage: "url('/assets/img/bg/section-2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}
>
  <div className="container">
    <div className="section-title text-center">
      <h2>Popular Subjects</h2>
      <p>
        We offer a range of subjects at different levels. If the subject/level you require is not listed below, please click 'Other' for more information.
      </p>
    </div>

    <div className="row">
      <div
        className="col-lg-12 col-sm-12 col-xs-12 wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay="0.1s"
        data-wow-offset="0"
      >
        <div className="cat_list">
          <ul>
            <li>
              <a href="#"  onClick={(e) => {
    e.preventDefault();
    alert("Click on 'Other' for more information on subjects and levels not listed here.");
  }} >
                <img src="/assets/img/e1.png" alt="category-image" /> 
                
                English
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => {
    e.preventDefault();
    alert("Click on 'Other' for more information on subjects and levels not listed here.");
  }}>
                <img src="/assets/img/e2.png" alt="category-image" /> Math
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => {
    e.preventDefault();
    alert("Click on 'Other' for more information on subjects and levels not listed here.");
  }}>
                <img src="/assets/img/e3.png" alt="category-image" /> Science
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => {
    e.preventDefault();
    alert("Click on 'Other' for more information on subjects and levels not listed here.");
  }}>
                <img src="/assets/img/e4.png" alt="category-image" /> Primary Level
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => {
    e.preventDefault();
    alert("Click on 'Other' for more information on subjects and levels not listed here.");
  }}>
                <img src="/assets/img/e5.png" alt="category-image" /> Secondary Level
              </a>
            </li>
          </ul>
        </div>
       <Link
    to="/course"
    style={{
      background: "linear-gradient(135deg, #0d6efd, #4dabf7)",
      color: "#fff",
      padding: "12px 26px",
      borderRadius: "50px",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "600",
      display: "inline-block",
      boxShadow: "0 6px 15px rgba(13, 110, 253, 0.25)",
      transition: "all 0.3s ease",
      marginLeft: "45%",
    }}
    onMouseOver={(e) => {
      e.target.style.transform = "translateY(-3px)";
      e.target.style.boxShadow = "0 10px 20px rgba(13, 110, 253, 0.35)";
    }}
    onMouseOut={(e) => {
      e.target.style.transform = "translateY(0px)";
      e.target.style.boxShadow = "0 6px 15px rgba(13, 110, 253, 0.25)";
    }}
  >
    Other
  </Link>
      </div>
    </div>
  </div>

</section>

{/* END CATEGORY */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  }}
>
  <Link
    to="/course"
    style={{
      background: "linear-gradient(135deg, #0d6efd, #4dabf7)",
      color: "#fff",
      padding: "12px 26px",
      borderRadius: "50px",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "600",
      display: "inline-block",
      boxShadow: "0 6px 15px rgba(13, 110, 253, 0.25)",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.target.style.transform = "translateY(-3px)";
      e.target.style.boxShadow = "0 10px 20px rgba(13, 110, 253, 0.35)";
    }}
    onMouseOut={(e) => {
      e.target.style.transform = "translateY(0px)";
      e.target.style.boxShadow = "0 6px 15px rgba(13, 110, 253, 0.25)";
    }}
  >
    View Courses
  </Link>

  <Link
    to="/instructor"
    style={{
      background: "transparent",
      color: "#0d6efd",
      padding: "12px 26px",
      borderRadius: "50px",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "600",
      border: "2px solid #0d6efd",
      display: "inline-block",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.target.style.background = "#0d6efd";
      e.target.style.color = "#fff";
      e.target.style.transform = "translateY(-3px)";
    }}
    onMouseOut={(e) => {
      e.target.style.background = "transparent";
      e.target.style.color = "#0d6efd";
      e.target.style.transform = "translateY(0px)";
    }}
  >
    Visit our Instructors
  </Link>
</div>
    </>
  );
};

