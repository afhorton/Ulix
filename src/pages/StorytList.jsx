import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function StoryList () {
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);
    const navigate = useNavigate();

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

    const handleDelete = async (postId) => {
        try {
            await deleteDoc(doc(db, 'userPosts', currentUser.uid, 'posts', postId));
            setUserPosts(userPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post: ', error);
        }
    }

    const handleEdit = (postId) => {
        navigate(`/editStory/${postId}`);
    }

    return (
        <div className="container">
        <h2 className="my-4"><img src="/StoryList.png" alt="About" height="100"/>Your Stories</h2>
        <div className="row">
            {
                userPosts.map(
                    (post) => (
                        <div key={post.id} className="col-md-4 mb-4">
                            <div className="card bg-light mb-3 shadow-sm" style={{maxWidth: "18rem"}}>
                                <div className="card-header">{post.title}</div>
                                <div className="card-body">
                                    <p className="card-text">{post.content}</p>
                                    <button className="btn btn-primary" onClick={() => handleEdit(post.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
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