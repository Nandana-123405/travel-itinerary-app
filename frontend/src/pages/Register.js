import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // FORM VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // NAME VALIDATION
    const nameRegex = /^[A-Z][a-zA-Z\s]{2,}$/;

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!nameRegex.test(name)) {
      newErrors.name =
        "Name must start with a capital letter and contain at least 3 letters";
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain 8 characters, 1 uppercase, 1 number & 1 special character";
    }

    // CONFIRM PASSWORD
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    if (!validateForm()) return;

    try {
      await register(name, email, password);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>

          <div style={styles.logo}>✈️</div>

          <h2 style={styles.title}>Create Account</h2>

          <p style={styles.subtitle}>
            Start planning your smart AI-powered trips
          </p>

          {errors.submit && (
            <div style={styles.error}>{errors.submit}</div>
          )}

          {success && (
            <div style={styles.success}>{success}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;

                  const formatted =
                    value.charAt(0).toUpperCase() +
                    value.slice(1);

                  setName(formatted);
                }}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {}),
                }}
              />

              {errors.name && (
                <span style={styles.errorText}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                }}
              />

              {errors.email && (
                <span style={styles.errorText}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div style={styles.inputGroup}>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    ...styles.passwordInput,
                    ...(errors.password ? styles.inputError : {}),
                  }}
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

              {errors.password && (
                <span style={styles.errorText}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div style={styles.inputGroup}>
              <div style={styles.passwordWrapper}>
                <input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  style={{
                    ...styles.passwordInput,
                    ...(errors.confirmPassword
                      ? styles.inputError
                      : {}),
                  }}
                />

                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <span style={styles.errorText}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit" style={styles.button}>
              Register →
            </button>
          </form>

          <p style={styles.linkText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
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
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    padding: "40px 30px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
    color: "white",
    animation: "fadeIn 0.8s ease",
  },

  backLink: {
    color: "#00c6ff",
    textDecoration: "none",
    fontSize: "0.9rem",
  },

  logo: {
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "10px",
    marginTop: "10px",
  },

  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "10px",
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "25px",
    opacity: 0.85,
    fontSize: "0.95rem",
  },

  inputGroup: {
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "1rem",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
  },

  passwordInput: {
    width: "100%",
    padding: "14px 50px 14px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "1rem",
  },

  eyeButton: {
    position: "absolute",
    right: "15px",
    top: "50%",
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

  inputError: {
    border: "1px solid #ff4d4f",
  },

  errorText: {
    display: "block",
    color: "#ffb3b3",
    fontSize: "0.8rem",
    marginTop: "6px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#00c6ff,#0072ff)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 8px 20px rgba(0,114,255,0.4)",
    marginTop: "10px",
  },

  error: {
    background: "rgba(255,0,0,0.15)",
    border: "1px solid rgba(255,0,0,0.3)",
    color: "#ffb3b3",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "0.95rem",
  },

  success: {
    background: "rgba(0,255,100,0.15)",
    border: "1px solid rgba(0,255,100,0.3)",
    color: "#b7ffcb",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "0.95rem",
  },

  linkText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "0.95rem",
    opacity: 0.9,
  },

  link: {
    color: "#00c6ff",
    textDecoration: "none",
    fontWeight: "600",
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

  input::placeholder{
    color:rgba(255,255,255,0.7);
  }

  button:hover{
    transform:translateY(-3px);
    opacity:0.95;
  }

  input:focus{
    border:1px solid #00c6ff;
    box-shadow:0 0 10px rgba(0,198,255,0.5);
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
`;

document.head.appendChild(styleSheet);

export default Register;