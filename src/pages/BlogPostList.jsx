import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const BlogList = ({currentUser}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    // Fetch all blog posts from Firestore
    const fetchBlogPosts = async () => {
        try {
            const snapshot = await firebase.firestore().collection('blogPosts').get();
            const postList = snapshot.docs.map(
                (doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postList);
        } catch (error) {
            console.error('Error fetching blog posts: ', error);
        }
    };

    fetchBlogPosts();
    
}, []);

const handleDeletePost = async (postId) => {
    try{
        //Delete the selected blog post from Firestore
        await firebase.firestore().collection('blogPosts').doc(postId).delete();
        console.log('Post deleted successfully.')
        // Update the local state to reflect the deletion
        setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
        console.error('Error deleting blog post: ', error);
    }
};

return (
    <div>
        <h2>Posts</h2>
        <ul>
            {posts.map(
                (post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {currentUser && currentUser.uid === post.authorId &&
                        (
                            <button onClick={
                                () => handleDeletePost(post.id)
                            }>
                                Delete
                            </button>
                        )}
                    </li>
                )

            )}
        </ul>
    </div>
);
}

export default BlogList;
