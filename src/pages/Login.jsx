import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../firebase-config';

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
        navigate(-1) || navigate('/');
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
        <>
        <main>
            <section>
                <div>
                    <h1>Login</h1>
                    <form onClick={handleLogin}>
                        <div>
                            <label htmlFor="email-address">Email Address</label>
                            <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
                </div>
            </section>
        </main>
        </>
    )
}

export default Login;