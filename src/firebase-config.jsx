// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD38iZdVpSQXJ1cFcaucgC4yzlALb8il-I",
    authDomain: "final-react-blog-40aa4.firebaseapp.com",
    projectId: "final-react-blog-40aa4",
    storageBucket: "final-react-blog-40aa4.appspot.com",
    messagingSenderId: "921605442569",
    appId: "1:921605442569:web:c156a408b1dbe4f7477cd8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);

//Sign-in with Google

export const provider = new GoogleAuthProvider();

//Sign-in with Google function
export const signInWithGoogle = (navigate) => {
  signInWithPopup(firebaseAuth, provider)
    .then(async(result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Get user's name
      const username = user.displayName;

      //Create user document in Firestore
      const userDocRef = doc(firestore, "users", user.uid);

      //Check if user document already exists
      const docSnap = await getDoc(userDocRef);

      // If the document does not exist, set the username and email
      if (!docSnap.exists()) {
        setDoc(userDocRef, {
          username,
          email: user.email,
        });
      }
    }).then(() => {
      //Navigate to login page
      navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error("Error signing in with Google: ", error);
    });
}

export default app;