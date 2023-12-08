import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config';

function Story() {
    const { postId } = useParams();
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);
    const [post, setPost] = useState(null);

    useEffect( () => {
        const fetchPost = async () => {
            const postRef = doc(db, 'userPosts',currentUser.uid, 'posts', postId);
            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                setPost(postSnapshot.data());
            } else {
                console.log('No such document!');
            }
        };

        fetchPost();
        }
        ,[postId, db, currentUser.uid]);

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <h2 className="my-4"><img src="/Story.png" alt="Story" height="100"/>{post.title}</h2>
            <div className="row">
                <div className="col-md-12">
                    <div className="card bg-light mb-3 shadow-sm">
                        {/* <div className="card-header">{post.title}</div> */}
                        <div className="card-body">
                            <p className="card-text">{post.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Story;