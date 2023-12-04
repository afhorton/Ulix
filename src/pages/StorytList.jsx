import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config';

function StoryList () {
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);

    const [userPosts, setUserPosts] = useState([]);

    useEffect(
        () => {
            if (currentUser) {
                const fetchUserBlogPosts = async () => {
                    try {
                        const userPostRef = collection(db, 'userPost', currentUser.uid, 'posts');
                        const snapshot = await getDocs(userPostRef);

                        const postList = snapshot.docs.map(
                            (doc) => ({
                                id: doc.id,
                                ...doc.data()

                            }));
                            setUserPosts(postList);
                    } catch (error) {
                        console.error('Error fetching user blog posts: ', error);
                    }
                };

                fetchUserBlogPosts();
            }
        }, [currentUser, db]);

    return (
        <div>
            <h2>Your Stories</h2>
            <ul>
                {
                    userPosts.map(
                        (post) => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </li>
                        )
                    )
                }
            </ul>
        </div>

    );
};

export default StoryList;