
import React from 'react'
import Home from './pages/Home.jsx';
import { useEffect } from 'react';
import getCurrentUser from './features/getCurrentUser.js';


function App() {

    useEffect(()=>{
        const getUser=async()=>{
            const user = await getCurrentUser()
            console.log(user)
        }
        getUser()
    },[])

    return (
        <>
        <Home/>
        </>
    )
}

export default App