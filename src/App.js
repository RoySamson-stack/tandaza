import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Protected route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  return currentUser ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={
        currentUser ? <Navigate to="/dashboard" /> : <Login />
      } />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;