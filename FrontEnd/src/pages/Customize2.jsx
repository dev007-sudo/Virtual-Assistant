import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../contextapi/UserContext'
import { MdKeyboardBackspace } from "react-icons/md";
import { Navigate } from 'react-router-dom';
import axios from 'axios'
function Customize2() {
  const {userData, backendImage, selectedImage,serverUrl,setUserData} = useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // update assistant
  const handleUpdateAssistant = async () =>{
    setLoading(true)
    try {
    let formData = new FormData()
    formData.append("assistantName", assistantName)

    if(backendImage){
    formData.append("assistantImage", backendImage)
    }
    else{
    formData.append("imageUrl", selectedImage)
    }
      const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
      setLoading(false)
      console.log(result.data)
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#130353] flex justify-center items-center flex-col relative'>

      <MdKeyboardBackspace className='absolute cursor-pointer top-[25px] left-[25px] text-white w-[23px] h-[22px]' onClick={() => navigate(-1)}/>

    <h1 className='text-white text-[24px] mb-[25px] text-center'>Enter your <span className='text-blue-300'>Assistant Name</span></h1>

    <input type="email" placeholder='eg: Jarvis' className='w-full h-[40px] outline-none border-2 border-white max-w-[400px] bg-transparent text-white placeholder-gray-300 px-[20px] py-[5px] rounded-full text-[15px]' required value={assistantName} onChange={(e) => setAssistantName(e.target.value)}/>

    {assistantName && <button type='submit' className='min-w-[220px] mt-[30px] h-[33px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer'disabled={loading} onClick={() => {
      handleUpdateAssistant()
    }
      }>{!loading? "Finally Create Your Assistant": "loading..."}</button>}

    </div>
  )
}

export default Customize2
