import { useState } from 'react';
import PropTypes from 'prop-types';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const LoginForm = ({ auth, onLogin }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      onLogin(userCredential.user);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    // React component
    <div className="container">
      <h1 className="title">GRUPO 01</h1>

      <ul className="list">
        <li className="list-item">Escobar Juliana</li>
        <li className="list-item">Espin Marco</li>
      </ul>

      <form>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="login-button"
        >
          Login with Google
        </button>
      </form>
    </div>

  );
};

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
