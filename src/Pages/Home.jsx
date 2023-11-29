
import React, { useState } from 'react';
import './Home.css';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Authentication/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {

  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');


  const handleLoginClick = () => {
    setLoginShow(!loginShow);
    setRegisterShow(false); 

  };

  const handleRegisterClick = () => {
    setRegisterShow(!registerShow);
    setLoginShow(false); 

  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log('User logged in:', user);
        toast.success('Login successfully');
        setLoginShow(!loginShow);

      })
      .catch((error) => {
        console.error('Login error:', error);
        toast.error('Login error. Please try again later.');

      });

  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user);
        toast.success('Registered successfully');
        setRegisterShow(!registerShow);
        setLoginShow(true);

      })
      .catch((error) => {
        console.error('Registration error:', error);
        toast.error('Registration error. Please try again later.');
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        toast.error('Logout error. Please try again later.');
      });
  };

  return (
    <div>
      <div className="slide "> <h1></h1>

        <ToastContainer position='top-center' autoClose={3000}
          hideProgressBar={true}
          closeButton={false}
          limit={3}
          className="toast-container" theme='colored' />

        {!user ? (
          <>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}


      </div>

      {loginShow && (
        <div className="registration-container">
          <h2>Login </h2>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {registerShow && (
        <div className="registration-container">
          <h2>Register </h2>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Home;
