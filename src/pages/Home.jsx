import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    };

    const goToSignUp = () => {
        navigate('/signup')
    };

    return (
        <>
        <h1>Ulix</h1>
        <h2>Discover, Engage, Evolve: Our Blog, Your Odyssey</h2>
        <div>
            <button onClick={goToLogin}>Login</button>
            <button onClick={goToSignUp}>Signup</button>
        </div>
        </>
    )
}

export default Home;