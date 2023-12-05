import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../firebase-config';



function SignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

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
        <main>
            <section>
            <h1>Signup</h1>
            <h2>Begin Your Odyssey!</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="">Email Address</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    >
                    </input>
                </div>
                <button type="submit">
                    Sign up
                    </button>
                    <p>
              Already begun your odyssey? <NavLink to="/login">Sign in</NavLink>
            </p>
            </form>
            </section>
        </main>
        </>
    );
};

export default SignUp;