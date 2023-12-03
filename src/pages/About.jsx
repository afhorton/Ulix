import React from 'react';
import { useNavigate } from 'react-router-dom';

function About () {

    const goToSignUp = () => {
        useNavigate('pages/Signup')
    }

    const goToLoginUp = () => {
        useNavigate('pages/Login')
    }
    return (
        <>
        <main>
    <title>About</title>
    <div>
        <p>
            Welcome to Ulix, a vibrant platform where individuals become storytellers. Here, you're the architect of your narrative, empowered to craft, share, and inspire. Whether you're an expert or an enthusiast, Ulix is your canvas to express, educate, and connect with the world. Unleash your creativity, share your passion, and join a community dedicated to telling compelling stories.
        </p>
        <p>
          Haven't started your odyssey? <a onClick={goToSignUp}>Sign Up</a>
        </p>
        <p>
          Already have? <a onClick={goToSignUp}>Log in</a>
        </p>
    </div>
</main>

        
        </>

    )


}