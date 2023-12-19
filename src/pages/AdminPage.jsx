import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from "../firebase-config";

function AdminPage() {
    const [usersData, setUsersData] = useState([]);
    const [publishedStoriesData, setPublishedStoriesData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(app);
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            setUsersData(usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(app);
            const publishedStoriesCollection = collection(db, "publishedStories");
            const publishedStoriesSnapshot = await getDocs(publishedStoriesCollection);
            setPublishedStoriesData(publishedStoriesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    const generateTable = (data) => (
        <table>
            <thead>
                <tr>
                    {data[0] && Object.keys(data[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, i) => (
                            <td key={i}>
                                {value instanceof Object && value.seconds ? 
                                    new Date(value.seconds * 1000).toLocaleString() : 
                                    value}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <h1 className="mb-4"><img src="/AdminPage.png" alt="Ulix" height="100"/>Admin Page</h1>
            <h2>Users</h2>
            {generateTable(usersData)}
            <h2>Published Stories</h2>
            {generateTable(publishedStoriesData)}
        </div>
    );
}

export default AdminPage;