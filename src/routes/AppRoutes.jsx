import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Post from '../pages/Post';
import WritePost from '../pages/WritePost';
import { useAuth } from '../context/AuthContext';

function BlockIfAuthenticated({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/post/:id" element={<Post />} />

      {/* Blog writing routes — auth required */}
      <Route
        path="/write"
        element={
          <RequireAuth>
            <WritePost />
          </RequireAuth>
        }
      />
      <Route
        path="/post/:id/edit"
        element={
          <RequireAuth>
            <WritePost />
          </RequireAuth>
        }
      />

      {/* Auth pages — blocked if already logged in */}
      <Route
        path="/login"
        element={
          <BlockIfAuthenticated>
            <Login />
          </BlockIfAuthenticated>
        }
      />
      <Route
        path="/signup"
        element={
          <BlockIfAuthenticated>
            <Signup />
          </BlockIfAuthenticated>
        }
      />
    </Routes>
  );
}
