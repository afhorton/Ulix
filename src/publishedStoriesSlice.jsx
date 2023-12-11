import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import app from './firebase-config';

const db = getFirestore(app);

// Fetch published stories
export const fetchPublisheStories = createAsyncThunk(
    'publishedStories/fetchPublishedStories', async () => {
        const querySnapshot = await getDocs(collection(db, 'publishedStories'));
        return querySnapshot.docs.map(doc => doc.data());
    }
);

// Publish a story
export const publishStory = createAsyncThunk('publishedStories/publishStory', async (story) => {
    await addDoc(collection(db, 'publishedStories'), story);
    return story;
});

const publishedStoriesSlice = createSlice({
    name: 'publishedStories',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPublishedStories.fulfilled, (state, action) =>{
            return action.payload;
        })
        .addCase(publishStory.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    },
});

export default publishedStoriesSlice.reducer;