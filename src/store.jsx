import { configureStore } from '@reduxjs/toolkit';
import publishedStoriesReducer from './publishedStoriesSlice';

export default configureStore(
    {
        reducer: {
            publishedStories: publishedStoriesReducer,
        }
    }
);