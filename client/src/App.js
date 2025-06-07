import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > 10 * 60 * 1000) {
        handleLogout();
      }
    }, 60000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [lastActivity]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setLastActivity(Date.now());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="brand-text">
            <span className="brand-icon">🔒</span> Enterprise Session Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated && (
                <Nav.Link onClick={handleLogout} className="logout-btn">
                  <span className="logout-icon">🚪</span> Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-content">
        <Container className="mt-4">
          {!isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Dashboard onLogout={handleLogout} />
          )}
        </Container>
      </div>

      <footer className="footer mt-auto py-3">
        <Container className="text-center">
          <span className="text-muted">© 2024 Enterprise Session Manager. All rights reserved.</span>
        </Container>
      </footer>
    </div>
  );
}

export default App;
