import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NavLink } from 'react-router-dom';



function SignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignUp = () => {
        try {
        // Create user with email and password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

        // Access the authenticated user
        const user = userCredential.user;

        // Create a user document in Firestore
        await firebase.firestore().collection('users').doc(user.id).set({
            username,
            email
        });

        // User signed up successfully
        console.log('User signed up:', user);

        } catch (error) {
            // Handle sign-up errors
            
            console.log('Error signing up:', error.message);
        }
    };
}


    return (
        <>
        <main>
            <section>
            <h1>Signup</h1>
            <h2>Begin Your Odyssey!</h2>
            <form>
                <div>
                    <label htmlFor="">Email Address</label>
                    <input
                    type="email"
                    label="Email address"
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
                <button type="submit" onClick={handleSignUp}>
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

export default Signup;