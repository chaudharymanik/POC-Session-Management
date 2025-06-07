# Session Management POC

This is a Proof of Concept (POC) for session management in a React application. It demonstrates how to handle user sessions with automatic expiration after 10 minutes of inactivity.

## Features

- User authentication with JWT
- Session management with activity tracking
- Automatic session expiration after 10 minutes of inactivity
- Protected routes
- Responsive UI with Bootstrap

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```
2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Development Commands

### Frontend (in client directory)
- `npm start` - Runs the React app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Backend (in root directory)
- `npm run dev` - Starts the development server
- `npm start` - Starts the production server

## Test Credentials

- Username: test
- Password: test123

## How it Works

1. The application tracks user activity through mouse movements, keyboard presses, and touch events
2. If no activity is detected for 10 minutes, the session automatically expires
3. The user is redirected to the login page when the session expires
4. Any user activity resets the inactivity timer

## Technical Implementation

### Frontend
- React for the user interface
- Custom hooks for activity monitoring
- Context API for state management
- Event listeners for user interaction tracking
- Bootstrap for responsive design

### Backend
- Node.js/Express server
- JWT-based authentication
- Session management middleware
- Protected API endpoints

## Security Features

- JWT-based authentication
- Secure password hashing
- Protected API endpoints
- Automatic token expiration
- CORS enabled for development 