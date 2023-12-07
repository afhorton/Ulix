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
                        const userPostRef = collection(db, 'userPosts', currentUser.uid, 'posts');
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
        <div className="container">
        <h2 className="my-4"><img src="public/StoryList.png" alt="About" height="100"/>Your Stories</h2>
        <div className="row">
            {
                userPosts.map(
                    (post) => (
                        <div key={post.id} className="col-md-4 mb-4">
                            <div className="card bg-light mb-3" style={{maxWidth: "18rem"}}>
                                <div className="card-header">{post.title}</div>
                                <div className="card-body">
                                    <p className="card-text">{post.content}</p>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    </div>

    );
};

export default StoryList;