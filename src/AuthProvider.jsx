import React, { createContext, useState, useEffect } from 'react';
import { firebaseAuth, firestore } from './firebase-config';

export const UserContext = createContext();

function AuthProvider ({ children }) {
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(
                async (authUser) => {
                    if (authUser) {
                        try {
                            // USer is signed in
                            const userRef = firestore.collection('users').doc(authUser.uid);
                            const doc = await userRef.get();

                            if (doc.exists) {
                                const userData = doc.data();
                                setUser(userData);
                            } else {
                                console.log('No such document!');
                            }
                        } catch (error) {
                            console.log('Error getting document: ', error);
                        }
                    } else {
                        // User is signed out
                        setUser(null);
                    }});

                    return () => unsubscribe();

        }, []);

        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        );

};

export default AuthProvider;