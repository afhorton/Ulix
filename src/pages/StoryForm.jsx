import React, { useContext, useState } from 'react';
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config'

function StoryForm () {
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleCreatePost = async () => {
        if (currentUser) {
            try {
                // Save blog post to the user's collection in Firestore
                const userPostsRef = collection(db, 'userPosts', currentUser.uid, 'posts');
                await addDoc(userPostsRef, {
                    title: title,
                    content: content,
                });

                // Clear form fields after successful post creation
                setTitle('');
                setContent('');
                console.log('Blog post created successfully.')

            } catch (error) {
                console.error('Error creating blog post:', error)
            }
        };


    };

    return (
        <div>
            <h2>Create New Story</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input 
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    />
                </label>
                <br />
                <label>
                    Content:
                    <textarea value={content} onChange={handleContentChange}/>
                </label>
                <br />
                <button type="submit" onClick={handleCreatePost}>Create Post</button>
            </form>
        </div>
    )
};

export default StoryForm;