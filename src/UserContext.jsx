import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const UserContext = createContext();

function UserProvider ({children}) {
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const unsubscribe = firebase.auth().onAuthStateChanged((authUSer) => {
                if (authUser) {
                    // User is signed in
                    // Retrieve additional user information like username from Firestore
                firebase.firestore().collection('users').doc(authUser.uid).get()
                .then((doc) => {
                    if(doc.exists) {
                        const userData = doc.data();
                        setUser(userData)
                    } else {
                        console.log('No such document!')
                    }
                })
                .catch(
                    (error) => {
                        console.log('Error getting document:', error);
                    }
                );
                } else {
                    // User is signeed out
                    setUser(null);
                }
            });

            return () => unsubscribe();
        }, []);
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;