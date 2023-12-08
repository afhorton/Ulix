import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config';

function EditStory() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(
        () => {
    const fetchPost = async () => {
        const postRef = doc(db, 'userPosts', currentUser.uid, 'posts', postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            setTitle(postSnap.data().title);
            setContent(postSnap.data().content);
        } else {
            console.log('No such document!');
        }
    };
        fetchPost();
        }, [db, currentUser, postId]
    );

    const handleUpdate = async () => {
        const postRef = doc(db, 'userPosts', currentUser.uid, 'posts', postId);
        await updateDoc(
            postRef, {
                title,
                content
            }
        );
        navigate('/storyList');
    };

if (!title || !content) return null;

return (
    <div>
        <h1><img src="public/EditStory.png" alt="About" height="100"/>Edit Story</h1>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
        <button onClick={handleUpdate}>Update Story</button>
    </div>
);
}

export default EditStory;