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
    <div className="container">
    <h2 className="my-4"><img src="/PublishedList.png" alt="PublishedList" height="100"/>Published Stories</h2>
    <div className="row">
        {publishedStories.map(
            story => (
                <div key={story.id} className="col-md-4 mb-4">
                    <div className="card">
                    <div className='card-header'><h2 className="card-title">{story.title}</h2></div>
                        <div className="card-body">
                            <p className="card-text">{story.content}</p>
                        </div>
                        <div className="card-footer">Author: {story.author}</div>
                    </div>
                </div>
            ))}
     </div>
</div>
);

};

export default PublishedList;