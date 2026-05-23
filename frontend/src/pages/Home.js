import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <div style={styles.heroContent}>
            <span style={styles.badge}>✨ AI Powered Travel Planning</span>

            <h1 style={styles.title}>
              Plan Smarter.
              <br />
              Travel Better. ✈️
            </h1>

            <p style={styles.subtitle}>
              Upload your travel bookings and let AI instantly generate a
              beautiful, smart, and personalized itinerary for your dream trip.
            </p>

            <div style={styles.buttonGroup}>
              <Link to="/login">
                <button style={styles.loginBtn}>Login</button>
              </Link>

              <Link to="/register">
                <button style={styles.registerBtn}>
                  Get Started Free →
                </button>
              </Link>
            </div>

            <div style={styles.heroStats}>
              <div>
                <h3>1000+</h3>
                <p>Trips Planned</p>
              </div>

              <div>
                <h3>500+</h3>
                <p>Happy Travelers</p>
              </div>

              <div>
                <h3>50+</h3>
                <p>Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>

        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.iconCircle}>📄</div>
            <h3 style={styles.featureTitle}>Upload Documents</h3>
            <p style={styles.featureText}>
              Upload flight tickets, hotel bookings, or travel documents in
              seconds.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.iconCircle}>🤖</div>
            <h3 style={styles.featureTitle}>AI Itinerary</h3>
            <p style={styles.featureText}>
              AI extracts details and creates a complete day-by-day travel plan.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.iconCircle}>🔗</div>
            <h3 style={styles.featureTitle}>Easy Sharing</h3>
            <p style={styles.featureText}>
              Share your itinerary with friends and family using a simple link.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>

        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepIcon}>📝</div>
            <h4>Create Account</h4>
            <p>Register or login to your account</p>
          </div>

          <div style={styles.stepLine}></div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepIcon}>📎</div>
            <h4>Upload Booking</h4>
            <p>Add flight tickets and hotel details</p>
          </div>

          <div style={styles.stepLine}></div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepIcon}>🤖</div>
            <h4>AI Generates</h4>
            <p>Smart itinerary generated instantly</p>
          </div>

          <div style={styles.stepLine}></div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>4</div>
            <div style={styles.stepIcon}>🎉</div>
            <h4>Enjoy Trip</h4>
            <p>Travel stress-free with AI planning</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>
          Ready for Your Next Adventure? 🌍
        </h2>

        <p style={styles.ctaText}>
          Experience AI-powered travel planning like never before.
        </p>

        <Link to="/register">
          <button style={styles.ctaButton}>Start Planning Now ✈️</button>
        </Link>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f5f7fb",
    overflowX: "hidden",
  },

  /* HERO */
  hero: {
    height: "100vh",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },

  overlay: {
    background:
      "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.45))",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },

  heroContent: {
    maxWidth: "900px",
    textAlign: "center",
    color: "white",
    animation: "fadeIn 1s ease",
  },

  badge: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "50px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    letterSpacing: "1px",
  },

  title: {
    fontSize: "4rem",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "1.5rem",
  },

  subtitle: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    opacity: 0.9,
    marginBottom: "2.5rem",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },

  loginBtn: {
    padding: "14px 32px",
    borderRadius: "50px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  registerBtn: {
    padding: "14px 32px",
    borderRadius: "50px",
    border: "none",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,114,255,0.4)",
    transition: "0.3s",
  },

  heroStats: {
    display: "flex",
    justifyContent: "center",
    gap: "3rem",
    flexWrap: "wrap",
    marginTop: "2rem",
  },

  /* FEATURES */
  featuresSection: {
    padding: "6rem 2rem",
    maxWidth: "1200px",
    margin: "auto",
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "3rem",
    color: "#1f2937",
    fontWeight: "700",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },

  featureCard: {
    background: "white",
    borderRadius: "24px",
    padding: "2.5rem 2rem",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    transition: "0.4s",
    cursor: "pointer",
  },

  iconCircle: {
    width: "80px",
    height: "80px",
    margin: "auto",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#00c6ff,#0072ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "white",
  },

  featureTitle: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
    color: "#111827",
  },

  featureText: {
    color: "#6b7280",
    lineHeight: "1.7",
  },

  /* HOW IT WORKS */
  howItWorks: {
    background: "white",
    padding: "6rem 2rem",
  },

  steps: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    maxWidth: "1200px",
    margin: "auto",
  },

  step: {
    width: "220px",
    textAlign: "center",
    padding: "1rem",
  },

  stepNumber: {
    width: "45px",
    height: "45px",
    margin: "auto",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#00c6ff,#0072ff)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginBottom: "1rem",
    fontSize: "1.1rem",
  },

  stepIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },

  stepLine: {
    width: "60px",
    height: "4px",
    background: "#dbeafe",
    borderRadius: "20px",
  },

  /* CTA */
  cta: {
    padding: "6rem 2rem",
    textAlign: "center",
    background:
      "linear-gradient(135deg,rgb(0, 114, 255),rgb(0, 198, 255))",
    color: "white",
  },

  ctaTitle: {
    fontSize: "2.8rem",
    marginBottom: "1rem",
    fontWeight: "700",
  },

  ctaText: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    opacity: 0.95,
  },

  ctaButton: {
    padding: "16px 38px",
    borderRadius: "50px",
    border: "none",
    background: "white",
    color: "#0072ff",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
};

/* GLOBAL STYLES */
const styleSheet = document.createElement("style");

styleSheet.textContent = `
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  button:hover{
    transform: translateY(-4px) scale(1.03);
  }

  div[style*="featureCard"]:hover{
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  }

  @keyframes fadeIn{
    from{
      opacity:0;
      transform:translateY(30px);
    }
    to{
      opacity:1;
      transform:translateY(0);
    }
  }

  @media(max-width:768px){
    h1{
      font-size:2.5rem !important;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Home;