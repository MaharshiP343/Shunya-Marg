import React from 'react';
export default function ProtectedRoute({ children }) {
  // In production, you'd check login/auth here!
  return children;
}
