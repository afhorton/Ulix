
import { signInWithGoogle } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function GoogleSignIn() {
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle(navigate);
    }
    return (
        <>
        <button onClick={handleGoogleSignIn}>
            Sign in with Google
        </button>
        </>
    );

 }
 export default GoogleSignIn;