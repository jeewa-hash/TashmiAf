import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CountryExplorer from './components/CountryExplorer';
import FavoritesPage from './components/FavoritesPage';
import Dashboard from './components/Dashboard';
import WorldMap from './components/WorldMap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component to restrict access
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { isAuthenticated, loading, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (userData, token) => {
    login(userData, token);
    navigate('/country-explorer');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar shown on all pages */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={() => {
        logout();
        navigate('/');
      }} />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Navigate to="/country-explorer" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register onRegisterSuccess={() => navigate('/login')} />
              ) : (
                <Navigate to="/country-explorer" />
              )
            }
          />

          {/* Public Routes */}
          <Route path="/country-explorer" element={<CountryExplorer />} />
          <Route path="/world-map" element={<WorldMap />} />

          {/* Protected Routes */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer displayed at the bottom */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
