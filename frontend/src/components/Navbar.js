import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // HIDE NAVBAR ON HOME PAGE
  if (location.pathname === "/") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* LOGO */}
          <Link
            to="/dashboard"
            style={styles.logo}
          >
            ✈️ TravelAI
          </Link>

          {/* MOBILE MENU BUTTON */}
          <div
            style={styles.menuIcon}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            ☰
          </div>

          {/* NAV LINKS */}
          <div
            style={{
              ...styles.navLinks,
              ...(menuOpen
                ? styles.mobileMenuOpen
                : {}),
            }}
          >
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  style={
                    location.pathname ===
                    "/dashboard"
                      ? {
                          ...styles.link,
                          ...styles.activeLink,
                        }
                      : styles.link
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Dashboard
                </Link>

                <Link
                  to="/upload"
                  style={
                    location.pathname ===
                    "/upload"
                      ? {
                          ...styles.link,
                          ...styles.activeLink,
                        }
                      : styles.link
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Upload
                </Link>

                <span style={styles.userName}>
                  👋 {user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  style={styles.logoutButton}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={styles.link}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  style={styles.registerButton}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  nav: {
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background:
      "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.2)",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  logo: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  link: {
    color: "#e2e8f0",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    transition: "0.3s",
    fontWeight: "500",
  },

  activeLink: {
    background:
      "linear-gradient(135deg,#00c6ff,#0072ff)",
    color: "#fff",
    boxShadow:
      "0 4px 14px rgba(0,114,255,0.3)",
  },

  registerButton: {
    textDecoration: "none",
    background:
      "linear-gradient(135deg,#00c6ff,#0072ff)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "12px",
    fontWeight: "600",
    transition: "0.3s",
  },

  logoutButton: {
    background:
      "linear-gradient(135deg,#ff416c,#ff4b2b)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },

  userName: {
    color: "#cbd5e1",
    fontWeight: "500",
    fontSize: "0.95rem",
  },

  menuIcon: {
    display: "none",
    color: "white",
    fontSize: "1.8rem",
    cursor: "pointer",
  },

  mobileMenuOpen: {
    display: "flex",
  },
};

// GLOBAL CSS
const styleSheet = document.createElement("style");

styleSheet.textContent = `
  *{
    box-sizing:border-box;
    margin:0;
    padding:0;
    font-family:'Poppins',sans-serif;
  }

  a:hover{
    opacity:0.92;
  }

  button:hover{
    transform:translateY(-2px);
    opacity:0.95;
  }

  @media(max-width:768px){

    nav div[style*="navLinks"]{
      position:absolute;
      top:80px;
      right:20px;
      flex-direction:column;
      background:rgba(15,23,42,0.95);
      backdrop-filter:blur(14px);
      padding:20px;
      border-radius:16px;
      width:220px;
      display:none;
      box-shadow:0 8px 30px rgba(0,0,0,0.3);
      border:1px solid rgba(255,255,255,0.08);
    }

    nav div[style*="menuIcon"]{
      display:block !important;
    }

    nav a,
    nav button{
      width:100%;
      text-align:center;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Navbar;