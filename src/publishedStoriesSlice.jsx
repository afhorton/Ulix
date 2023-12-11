import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { app } from './firebase-config';

const db = getFirestore(app);
