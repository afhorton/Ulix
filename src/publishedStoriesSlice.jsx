import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc} from 'firebase/firestore';
import app from './firebase-config';

const db = getFirestore(app);

// Fetch published stories
export const fetchPublishedStories = createAsyncThunk(
    'publishedStories/fetchPublishedStories', async () => {
        const querySnapshot = await getDocs(collection(db, 'publishedStories'));
        return querySnapshot.docs.map(doc => doc.data());
    }
);

export const unpublishStory = createAsyncThunk('publishedStories/unpublishStory', async (storyId) => {
    await deleteDoc(doc(db, 'publishedStories', storyId));
    return storyId;
});

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
        })
        .addCase(unpublishStory.fulfilled, (state, action) => {
            return state.filter(story => story.id !== action.payload);
        });
    },
});

export default publishedStoriesSlice.reducer;