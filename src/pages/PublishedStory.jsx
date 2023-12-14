import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { fetchPublishedStory } from '../publishedStoriesSlice';

function PublishedStory() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.publishedStories.find(story => story.id === id));
    const navigate = useNavigate();

    useEffect(() => {
        if (!post) {
            dispatch(fetchPublishedStory(id));
        }
    }, [id, post, dispatch]);

    if (!post) {
        return <div>Loading...</div>;
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