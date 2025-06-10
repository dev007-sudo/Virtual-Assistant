import React, { useContext } from 'react'
import { userDataContext } from '../contextapi/UserContext'

function Card({image}) {
  const {serverUrl,userData,setUserData, frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage, setSelectedImage} = useContext(userDataContext)
  return (
    <div className={`w-[60px]  h-[130px] lg:w-[90px] lg:h-[155px] bg-[#030326] border-2 border-[#0000ff42] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white ${selectedImage==image?"border-2 border-white shadow-2xl shadow-blue-950":null}`} onClick={() => {
      setSelectedImage(image)
      setBackendImage(null)
      setFrontendImage(null)
    }}>
      <img src={image} className='h-full object-cover' />
    </div>
  )
}

export default Card
