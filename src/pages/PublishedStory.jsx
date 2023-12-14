import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase-config';

function PublishedStory() {
    const { postId } = useParams();
    const db = getFirestore(app);
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchPost = async () => {
            const postRef = doc(db, 'publishedStories', postId);
            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                setPost(postSnapshot.data());
            } else {
                console.log('No such document!');
            }
        };
        fetchPost();
    }, [postId, db])

    if (!post) {
        return <div>Loading...</div>
    }

    const handleBackButton = () => {
        navigate('/publishedList');
    }
    return (
        <div className="container">
        <h2 className="my-4"><img src="/ReadPage.png" alt="Story" height="100"/>{post.title}</h2>
        <div className="row">
            <div className="col-md-12">
                <div className="card bg-light mb-3 shadow-sm">
                {/* <div className="card-header">
                {post.author &&
                            `Author: ${post.author} | `} 
               {post.createdAt.isEqual(post.updatedAt) ?
                            `Created on: ${post.createdAt.toDate().toLocaleString()}`:
                            `Updated on: ${post.updatedAt.toDate().toLocaleString()}`}
                 </div> */}
                    <div className="card-body">
                        <p className="card-text">{post.content}</p>
                    </div>
                </div>
            </div>
        </div>
        <button className="btn btn-primary" onClick={handleBackButton}><img src="/BackButton.png" alt="BackButton" height="30" className='mx-1'/>Back to Published Stories</button>
    </div>
);
}

export default PublishedStory;