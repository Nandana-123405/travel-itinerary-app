import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const response = await api.get('/itinerary/my-itineraries');
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome back, {user?.name}! ✈️</h1>
        <Link to="/upload">
          <button style={styles.uploadButton}>+ Upload New Booking</button>
        </Link>
      </div>

      <h2 style={styles.subtitle}>Your Travel Itineraries</h2>
      
      {loading ? (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading your trips...</p>
        </div>
      ) : itineraries.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No itineraries yet</h3>
          <p>Upload your first travel document to generate an AI-powered itinerary!</p>
          <Link to="/upload">
            <button style={styles.emptyButton}>Upload Now</button>
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {itineraries.map((item) => (
            <Link to={`/itinerary/${item._id}`} key={item._id} style={styles.cardLink}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>📅</span>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                </div>
                <p style={styles.cardDate}>
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div style={styles.cardPreview}>
                  {item.extractedData?.hotels?.length > 0 && (
                    <span style={styles.badge}>🏨 {item.extractedData.hotels[0]}</span>
                  )}
                  {item.extractedData?.flights?.length > 0 && (
                    <span style={styles.badge}>✈️ {item.extractedData.flights[0]}</span>
                  )}
                </div>
                <p style={styles.cardText}>
                  {item.aiItinerary?.substring(0, 100)}...
                </p>
                <div style={styles.viewButton}>View Itinerary →</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e0e0e0',
  },
  title: {
    color: '#2c3e50',
    fontSize: '1.8rem',
  },
  uploadButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '600',
  },
  subtitle: {
    color: '#34495e',
    marginBottom: '1.5rem',
    fontSize: '1.3rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.7rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  cardLink: {
    textDecoration: 'none',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  cardIcon: {
    fontSize: '1.5rem',
  },
  cardTitle: {
    color: '#2c3e50',
    margin: 0,
    fontSize: '1.1rem',
  },
  cardDate: {
    color: '#7f8c8d',
    fontSize: '0.8rem',
    marginBottom: '0.5rem',
  },
  cardPreview: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  },
  badge: {
    backgroundColor: '#ecf0f1',
    padding: '0.2rem 0.5rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    color: '#2c3e50',
  },
  cardText: {
    color: '#555',
    fontSize: '0.85rem',
    lineHeight: '1.4',
    marginBottom: '0.8rem',
  },
  viewButton: {
    color: '#3498db',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
  button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;
document.head.appendChild(styleSheet);

export default Dashboard;