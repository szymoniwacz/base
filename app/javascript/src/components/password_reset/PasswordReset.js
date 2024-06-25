import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!, $passwordConfirmation: String!) {
    resetPassword(input: { token: $token, password: $password, passwordConfirmation: $passwordConfirmation }) {
      message
      errors
    }
  }
`;

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState('');
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('reset_password_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword({ variables: { token, password, passwordConfirmation } });
    if (response.data.resetPassword.message) {
      navigate('/', { state: { message: response.data.resetPassword.message } });
    } else if (response.data.resetPassword.errors.length > 0) {
      setErrors(response.data.resetPassword.errors.join(', '));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-25">
        <h2>Reset Password</h2>
        {errors && (
          <div className="alert alert-danger" role="alert">
            {errors}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
