import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function BlogForm ({ currentUser }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            // Check if user is authenticated before creating a post
            console.log('Please sign in to create a post.');
            return;
        }

        if (!title || !content) {
            console.log('Please provide a title and content for the post.');
            return;
        }

        try {
            // Create a new blog post in Firestore
            await firebase.firestore().collection('blogPosts').add({
                title: title,
                content: content,
                authorId: currentUser.uid
            });

            // Clear the form after successful submission
            setTitle('');
            setContent('');
            console.log('Blog post created successfully!');
        } catch (error) {
            console.error('Error creating blog post:', error);
        }

    };

    return (
        <div>
            <h2>Create New Post</h2>
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
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
};

export default BlogForm;