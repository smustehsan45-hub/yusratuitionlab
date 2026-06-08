import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutSession } from "../utils/auth";
import "../styles/Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminStats, setAdminStats] = useState({
    totalStudents: 0,
    totalTutors: 0,
    totalCourses: 0,
    totalBatches: 0,
    totalAnnouncements: 0,
    totalRevenue: 0,
  });
  const [allStudents, setAllStudents] = useState([]);
  const [allTutors, setAllTutors] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await logoutSession();
    navigate("/");
  };

  const fetchAdminData = async () => {
    try {
      const [statsRes, tutorsRes, studentsRes] = await Promise.all([
        fetch(`${API_URL}/admin/dashboard`, { credentials: "include" }),
        fetch(`${API_URL}/admin/tutors`, { credentials: "include" }),
        fetch(`${API_URL}/admin/students`, { credentials: "include" }),
        fetch(`${API_URL}/admin/applications`, { credentials: "include" }),
      ]);

      if (!statsRes.ok || !tutorsRes.ok || !studentsRes.ok) {
        navigate("/signin");
        return;
      }

      const [statsData, tutorsData, studentsData, appsData] = await Promise.all([
        statsRes.json(),
        tutorsRes.json(),
        studentsRes.json(),
        // apps may or may not be ok; handle later
        (await fetch(`${API_URL}/admin/applications`, { credentials: "include" })).json(),
      ]);

      setAdminStats({
        totalStudents: statsData.data.totalStudents,
        totalTutors: statsData.data.totalTutors,
        totalCourses: statsData.data.totalCourses,
        totalBatches: statsData.data.totalBatches,
        totalAnnouncements: statsData.data.totalAnnouncements,
        totalRevenue: `$${statsData.data.totalRevenue.toLocaleString()}`,
      });
      setRecentActivity(statsData.data.recentActivity || []);

      setAllTutors(
        tutorsData.data.map((tutor) => ({
          id: tutor._id,
          name: tutor.name,
          email: tutor.email,
          courses: tutor.courses?.length || 0,
          students: tutor.students?.length || 0,
          rating: 4.8,
          joinDate: new Date(tutor.createdAt).toLocaleDateString(),
          status: tutor.status === "suspended" ? "Suspended" : "Active",
          earnings: "$0",
        }))
      );

      setAllStudents(
        studentsData.data.map((student) => ({
          id: student._id,
          name: student.name,
          email: student.email,
          enrolledCourses: student.enrolledCourses?.length || 0,
          feeEndDate: student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : "-",
          status: student.status === "inactive" ? "Inactive" : student.status === "suspended" ? "Suspended" : "Active",
          joinDate: new Date(student.createdAt).toLocaleDateString(),
          totalPaid: `$${student.feePaid.toFixed(2)}`,
          feeSettled: student.feeSettled || false,
        }))
      );

      setEnrollments(
        studentsData.data.slice(0, 5).map((student, index) => ({
          id: index + 1,
          studentName: student.name,
          tutorName: student.tutor?.name || "Unassigned",
          courseName: student.enrolledCourses?.[0]?.title || "N/A",
          enrollDate: new Date(student.createdAt).toLocaleDateString(),
          progress: 50,
          status: student.status === "active" ? "In Progress" : "Inactive",
        }))
      );
      setApplications(appsData?.data || []);
    } catch (fetchError) {
      setError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const getDaysUntilExpiry = (feeEndDate) => {
    const today = new Date();
    const expiry = new Date(feeEndDate);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getExpiryStatus = (days) => {
    if (days <= 0) return "Expired";
    if (days <= 7) return "Expiring Soon";
    return "Active";
  };

  const formatRelativeTime = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
    return new Date(dateString).toLocaleString();
  };

  const getActivityIcon = (type) => {
    if (type === "login") return "🔐";
    if (type === "logout") return "🚪";
    if (type === "application") return "📝";
    return "•";
  };

  const approveApplication = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/applications/${id}/approve`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || 'Failed to approve');
      alert('Application approved. Temporary password: ' + (data.data?.tempPassword || 'sent to user'));
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert('Error approving application');
    }
  };

  const rejectApplication = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/applications/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || 'Failed to reject');
      alert('Application rejected');
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert('Error rejecting application');
    }
  };

  const deleteStudent = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_URL}/admin/students/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to delete student");
      setSelectedStudent(null);
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert("Error deleting student");
    }
  };

  const deleteTutor = async (id, name) => {
    if (!window.confirm(`Delete tutor "${name}"? Their courses and related data will be removed. This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_URL}/admin/tutors/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to delete tutor");
      setSelectedTutor(null);
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert("Error deleting tutor");
    }
  };

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
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
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`nav-item ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            👨‍🎓 Students
          </button>
          <button
            className={`nav-item ${activeTab === "tutors" ? "active" : ""}`}
            onClick={() => setActiveTab("tutors")}
          >
            👨‍🏫 Tutors
          </button>
          <button
            className={`nav-item ${activeTab === "enrollments" ? "active" : ""}`}
            onClick={() => setActiveTab("enrollments")}
          >
            📚 Enrollments
          </button>
          <button
            className={`nav-item ${activeTab === "fees" ? "active" : ""}`}
            onClick={() => setActiveTab("fees")}
          >
            💳 Fee Tracking
          </button>
          <button
            className={`nav-item ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            📝 Applications
          </button>
          <button className="nav-item nav-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </div>


      <div className="dashboard-main">
        <div className="mobile-sidebar-toggle">
          <button 
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            title="Open sidebar"
          >
            ☰ Menu
          </button>
        </div>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="tab-content">
            <h1>Dashboard Overview</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Students</h3>
                <p className="stat-number">{adminStats.totalStudents}</p>
                <span className="stat-change">↑ 12% this month</span>
              </div>
              <div className="stat-card">
                <h3>Active Tutors</h3>
                <p className="stat-number">{adminStats.totalTutors}</p>
                <span className="stat-change">↑ 3% this month</span>
              </div>
              <div className="stat-card">
                <h3>Total Courses</h3>
                <p className="stat-number">{adminStats.totalCourses}</p>
                <span className="stat-change">↑ 15% this month</span>
              </div>
           
            </div>

            <div className="overview-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.length === 0 ? (
                  <p className="activity-empty">No recent activity yet. Logins and Join Us applications will appear here.</p>
                ) : (
                  recentActivity.map((item, index) => (
                    <div
                      key={`${item.type}-${item.email}-${item.createdAt}-${index}`}
                      className="activity-item"
                    >
                      <span className="activity-icon">{getActivityIcon(item.type)}</span>
                      <div className="activity-info">
                        <p>{item.message}</p>
                        <span className="activity-time">{formatRelativeTime(item.createdAt)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="tab-content">
            <h1>Manage Students</h1>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Courses</th>
                    {/* <th>Fee End Date</th>
                    <th>Total Paid</th> */}
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="name-cell">{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.enrolledCourses}</td>
                      {/* <td> */}
                        {/* <div className="fee-date">
                          {student.feeEndDate}
                          <br />
                          <span
                            className={`expiry-badge ${getExpiryStatus(
                              getDaysUntilExpiry(student.feeEndDate)
                            ).toLowerCase()}`}
                          >
                            {getExpiryStatus(getDaysUntilExpiry(student.feeEndDate))}
                          </span>
                        </div> */}
                      {/* </td> */}
                      {/* <td>{student.totalPaid}</td> */}
                      <td>
                        <span className={`badge ${student.status.toLowerCase()}`}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-xs btn-info"
                            onClick={() => setSelectedStudent(student)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-xs btn-danger"
                            onClick={() => deleteStudent(student.id, student.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedStudent && (
              <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h2>{selectedStudent.name}</h2>
                  <div className="student-details">
                    <p>
                      <strong>Email:</strong> {selectedStudent.email}
                    </p>
                    <p>
                      <strong>Join Date:</strong> {selectedStudent.joinDate}
                    </p>
                    <p>
                      <strong>Enrolled Courses:</strong> {selectedStudent.enrolledCourses}
                    </p>
                    <p>
                      <strong>Fee End Date:</strong> {selectedStudent.feeEndDate}
                    </p>
                    <p>
                      <strong>Total Paid:</strong> {selectedStudent.totalPaid}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`badge ${selectedStudent.status.toLowerCase()}`}>
                        {selectedStudent.status}
                      </span>
                    </p>
                  </div>
                  <div className="modal-actions">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(selectedStudent.id, selectedStudent.name)}
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary" onClick={() => setSelectedStudent(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tutors Tab */}
        {activeTab === "tutors" && (
          <div className="tab-content">
            <h1>Manage Tutors</h1>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Courses</th>
                    <th>Students</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allTutors.map((tutor) => (
                    <tr key={tutor.id}>
                      <td className="name-cell">{tutor.name}</td>
                      <td>{tutor.email}</td>
                      <td>{tutor.courses}</td>
                      <td>{tutor.students}</td>
                      <td>⭐ {tutor.rating}</td>
                      {/* <td>{tutor.earnings}</td> */}
                      <td>
                        <span className={`badge ${tutor.status.toLowerCase()}`}>
                          {tutor.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-xs btn-info"
                            onClick={() => setSelectedTutor(tutor)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-xs btn-danger"
                            onClick={() => deleteTutor(tutor.id, tutor.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedTutor && (
              <div className="modal-overlay" onClick={() => setSelectedTutor(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h2>{selectedTutor.name}</h2>
                  <div className="tutor-details">
                    <p>
                      <strong>Email:</strong> {selectedTutor.email}
                    </p>
                    <p>
                      <strong>Join Date:</strong> {selectedTutor.joinDate}
                    </p>
                    <p>
                      <strong>Courses:</strong> {selectedTutor.courses}
                    </p>
                    <p>
                      <strong>Students:</strong> {selectedTutor.students}
                    </p>
                    <p>
                      <strong>Rating:</strong> ⭐ {selectedTutor.rating}
                    </p>
                    <p>
                      <strong>Total Earnings:</strong> {selectedTutor.earnings}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`badge ${selectedTutor.status.toLowerCase()}`}>
                        {selectedTutor.status}
                      </span>
                    </p>
                  </div>
                  <div className="modal-actions">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTutor(selectedTutor.id, selectedTutor.name)}
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary" onClick={() => setSelectedTutor(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === "enrollments" && (
          <div className="tab-content">
            <h1>Course Enrollments</h1>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Tutor</th>
                    <th>Course</th>
                    <th>Enroll Date</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td className="name-cell">{enrollment.studentName}</td>
                      <td>{enrollment.tutorName}</td>
                      <td>{enrollment.courseName}</td>
                      <td>{enrollment.enrollDate}</td>
                      <td>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{enrollment.progress}%</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${enrollment.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="tab-content">
            <h1>Pending Applications</h1>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone || '-'}</td>
                      <td>{app.roleRequested}</td>
                      <td>{new Date(app.createdAt).toLocaleString()}</td>
                      <td>{app.status}</td>
                      <td>
                        {app.status === 'pending' && (
                          <>
                            <button className="btn btn-xs btn-success" onClick={() => approveApplication(app._id)}>Approve</button>
                            <button className="btn btn-xs btn-danger" onClick={() => rejectApplication(app._id)} style={{ marginLeft: 8 }}>Reject</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fee Tracking Tab */}
        {activeTab === "fees" && (
          <div className="tab-content">
            <h1>Fee Tracking</h1>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allStudents.map((student) => {
                    const paid = student.feeSettled === true;
                    return (
                      <tr key={student.id}>
                        <td className="name-cell">{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={paid}
                            onChange={async (e) => {
                              const newVal = e.target.checked;
                              try {
                                const res = await fetch(`${API_URL}/admin/students/${student.id}`, {
                                  method: "PUT",
                                  credentials: "include",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ feeSettled: newVal }),
                                });
                                const data = await res.json();
                                if (!res.ok) throw new Error(data.message || "Failed to update");
                                fetchAdminData();
                              } catch (err) {
                                console.error(err);
                                alert("Unable to update fee status");
                              }
                            }}
                          />
                        </td>
                        <td>
                          <span className={`badge ${paid ? "paid" : "pending"}`}>
                            {paid ? "Paid" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
