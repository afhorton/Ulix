
import { signInWithGoogle } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import "../component.css";

function GoogleSignIn() {
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle(navigate);
    }
    return (
      <>
        <button
          onClick={handleGoogleSignIn}
            className='google-signin-button'
        >
          <img
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google G Logo"
            style={{ width: "20px" }}
          />
          Sign in with Google
        </button>
      </>
    );

 }
 export default GoogleSignIn;