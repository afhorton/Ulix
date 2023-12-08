import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../AuthProvider';

function Home() {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const goToLogin = () => {
        navigate('/login')
    };

    const goToSignUp = () => {
        navigate('/signup')
    };

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <img src="/UlixLogo1NoBG.png" alt="Ulix" height="200"/>
        <h1 className="mb-4">Ulix</h1>
        <p>/ˈjuːlɪks/</p>
        <p><i>noun.</i> a personal chronicle, typically captivating in nature.</p>
        { user ? null :
       
        <h2 className="mb-4">Discover, Engage, Evolve: Your Blog, Your Odyssey</h2> }
         { user ? null :
        <div className='align-items-center'>
            <button className="btn btn-primary mr-2" onClick={goToLogin}>Login</button>
            <button className="btn btn-secondary" onClick={goToSignUp}>Signup</button>
        </div>
       }
        </div>
    )
}

export default Home;