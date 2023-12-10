import React, { useContext, useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { UserContext } from '../AuthProvider';
import app from '../firebase-config'

function StoryForm () {
    const currentUser = useContext(UserContext);
    const db = getFirestore(app);
    console.log(currentUser);  // Add this line

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleCreatePost = async () => {
        if (currentUser && currentUser.uid) {
          try {
            // Save blog post to the user's collection in Firestore
            const userPostsRef = collection(db, 'userPosts', currentUser.uid, 'posts');
            await addDoc(userPostsRef, {
              title: title,
              content: content,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              author: currentUser.username
            });
      
            // Clear form fields after successful post creation
            setTitle('');
            setContent('');
            console.log('Blog post created successfully.')
      
          } catch (error) {
            console.error('Error creating blog post:', error)
          }
        } else {
          console.log('User not signed in');
        }
    

    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreatePost();
    }

    return (
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="mb-4"><img src="/StoryForm.png" alt="About" height="100"/>Create New Story</h2>
      <form className="w-50" onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input 
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="form-control"
              />
          </div>
          <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea 
                  value={content} 
                  onChange={handleContentChange} 
                  className="form-control"
              />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Create Post</button>
      </form>
  </div>
    )
};

export default StoryForm;