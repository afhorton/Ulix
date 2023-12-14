import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, Timestamp} from 'firebase/firestore';
import app from './firebase-config';

const db = getFirestore(app);

// Fetch published stories
export const fetchPublishedStories = createAsyncThunk(
    'publishedStories/fetchPublishedStories', async () => {
        const querySnapshot = await getDocs(collection(db, 'publishedStories'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
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
            state.length = 0;
            action.payload.forEach(
                story => {state.push({
                    ...story,
                    createdAt: story.createdAt instanceof Timestamp ? story.createdAt.toDate().toISOString() : story.createdAt,
                    updatedAt: story.updatedAt instanceof Timestamp ? story.updatedAt.toDate().toISOString() : story.updatedAt,
                })
        });
        })
        .addCase(publishStory.fulfilled, (state, action) => {
            state.push(action.payload);
        })
        .addCase(unpublishStory.fulfilled, (state, action) => {
            const newState = state.filter(story => story.id !== action.payload);
            state.splice(0, state.length, ...newState);
        });
    },
});

export default publishedStoriesSlice.reducer;