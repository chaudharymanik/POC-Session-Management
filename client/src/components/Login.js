import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      onLogin(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <div className="text-center mb-4">
            <div className="login-icon">🔐</div>
            <Card.Title className="login-title">Welcome Back</Card.Title>
            <p className="text-muted">Please sign in to continue</p>
          </div>

          {error && (
            <Alert variant="danger" className="alert-custom">
              <span className="alert-icon">⚠️</span> {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>
                <span className="input-icon">👤</span> Username
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                <span className="input-icon">🔑</span> Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              <small>Test Credentials: test / test123</small>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login; 