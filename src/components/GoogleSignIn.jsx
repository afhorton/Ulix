
import { signInWithGoogle } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function GoogleSignIn() {
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle(navigate);
    }
    return (
      <>
        <button
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0px 0px 6px #00000029",
            padding: "10px 20px",
            fontSize: "1em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
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