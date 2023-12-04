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
        try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(email, password);

        // Access the authenticated user
        const user = userCredential.user;

        // Create a user document in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { 
            username,
            email
        })

        // User signed up successfully
        console.log('User signed up:', user);

        } catch (error) {
            // Handle sign-up errors
            
            console.log('Error signing up:', error.message);
        }
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
                    onChange={(e) => setUsername(e.target)}
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