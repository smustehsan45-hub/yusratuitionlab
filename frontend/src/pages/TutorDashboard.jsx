import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutSession } from "../utils/auth";
import "../styles/Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "https://yusratuitionlab.onrender.com/api";

export const TutorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tutorProfile, setTutorProfile] = useState({
    name: "Tutor",
    email: "",
    phone: "",
    avatar: "👨‍🏫",
    joinDate: "",
    experience: "",
    specialization: "",
    rating: 0,
    bio: "",
    courses: 0,
  });
  const [tutorCourses, setTutorCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await logoutSession();
    navigate("/");
  };

  const fetchTutorData = async () => {
    try {
      const [profileRes, coursesRes] = await Promise.all([
        fetch(`${API_URL}/tutor/profile`, { credentials: "include" }),
        fetch(`${API_URL}/tutor/courses`, { credentials: "include" }),
      ]);

      if (!profileRes.ok || !coursesRes.ok) {
        navigate("/signin");
        return;
      }

      const [profileData, coursesData] = await Promise.all([
        profileRes.json(),
        coursesRes.json(),
      ]);

      const profile = profileData.data;
      setTutorProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "N/A",
        avatar: profile.name ? profile.name.charAt(0).toUpperCase() : "👨‍🏫",
        joinDate: new Date(profile.createdAt).toLocaleDateString(),
        experience: profile.experience || "Not provided",
        specialization: profile.specialization || "General",
        rating: 4.8,
        bio: profile.bio || "No profile bio available.",
        courses: profile.courses?.length || profile.teachingCourses?.length || 0,
      });

      const courses = coursesData.data?.length
        ? coursesData.data
        : (profile.teachingCourses || []).map((title) => ({ _id: title, title, students: [], status: "active" }));

      setTutorCourses(
        courses.map((course) => ({
          id: course._id,
          name: course.title,
          students: course.students?.length || 0,
          rating: 4.8,
          price: course.price ? `$${course.price}` : "$0",
          status: course.status || "Active",
        }))
      );
    } catch {
      setError("Unable to load tutor data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Tutor Panel</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            📊 Profile
          </button>
          <button
            className={`nav-item ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            📚 My Courses
          </button>
          <button className="nav-item nav-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        <div className="mobile-sidebar-toggle">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} title="Open sidebar">
            ☰ Menu
          </button>
        </div>

        {loading ? (
          <div className="tab-content">
            <h2>Loading your dashboard...</h2>
          </div>
        ) : error ? (
          <div className="tab-content error-message">{error}</div>
        ) : (
          <>
            {activeTab === "profile" && (
              <div className="tab-content">
                <h1>My Profile</h1>

                <div className="profile-header">
                  <div className="profile-avatar">{tutorProfile.avatar}</div>
                  <div className="profile-info">
                    <h2>{tutorProfile.name}</h2>
                    <p className="specialization">{tutorProfile.specialization}</p>
                    <div className="profile-stats">
                      <div className="stat">
                        <span className="stat-value">⭐ {tutorProfile.rating}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">📚 {tutorProfile.courses}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="detail-card">
                    <h3>Contact Information</h3>
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span className="value">{tutorProfile.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Phone:</span>
                      <span className="value">{tutorProfile.phone}</span>
                    </div>
                  </div>

                  <div className="detail-card">
                    <h3>About</h3>
                    <div className="detail-item">
                      <span className="label">Experience:</span>
                      <span className="value">{tutorProfile.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Member Since:</span>
                      <span className="value">{tutorProfile.joinDate}</span>
                    </div>
                    <div className="detail-item bio">
                      <span className="label">Bio:</span>
                      <p className="value">{tutorProfile.bio}</p>
                    </div>
                  </div>

                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="tab-content">
                <h1>My Courses</h1>
                {tutorCourses.length === 0 ? (
                  <p>No courses yet. Courses you select on the Join Us application will appear here after approval.</p>
                ) : (
                <div className="courses-grid">
                  {tutorCourses.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="course-header">
                        <h3>{course.name}</h3>
                        <span className={`status ${course.status.toLowerCase()}`}>{course.status}</span>
                      </div>
                  
                    
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
