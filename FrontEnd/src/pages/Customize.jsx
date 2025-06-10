import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { useContext } from 'react'
import { userDataContext } from '../contextapi/UserContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const {serverUrl,userData,setUserData, frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage, setSelectedImage} = useContext(userDataContext)

  const inputImage = useRef()
  const navigate = useNavigate()
  const handleImage = (e) =>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#130353] flex justify-center items-center flex-col '>

       <MdKeyboardBackspace className='absolute cursor-pointer top-[25px] left-[25px] text-white w-[23px] h-[22px]' onClick={() => navigate("/")}/>

      <h1 className='text-white text-[24px] mb-[15px] text-center'>Select your <span className='text-blue-200'>Assistant Image</span></h1>

      <div className='w-full max-w-[40%] flex justify-center items-center flex-wrap gap-[10px]'>

      <Card image={image1}/>
      <Card image={image2}/>
      <Card image={image3}/>
      <Card image={image4}/>
      <Card image={image5}/>
      <Card image={image6}/>
      <Card image={image7}/>

      <div className={`w-[65px] h-[128px] lg:w-[90px] lg:h-[155px] lg:max-w-[50%] bg-[#030326] border-2 border-[#0000ff42] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white flex items-center justify-center ${selectedImage=="input"?"border-2 border-white shadow-2xl shadow-blue-950":null}`} onClick={() => {
        inputImage.current.click()
        setSelectedImage("input")
      }}>

        {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px] '/>}
        {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}

    </div>
    <input type="file" accept='image/*' hidden ref={inputImage} onChange={handleImage}/>
      </div>
      {selectedImage && <button className='min-w-[97px] mt-[25px] h-[32px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer' onClick={() => navigate("/customize2")}>Next</button>}

    </div>
  )
}

export default Customize
