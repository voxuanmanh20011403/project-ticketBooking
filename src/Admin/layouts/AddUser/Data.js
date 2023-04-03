import { db } from 'data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export default function Data() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const accountsCol = collection(db, 'Account');
            const accountsSnapshot = await getDocs(accountsCol);
            const accountsList = accountsSnapshot.docs.map((doc) => doc.data());
            setData(accountsList);
        }

        fetchData();
    }, []);
    console.log(data);
    return (
        <>
            
        </>
    )
}
