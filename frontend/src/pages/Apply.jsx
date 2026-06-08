import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const API_URL = import.meta.env.VITE_API_URL || "https://yusratuitionlab.onrender.com/api";

const courseOptions = {
  tutor: ["English", "Math", "Science", "Primary Level", "Secondary Level"],
  student: ["English", "Math", "Science", "Primary Level", "Secondary Level"],
};

const courseIcons = {
  "English": "📘",
  "Math": "🔢 ",
  "Science": "🔬",
  "Primary Level": "🧒",
  "Secondary Level": "🎓",
};

export const Apply = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  const [form, setForm] = useState({
    roleRequested: "tutor",
    phone: "",
    message: "",
    experience: "",
    bio: "",
    selectedCourses: [],
  });

  const fetchApplicationStatus = async () => {
    setApplicationLoading(true);
    try {
      const res = await fetch(`${API_URL}/applications/me`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        setExistingApplication(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setApplicationLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      fetchApplicationStatus();
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "selectedCourses") {
      const course = value;
      setForm((prev) => {
        const selected = new Set(prev.selectedCourses);
        if (checked) selected.add(course);
        else selected.delete(course);
        return { ...prev, selectedCourses: Array.from(selected) };
      });
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setRole = (role) => {
    setForm((prev) => ({ ...prev, roleRequested: role, selectedCourses: [] }));
  };

  const toggleCourse = (course) => {
    setForm((prev) => {
      const selected = new Set(prev.selectedCourses);
      if (selected.has(course)) selected.delete(course);
      else selected.add(course);
      return { ...prev, selectedCourses: Array.from(selected) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setLoginError("Please log in before submitting an application.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: user.name || "",
        email: user.email,
        phone: form.phone,
        roleRequested: form.roleRequested,
        experience: form.experience,
        bio: form.bio,
        selectedCourses: form.selectedCourses,
        message: form.message,
      };
      const res = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to submit application");
        return;
      }
      alert("Application submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Unable to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const result = await response.json();
      if (!response.ok) {
        setLoginError(result.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));
      try {
        window.dispatchEvent(new Event("userChanged"));
      } catch {
        // ignore
      }
      setUser(result.user);
      await fetchApplicationStatus();
    } catch (err) {
      console.error(err);
      setLoginError("Unable to connect to the server.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-container apply-page">
        <div className="auth-card apply-card apply-card--centered">
          <div className="apply-loader">
            <span className="apply-loader-dot" />
            <span className="apply-loader-dot" />
            <span className="apply-loader-dot" />
          </div>
          <p className="apply-muted">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-container apply-page">
        <div className="auth-card apply-card apply-login-gate">
          <div className="apply-header">
            <span className="apply-badge">Join Us</span>
            <h2>Sign in to apply</h2>
            <p>Create your application after logging into your account.</p>
          </div>

          {loginError && <div className="error-message">{loginError}</div>}

          <form onSubmit={handleSignIn} className="auth-form">
            <div className="form-group">
              <label htmlFor="loginEmail">Email address</label>
              <input
                type="email"
                id="loginEmail"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn apply-submit-btn" disabled={loginLoading}>
              {loginLoading ? "Signing in..." : "Sign in & continue"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (applicationLoading) {
    return (
      <div className="auth-container apply-page">
        <div className="auth-card apply-card apply-card--centered">
          <div className="apply-loader">
            <span className="apply-loader-dot" />
            <span className="apply-loader-dot" />
            <span className="apply-loader-dot" />
          </div>
          <p className="apply-muted">Loading your application status...</p>
        </div>
      </div>
    );
  }

  if (existingApplication) {
    const statusClass = existingApplication.status?.toLowerCase() || "pending";
    return (
      <div className="auth-container apply-page">
        <div className="auth-card apply-card apply-status-card">
          <div className="apply-status-icon">✓</div>
          <h2>Application submitted</h2>
          <p className="apply-muted">We&apos;ve received your request and will review it soon.</p>
          <div className="apply-status-details">
            <div className="apply-status-row">
              <span>Status</span>
              <span className={`apply-status-pill ${statusClass}`}>{existingApplication.status}</span>
            </div>
            <div className="apply-status-row">
              <span>Role</span>
              <strong>{existingApplication.roleRequested}</strong>
            </div>
            {existingApplication.selectedCourses?.length > 0 && (
              <div className="apply-status-row">
                <span>Courses</span>
                <strong>{existingApplication.selectedCourses.join(", ")}</strong>
              </div>
            )}
          </div>
          <Link to="/" className="auth-btn apply-submit-btn apply-back-home">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container apply-page">
      <div className="auth-card apply-card">
        <div className="apply-header">
          <span className="apply-badge">Join Yusra Tuition Lab</span>
          <h2>Application form</h2>
          <p>Tell us how you&apos;d like to join — as a student or tutor.</p>
        </div>

        <div className="apply-user-chip">
          <span className="apply-user-avatar">{(user.name || user.email || "?").charAt(0).toUpperCase()}</span>
          <div>
            <strong>{user.name || "Applicant"}</strong>
            <span>{user.email}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <section className="apply-section">
            <h3 className="apply-section-title">
              <span className="apply-step">1</span>
              I want to apply as
            </h3>
            <div className="apply-role-toggle">
              <button
                type="button"
                className={`apply-role-option student ${form.roleRequested === "student" ? "active" : ""}`}
                onClick={() => setRole("student")}
              >
                <span className="apply-role-icon">🎓</span>
                <span className="apply-role-label">Student</span>
                <span className="apply-role-desc">Learn new skills</span>
              </button>
              <button
                type="button"
                className={`apply-role-option tutor ${form.roleRequested === "tutor" ? "active" : ""}`}
                onClick={() => setRole("tutor")}
              >
                <span className="apply-role-icon">👨‍🏫</span>
                <span className="apply-role-label">Tutor</span>
                <span className="apply-role-desc">Teach & mentor</span>
              </button>
            </div>
          </section>

          <section className="apply-section">
            <h3 className="apply-section-title">
              <span className="apply-step">2</span>
              Contact details
            </h3>
            <div className="apply-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
              />
            </div>
          </section>

          {form.roleRequested === "tutor" && (
            <section className="apply-section apply-section--highlight">
              <h3 className="apply-section-title">
                <span className="apply-step">3</span>
                Tutor profile
              </h3>
              <div className="apply-field">
                <label htmlFor="experience">Years of experience</label>
                <input
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5 years"
                />
              </div>
              <div className="apply-field">
                <label htmlFor="bio">Short bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your teaching background and expertise..."
                  rows={4}
                />
              </div>
            </section>
          )}

          <section className="apply-section">
            <h3 className="apply-section-title">
              <span className="apply-step">{form.roleRequested === "tutor" ? "4" : "3"}</span>
              {form.roleRequested === "tutor" ? "Courses you can teach" : "Courses you want to study"}
            </h3>
            <p className="apply-hint">Select one or more courses</p>
            <div className="apply-course-grid">
              {courseOptions[form.roleRequested].map((course) => {
                const selected = form.selectedCourses.includes(course);
                return (
                  <button
                    key={course}
                    type="button"
                    className={`apply-course-card ${selected ? "selected" : ""}`}
                    onClick={() => toggleCourse(course)}
                  >
                    <span className="apply-course-icon">{courseIcons[course]}</span>
                    <span className="apply-course-name">{course}</span>
                    <span className="apply-course-check">{selected ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="apply-section">
            <h3 className="apply-section-title">
              <span className="apply-step">{form.roleRequested === "tutor" ? "5" : "4"}</span>
              Additional message
            </h3>
            <div className="apply-field">
              <label htmlFor="message">Message (optional)</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Anything else you'd like us to know?"
                rows={3}
              />
            </div>
          </section>

          <button type="submit" className="auth-btn apply-submit-btn" disabled={submitting}>
            {submitting ? (
              <>
                <span className="apply-btn-spinner" />
                Submitting application...
              </>
            ) : (
              "Submit application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
