import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuth } from './AuthProvider';

function StoryForm () {
    const { currentUser } = useAuth();

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
                await firebase.firestore()
                .collection('userPosts')
                .doc(currentUser.uid)
                .collection('posts')
                .add({
                    title: title,
                    content: content
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