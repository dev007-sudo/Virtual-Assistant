import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../contextapi/UserContext';
import axios from "axios"

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const { serverUrl,userData, setUserData} = useContext(userDataContext)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                name, email, password
            }, { withCredentials: true })
            setUserData(result.data)
            setLoading(false)
            navigate("/customize")
        } catch (error) {
            console.log(error)
            setUserData(null)
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center'
            style={{ backgroundImage: `url(${bg})` }}
        >

            <form onSubmit={handleSignUp} className='w-[40%] h-[450px] max-w-[390px] bg-[#00000046] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'>

                <h1 className='text-white text-[25px] font-semibold mb-[20px]'>
                    Register to <span className='text-blue-400'>Virtual Assistant</span>
                </h1>

                <input type="text" placeholder='Enter your Name' className='w-full h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[15px]' required value={name} onChange={(e) => setName(e.target.value)} />

                <input type="email" placeholder='Enter Email' className='w-full h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[15px]' required value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className='w-full h-[40px] border-2 border-white bg-transparent text-white rounded-full text-[15px] relative'>

                    <input type={showPassword ? "text" : "password"} placeholder='Enter Password'
                        className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'
                        required value={password} onChange={(e) => setPassword(e.target.value)} />

                    {!showPassword && <IoEye className='cursor-pointer absolute top-[9px] right-[20px] w-[20px] h-[20px] text-[white]' onClick={() => setShowPassword(true)} />}

                    {showPassword && <IoEyeOff className='cursor-pointer absolute top-[9px] right-[20px] w-[20px] h-[20px] text-[white]' onClick={() => setShowPassword(false)} />}
                </div>

                <button type='submit' className='min-w-[110px] h-[40px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer'  disabled={loading}>{loading ? "loading..." : "Sign Up"}</button>

                <p className='text-[white] text-[15px] cursor-pointer' onClick={() => navigate("/signin")}>Already have an account ? <span className='text-blue-400'>Sign In</span></p>

            </form>
        </div>
    )
}

export default SignUp
