import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config';

function Story() {
    const { postId } = useParams();
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

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

    const handleBackButton = () => {
        navigate('/storyList');
    }

    return (
      <div className="container">
        <h2 className="my-4">
          <img
            src={`${import.meta.env.BASE_URL}ReadPage.png`}
            alt="Story"
            height="100"
          />
          {post.title}
        </h2>
        <div className="row">
          <div className="col-md-12">
            <div className="card bg-light mb-3 shadow-sm">
              <div class="card-header">
                {post.author && `Author: ${post.author} | `}
                {post.createdAt.isEqual(post.updatedAt)
                  ? `Created on: ${post.createdAt.toDate().toLocaleString()}`
                  : `Updated on: ${post.updatedAt.toDate().toLocaleString()}`}
              </div>
              {/* <div className="card-header">{post.title}</div> */}
              <div className="card-body">
                <p className="card-text">{post.content}</p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleBackButton}>
          <img
            src={`${import.meta.env.BASE_URL}BackButton.png`}
            alt="BackButton"
            height="30"
            className="mx-1"
          />
          Back to Stories
        </button>
      </div>
    );

}

export default Story;