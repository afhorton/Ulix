import React from 'react';
import { useNavigate } from 'react-router-dom';

function About () {
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/signup')
    }

    const goToLogin = () => {
        navigate('/login')
    }
    return (
      <>
        <main className="container vh-100 d-flex flex-column justify-content-center align-items-center">
          <h1>
            <img
              src={`${import.meta.env.ulix}About.png`}
              alt="About"
              height="100"
            />
            About
          </h1>
          <div className="text-center">
            <p>
              Welcome to Ulix, a vibrant platform where individuals become
              storytellers. Here, you're the architect of your narrative,
              empowered to craft, share, and inspire. Whether you're an expert
              or an enthusiast, Ulix is your canvas to express, educate, and
              connect with the world. Unleash your creativity, share your
              passion, and join a community dedicated to telling compelling
              stories.
            </p>
            {/* <p>
                    Haven't started your odyssey? <a onClick={goToSignUp} className="text-primary">Sign Up</a>
                </p>
                <p>
                    Already have? <a onClick={goToLogin} className="text-primary">Log in</a>
                </p>
                <button onClick={goToSignUp} className="btn btn-primary mr-2">Sign Up</button>
                <button onClick={goToLogin} className="btn btn-secondary">Login</button> */}
          </div>
        </main>
      </>
    );


}

export default About;