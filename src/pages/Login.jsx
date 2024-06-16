import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../firebase-config';
import GoogleSignIn from '../components/GoogleSignIn';

function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")

const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/');
        console.log(user.id); 
    })
    .catch(
        (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    );
}

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-4"><img src="/LogIn.png" alt="Ulix" height="100"/>Login</h1>
            <GoogleSignIn />
            <h5 className="mt-4">- OR -</h5>
            <form className="w-50" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <p className="text-sm text-white text-center">
                No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
        </div>
    )
}

export default Login;