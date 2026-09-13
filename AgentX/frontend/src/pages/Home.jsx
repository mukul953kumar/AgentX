import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import api from '../../utils/axios.js'
import { auth, googleProvider } from '../../utils/firebase.js'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';



function Home() {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(userData)
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(setUseradata(data.user))
        } catch (error) {
            console.log(error)
        }
    }
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        console.log(token)
        await handleLogin(token)
        console.log(data)
    }


    return (
        <div className=' h-screen flex bg-[#0d0f14] text-white overflow-hidden'>

            {!userData && <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>

                    <div className='flex flex-col gap-1 mt-5'>
                        <h2 className='text-slate-100 text-[17px] font-semibold tracking-tight'>Welcome to AgentX</h2>
                        <p className='text-[13px] text-slate-500'>Please login to your account</p>

                    </div>

                    <button
                        onClick={googleLogin}
                        className=' bg-white text-black font-semibold flex cursor-pointer items-center gap-2 justify-center py-2 px-4 rounded-lg border border-white/[0.08] hover:bg-white/[0.03] hover:text-white/80 transition '>
                        <FcGoogle className='text-xl' />
                        <span>Login with Google</span>
                    </button>

                </div>
            </div>}


        </div>
    )
}

export default Home