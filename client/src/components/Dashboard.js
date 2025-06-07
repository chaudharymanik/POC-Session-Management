import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = ({ onLogout }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionTime, setSessionTime] = useState(600); // 10 minutes in seconds
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (err) {
        setError('Failed to fetch protected data');
        if (err.response?.status === 401) {
          onLogout();
        }
      }
    };

    fetchProtectedData();
  }, [onLogout]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRefreshSession = async () => {
    setIsRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/refresh-token',
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      localStorage.setItem('token', response.data.token);
      setSessionTime(600);
    } catch (err) {
      setError('Failed to refresh session');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title className="dashboard-title">
                  <span className="dashboard-icon">📊</span> Dashboard
                </Card.Title>
                <Badge bg={sessionTime > 300 ? 'success' : 'warning'} className="session-badge">
                  Session: {formatTime(sessionTime)}
                </Badge>
              </div>

              {error && (
                <Alert variant="danger" className="alert-custom">
                  <span className="alert-icon">⚠️</span> {error}
                </Alert>
              )}

              {message && (
                <Alert variant="success" className="alert-custom">
                  <span className="alert-icon">✅</span> {message}
                </Alert>
              )}

              <Card.Text className="dashboard-text">
                Welcome to your secure dashboard. Your session is being actively monitored for security.
                <ul className="mt-3">
                  <li>Session will expire after 10 minutes of inactivity</li>
                  <li>Any user activity will reset the timer</li>
                  <li>You can manually refresh your session</li>
                </ul>
              </Card.Text>

              <div className="dashboard-actions">
                <Button
                  variant="primary"
                  onClick={handleRefreshSession}
                  disabled={isRefreshing}
                  className="me-2"
                >
                  {isRefreshing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🔄</span> Refresh Session
                    </>
                  )}
                </Button>
                <Button variant="danger" onClick={onLogout}>
                  <span className="button-icon">🚪</span> Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 