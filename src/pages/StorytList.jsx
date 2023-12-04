import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { UserContext } from '..AuthProvider';

function StoryList () {
    const currentUser = useContext(UserContext);

    const [userPosts, setUserPosts] = useState([]);

    useEffect(
        () => {
            if (currentUser) {
                const fetchUserBlogPosts = async () => {
                    try {
                        const snapshot = await firebase.firestore()
                        .collection('userPost')
                        .doc(currentUser.uid)
                        .collection('posts')
                        .get();

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
        }, [currentUser]);

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