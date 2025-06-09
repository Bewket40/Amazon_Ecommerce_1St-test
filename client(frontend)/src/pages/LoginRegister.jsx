



import '../assets/css/LoginRegister.css';
import React, { useState } from 'react';
import { auth } from '../../Utility/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Amazon2-Logo-PNG.png';
import Spinner from '../components/Spinner'
import { useGlobal } from '../context/GlobalContext';
import Register from './Register';

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
 const [loggedInUser, setLoggedInUser] = useState   (null);
 

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      const token = await getIdToken(user);
      localStorage.setItem('token', token);

      console.log('🔐 Token stored in localStorage:', token);
      navigate('/');
    } catch (err) {
      setError(err.message);
  } finally {
    setLoading(false);
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('token');
    navigate('/');
  } catch (err) {
    setError('Failed to sign out');
  }
};

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={logo} alt="Amazon Logo" />
      </div>

      <div className="login-box">

      {loggedInUser ? (
          <>
            <h2>Welcome, {loggedInUser.email}</h2>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>


        <h1>{isRegister ? 'Create account' : 'Sign-In'}</h1>

{error && <p className="error">{error}</p>}
            {loading && <Spinner />}

        <form onSubmit={handleAuth}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{isRegister ? 'Register' : 'Sign In'}</button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <p className="terms">
          By {isRegister ? 'creating an account' : 'signing in'}, you agree to the AMAZON CLONE
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {!isRegister && (
          <button
            type="button"
            className="create-account-btn"
            onClick={() => setIsRegister(true)}
          >
            Create your Amazon Account
          </button>
        )}
        </>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
