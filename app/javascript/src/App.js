import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import UserLanding from './components/UserLanding';
import PasswordResetRequest from './components/password_reset/PasswordResetRequest';
import PasswordResetForm from './components/password_reset/PasswordResetForm';
import PasswordReset from './components/password_reset/PasswordReset';
import { AuthContext } from './context/authContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/user-landing" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/user-landing" /> : <Registration />} />
        <Route path="/reset-password-request" element={<PasswordResetRequest />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        <Route path="/users/password/edit" element={<PasswordReset />} />
        <Route path="/user-landing" element={<ProtectedRoute element={UserLanding} />} />
      </Routes>
    </>
  );
};

export default App;
