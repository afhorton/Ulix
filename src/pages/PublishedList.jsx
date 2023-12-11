import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublishedStories } from '../publishedStoriesSlice';

function PublishedList () {
const dispatch = useDispatch();
const publishedStories = useSelector( state => state.publishedStories);

useEffect(
    () => {
        dispatch(fetchPublishedStories());
    }, [dispatch]
);

return (
    <div>
        {publishedStories.map(
            story => (
                <div key={story.id}>
                    <h2>{story.title}</h2>
                    <p>{story.content}</p>
                    <p>Author: {story.author}</p>
                </div>
            ))}
    </div>
);

};

export default PublishedList;