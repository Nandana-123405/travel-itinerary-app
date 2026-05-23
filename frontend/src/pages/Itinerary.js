import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Itinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState('');
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await api.get(`/itinerary/${id}`);
        setItinerary(response.data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchItinerary();
  }, [id, navigate]);

  const handleShare = async () => {
    try {
      const response = await api.post(`/itinerary/share/${id}`);
      setShareLink(response.data.shareableUrl);
      setShowShare(true);
      navigator.clipboard.writeText(response.data.shareableUrl);
      alert('Share link copied to clipboard!');
    } catch (error) {
      alert('Failed to generate share link');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await api.delete(`/itinerary/${id}`);
        navigate('/dashboard');
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!itinerary) return <div style={styles.loading}>Not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{itinerary.title}</h1>
        <div style={styles.buttonGroup}>
          <button onClick={handleShare} style={styles.shareButton}>🔗 Share</button>
          <button onClick={handleDelete} style={styles.deleteButton}>🗑️ Delete</button>
        </div>
      </div>

      {showShare && (
        <div style={styles.shareBox}>
          <p>Shareable link copied to clipboard!</p>
          <p style={styles.shareLink}>{shareLink}</p>
        </div>
      )}

      <div style={styles.extractedData}>
        <h3>📋 Extracted Information</h3>
        <div style={styles.infoGrid}>
          {itinerary.extractedData?.flights?.length > 0 && (
            <div><strong>Flights:</strong> {itinerary.extractedData.flights.join(', ')}</div>
          )}
          {itinerary.extractedData?.hotels?.length > 0 && (
            <div><strong>Hotels:</strong> {itinerary.extractedData.hotels.join(', ')}</div>
          )}
          {itinerary.extractedData?.dates?.length > 0 && (
            <div><strong>Dates:</strong> {itinerary.extractedData.dates.join(', ')}</div>
          )}
          {itinerary.extractedData?.bookingRefs?.length > 0 && (
            <div><strong>Booking Ref:</strong> {itinerary.extractedData.bookingRefs.join(', ')}</div>
          )}
        </div>
      </div>

      <div style={styles.itineraryContent}>
        <h3>🤖 AI Generated Itinerary</h3>
        <div style={styles.aiContent}>
          {itinerary.aiItinerary.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#2c3e50',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
  },
  shareButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  shareBox: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  shareLink: {
    wordBreak: 'break-all',
    fontSize: '0.8rem',
    marginTop: '0.5rem',
  },
  extractedData: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  itineraryContent: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  aiContent: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
  },
};

export default Itinerary;