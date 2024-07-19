import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import RequestPasswordReset from './components/Request Password Reset ';
import ResetPassword from './components/Reset Password Component'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
