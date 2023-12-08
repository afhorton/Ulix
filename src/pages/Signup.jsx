import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../firebase-config';



function SignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const firebaseAuth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("email:", email);
        console.log("password:", password);
        console.log("username:", username);
      
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
      
            // Create a user document in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { 
              username,
              email
            });
      
            navigate("/login");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
          });
      };



    return (
      <>
      <main className="container vh-100 d-flex flex-column justify-content-center align-items-center">
          
              <h1 className="mb-4"> <img src="/SignUp.png" alt="Ulix" height="100"/>Signup</h1>
              <h2 className="mb-4">Begin Your Odyssey!</h2>
              <form className="w-50" onSubmit={handleSignUp}>
                  <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Email address"
                          className="form-control"
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          placeholder="Username"
                          className="form-control"
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Password"
                          className="form-control"
                      />
                  </div>
                  <button type="submit" className="btn btn-primary">
                      Sign up
                  </button>
                  <p className="mt-3">
                      Already begun your odyssey? <NavLink to="/login">Sign in</NavLink>
                  </p>
              </form>
          
      </main>
  </>
    );
};

export default SignUp;