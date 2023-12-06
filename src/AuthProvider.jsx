import React, { createContext, useState, useEffect } from 'react';
import { firebaseAuth, firestore } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          // User is signed in
          const userRef = doc(firestore, 'users', authUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists) {
            const userData = docSnap.data();
            setUser({ uid: authUser.uid, ...userData });  // Include the uid in the user state
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('Error getting document: ', error);
        }
      } else {
        // User is signed out
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;