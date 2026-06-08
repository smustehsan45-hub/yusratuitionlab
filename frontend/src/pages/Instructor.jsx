import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://yusratuitionlab.onrender.com/api";

export const Instructors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${API_URL}/tutor/public`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Unable to load tutors.");
        }
        setTutors(data.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load tutors.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const renderTutorCard = (tutor, index) => {
    const courseNames = tutor.teachingCourses?.length ? tutor.teachingCourses.join(", ") : "No courses listed";

    return (
      <div className="col-lg-3 col-sm-6 col-xs-12 wow fadeInUp" key={tutor._id || index}>
        <div className="our-team">
          <div className="team-content">
            <a href="#">
              <img src="/assets/img/tutors.png" alt="instructor" />
            </a>
            <ul className="social-links">
              <li><a href="#"><i className="fa-solid fa-x"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
            </ul>
          </div>

          <div className="team-prof">
            <h3>{tutor.name || "Tutor"}</h3>
            <span>{tutor.bio || "No bio available"}</span>
          </div>

          <div className="sth_det2">
            <span className="ti-file"><u>{courseNames}</u></span>
          </div>
        </div>
      </div>
    );
  };

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
              <h1>Our tutors</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li> / tutor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* START TEAM */}
      <section className="team_area section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h2>Meet our Tutors</h2>
            <p>
              We provide dedicated and experienced tutors who make learning simple, clear, and effective. Choose from a variety of subjects and start building strong skills with confidence.
            </p>
          </div>

          <div className="row">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading tutors...</p>
              </div>
            ) : error ? (
              <div className="col-12 text-center">
                <p>{error}</p>
              </div>
            ) : tutors.length === 0 ? (
              <div className="col-12 text-center">
                <p>No tutors found yet.</p>
              </div>
            ) : (
              tutors.map(renderTutorCard)
            )}
          </div>
        </div>
      </section>
    </>
  );
};
