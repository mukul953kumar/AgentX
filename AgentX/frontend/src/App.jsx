
import React from 'react'
import Home from './pages/Home.jsx';
import { useEffect } from 'react';
import getCurrentUser from './features/getCurrentUser.js';
import { setUseradata } from './redux/userSlice.js';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getUser = async () => {
            const data = await getCurrentUser()
            dispatch(setUseradata(data))
        }
        getUser()
    }, [])

    return (
        <>
            <Home />
        </>
    )
}

export default App