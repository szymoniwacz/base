import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!, $passwordConfirmation: String!) {
    resetPassword(input: { token: $token, password: $password, passwordConfirmation: $passwordConfirmation }) {
      message
      errors
    }
  }
`;

const PasswordResetForm = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState('');
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword({ variables: { token, password, passwordConfirmation } });
    if (response.data.resetPassword.message) {
      setMessage(response.data.resetPassword.message);
      setErrors('');
    } else if (response.data.resetPassword.errors.length > 0) {
      setErrors(response.data.resetPassword.errors.join(', '));
      setMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-25">
        <h2>Reset Password</h2>
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        {errors && (
          <div className="alert alert-danger" role="alert">
            {errors}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Token:</label>
            <input
              type="text"
              className="form-control"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
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

export default PasswordResetForm;
