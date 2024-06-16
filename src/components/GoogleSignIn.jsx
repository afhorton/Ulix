
import { signInWithGoogle } from '../firebase-config';

function GoogleSignIn() {
    return (
        <>
        <button onClick={signInWithGoogle}>
            Sign in with Google
        </button>
        </>
    );

 }
 export default GoogleSignIn;