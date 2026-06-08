import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signin?next=/dashboard");
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Failed to parse user data:", error);
      navigate("/signin?next=/dashboard");
    }
  }, []);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="tab-content">
          <h2>Loading your profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="tab-content">
          <h1>My Profile</h1>
          <div className="profile-details">
            <div className="detail-card">
              <h3>User Information</h3>
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{user.name || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{user.email || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Role:</span>
                <span className="value">{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "None"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
