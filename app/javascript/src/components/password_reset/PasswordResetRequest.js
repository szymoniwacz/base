import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(input: { email: $email }) {
      message
      errors
    }
  }
`;

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState('');
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await requestPasswordReset({ variables: { email } });
    if (response.data.requestPasswordReset.message) {
      setMessage(response.data.requestPasswordReset.message);
      setErrors('');
    } else if (response.data.requestPasswordReset.errors.length > 0) {
      setErrors(response.data.requestPasswordReset.errors.join(', '));
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
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
