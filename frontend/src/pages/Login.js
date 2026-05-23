import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // EMAIL VALIDATION
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // EMAIL CHECK
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // PASSWORD CHECK
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          {/* LOGO */}
          <div style={styles.logo}>✈️</div>

          {/* TITLE */}
          <h2 style={styles.title}>
            Welcome Back
          </h2>

          <p style={styles.subtitle}>
            Login to continue your travel journey
          </p>

          {/* ERROR */}
          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={styles.input}
                required
              />
            </div>

            {/* PASSWORD */}
            <div style={styles.passwordWrapper}>
              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={styles.passwordInput}
                required
              />

              <button
                type="button"
                style={styles.eyeButton}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={styles.button}
            >
              Login →
            </button>
          </form>

          {/* REGISTER */}
          <p style={styles.linkText}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={styles.link}
            >
              Register
            </Link>
          </p>

          {/* BACK */}
          <Link to="/" style={styles.backHome}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    width: "100%",
    minHeight: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    padding: "40px 30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
    color: "white",
    animation: "fadeIn 0.7s ease",
  },

  logo: {
    fontSize: "3.2rem",
    textAlign: "center",
    marginBottom: "10px",
  },

  title: {
    textAlign: "center",
    fontSize: "2.1rem",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.9,
    marginBottom: "28px",
    lineHeight: "1.5",
    fontSize: "0.95rem",
  },

  inputGroup: {
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.3)",
    outline: "none",
    background: "rgba(255,255,255,0.22)",
    color: "#ffffff",
    caretColor: "#ffffff",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "0.3s",
  },

  passwordWrapper: {
    position: "relative",
    marginBottom: "22px",
    width: "100%",
  },

  passwordInput: {
    width: "100%",
    padding: "15px 52px 15px 15px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.3)",
    outline: "none",
    background: "rgba(255,255,255,0.22)",
    color: "#ffffff",
    caretColor: "#ffffff",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "0.3s",
  },

  eyeButton: {
    position: "absolute",
    top: "50%",
    right: "16px",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#00c6ff,#0072ff)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow:
      "0 10px 25px rgba(0,114,255,0.4)",
  },

  error: {
    background: "rgba(255,0,0,0.18)",
    border: "1px solid rgba(255,0,0,0.3)",
    color: "#ffb3b3",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "0.95rem",
  },

  linkText: {
    textAlign: "center",
    marginTop: "22px",
    fontSize: "0.95rem",
    opacity: 0.95,
  },

  link: {
    color: "#00c6ff",
    textDecoration: "none",
    fontWeight: "600",
  },

  backHome: {
    display: "block",
    textAlign: "center",
    marginTop: "18px",
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};

// GLOBAL CSS
const styleSheet = document.createElement("style");

styleSheet.textContent = `
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
  }

  input::placeholder{
    color:rgba(255,255,255,0.85);
  }

  input:focus{
    border:1px solid #00c6ff;
    box-shadow:0 0 12px rgba(0,198,255,0.45);
  }

  button:hover{
    transform:translateY(-3px);
    opacity:0.96;
  }

  a:hover{
    opacity:0.9;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  @keyframes fadeIn{
    from{
      opacity:0;
      transform:translateY(20px);
    }

    to{
      opacity:1;
      transform:translateY(0);
    }
  }

  @media(max-width:768px){
    h2{
      font-size:1.7rem !important;
    }

    .card{
      padding:30px 22px !important;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Login;