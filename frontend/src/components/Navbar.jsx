import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutSession } from "../utils/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [user, setUser] = useState(null);
  // application modal removed; use /apply page instead

  const toggleSubmenu = (id, e) => {
    if (!mobileOpen) return;
    e.preventDefault();
    setOpenSubmenu(prev => (prev === id ? null : id));
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  };

  const handleLogout = async () => {
    await logoutSession();
    setUser(null);
    navigate("/");
    closeMobileMenu();
  };

  const handleJoinUs = () => {
    navigate('/apply');
  };

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    const onUserChanged = () => {
      const su = localStorage.getItem('user');
      if (su) setUser(JSON.parse(su)); else setUser(null);
    };
    window.addEventListener('userChanged', onUserChanged);
    window.addEventListener('storage', onUserChanged);
    return () => {
      window.removeEventListener('userChanged', onUserChanged);
      window.removeEventListener('storage', onUserChanged);
    };

    // hide preloader if it remains present (template used JS which we don't include)
    const p = document.querySelector('.preloaders');
    if (p) p.style.display = 'none';
  }, []);

  return (
    <>
      

      {/* START NAVBAR */}
      <div
        id="navigation"
        className="navbar-light bg-faded site-navigation"
      >
        <div className="container-fluid">
          <div className="row">

            {/* LOGO */}
            <div className="col-20 align-self-center">
                <div className="site-logo">
                <Link to="/">
                  <img
                    src="/assets/img/ytcLogo-Photoroom.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>

            {/* MENU */}
            <div className="col-60 d-flex">
              <nav id="main-menu">
                <ul>

                  {/* HOME */}
                  <li>
                    <a href="/">Home</a>

                  
                  </li>

                  {/* ABOUT */}
                  <li>
                    <Link to="/about">About</Link>
                  </li>

                  {/* COURSE */}
                  <li className={` ${openSubmenu === 'course' ? 'open' : ''}`}>
                    <Link to="/course" onClick={(e) => toggleSubmenu('course', e)}>
                      Course
                    </Link>

                  
                  </li>

                  {/* PAGES */}
                  <li className={`menu-item-has-children ${openSubmenu === 'pages' ? 'open' : ''}`}>
                    <a href="#" onClick={(e) => toggleSubmenu('pages', e)}>
                      Pages
                    </a>

                    <ul className="sub-menu">
                      <li>
                        <Link to="/instructor">
                          Tutor
                        </Link>
                      </li>

                    


                      <li>
                        <Link to="/faq">
                          Faq Page
                        </Link>
                      </li>

                    
                    </ul>
                  </li>


                  {/* CONTACT */}
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>

                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/apply'); }}>
                      Join Us
                    </a>
                  </li>

                </ul>
              </nav>
            </div>

            {/* BUTTONS */}
            <div className="col-20 d-none d-xl-block text-end align-self-center">
              {user ? (
                <div className="user-auth">
                  <span className="user-info">
                    {user.role === "tutor" ? "👨‍🏫" : user.role === "admin" ? "⚙️" : "👤"} {user.email}
                  </span>
                  <Link
                    to={user.role === "tutor" ? "/tutor-dashboard" : user.role === "admin" ? "/admin-dashboard" : "/dashboard"}
                    className="header-btn"
                  >
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn_one">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="header-btn">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn_one">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <div className="col-20 d-flex align-items-center justify-content-end d-xl-none">
              <button
                type="button"
                className="mobile-toggle"
                onClick={() => setMobileOpen(prev => !prev)}
                aria-label="Open navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            {/* MOBILE MENU */}
            <ul className={`mobile_menu ${mobileOpen ? 'active' : ''}`}>

                  <li className={`${openSubmenu === 'home' ? 'open' : ''}`}>
                <Link to="/"  onClick={closeMobileMenu}>
                  Home
                </Link>

              
              </li>

              <li>
                <Link to="/about" onClick={closeMobileMenu}>About</Link>
              </li>

          

              
                  <li>
                    <Link to="/course" onClick={closeMobileMenu}>
                      Course
                    </Link>
                  </li>

                
              
             

              <li className={`menu-item-has-children ${openSubmenu === 'pages' ? 'open' : ''}`}>
                <a href="#" onClick={(e) => toggleSubmenu('pages', e)} >
                  Pages
                </a>

                <ul className="sub-menu" >
                  <li>
                    <Link to="/instructor" onClick={closeMobileMenu}>
                      Instructor
                    </Link>
                  </li>

               

                

                  <li>
                    <Link to="/faq" onClick={closeMobileMenu}>
                      Faq Page
                    </Link>
                  </li>

                
                </ul>
              </li>

              

              <li>
                <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
              </li>

              {user ? (
                <>
                  <li className="mobile-auth-separator">
                    <span className="user-info-mobile">
                      {user.role === "tutor" ? "👨‍🏫" : "⚙️"} {user.email}
                    </span>
                  </li>
                  <li>
                    <Link 
                      to={user.role === "tutor" ? "/tutor-dashboard" : "/admin-dashboard"}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "8px 0", color: "inherit" }}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { closeMobileMenu(); navigate('/apply'); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', color: 'inherit' }}>
                      Join Us
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin" onClick={closeMobileMenu}>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={closeMobileMenu}>
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/apply" onClick={closeMobileMenu}>
                      Join Us
                    </Link>
                  </li>
                </>
              )}

            </ul>

          </div>
        </div>
      </div>
      {/* END NAVBAR */}
      
    </>
  );
};

