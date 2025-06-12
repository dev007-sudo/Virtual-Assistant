import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../contextapi/UserContext'
import { data, useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"
import { CgMenuRight } from "react-icons/cg"
import { RxCross1 } from "react-icons/rx"
function Home() {
  const { userData, setUserData, serverUrl, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const [ham, setHam] = useState(false)
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      console.log(result.data)
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      console.log(error)
      setUserData(null)
    }
  }

  const startRecognition = () => {
    if (!isRecognizingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start()
        console.log("Recognition Requested to start")
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("start error:", error)
        }
      }
    }
  }

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text)
    utterence.lang = "hi-IN"
    utterence.lang = "en-USA"
    const voices = window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v => v.lang === 'hi-IN')
    if (hindiVoice) {
      utterence.voice = hindiVoice
    }

    isSpeakingRef.current = true
    utterence.onend = () => {
      setAiText("")
      isSpeakingRef.current = false
      setTimeout(() => {
        startRecognition()
      }, 800)
    }
    synth.cancel()
    synth.speak(utterence)
  }


  const handleCommand = (data) => {
    //     if (!data || typeof data !== "object") {
    //   console.warn("handleCommand: Invalid data", data);
    //   speak("Sorry, I didn't understand that. Please try again.");
    //   return;
    // }
    const { type, userInput, response } = data
    //    if (!response) {
    //   speak("Sorry, I didn't get any response.");
    //   return;
    // }
    speak(response)

    if (type === 'google_search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'calculator_open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }

    if (type === 'instagram_open') {
      window.open(`https://www.instagram.com/`, '_blank');
    }

    if (type === 'facebook_open') {
      window.open(`https://www.facebook.com/`, '_blank');
    }

    if (type === 'weather_show') {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }

    if (type === 'youtube_search' || type === 'youtube_play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }

  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false

    recognitionRef.current = recognition

    let isMounted = true
    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start()
          console.log("recognition requested to start")
        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.error(e)
          }
        }
      }
    }, 1000);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true)
    }

    recognition.onend = () => {
      isRecognizingRef.current = false
      setListening(false)
      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start()
              console.log("Recognition Restarted")
            } catch (e) {
              if (e.name !== "InvalidStateError") {
                console.error(e)
              }
            }
          }
        }, 1000);
      }
    }

    recognition.onerror = (event) => {
      console.warn("recognition error:", event.error)
      isRecognizingRef.current = false
      setListening(false)
      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start()
              console.log("Recognition Restarted after error")
            } catch (e) {
              if (e.name !== "InvalidStateError") {
                console.error(e)
              }
            }
          }
        }, 1000)
      }
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("")
        setUserText(transcript)
        recognition.stop()
        isRecognizingRef.current = false
        setListening(false)

        const data = await getGeminiResponse(transcript);
        if (data && typeof data === "object") {
          handleCommand(data);
          setAiText(data.response || "");
        } else {
          console.warn("Invalid response from Gemini:", data);
          speak("Sorry, I couldn't process that. Please try again.");
        }
      }
    };


    const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`)
    greeting.lang = 'hi-IN'
    window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false
      clearTimeout(startTimeout)
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
    }
  }, [])

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#190664] flex justify-center items-center flex-col gap-[13px] overflow-hidden'>

      <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[25px] w-[25px] h-[25px]' onClick={() => setHam(true)} />
      <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000028] backdrop-blur-lg p-[21px] flex flex-col gap-[1px] items-start ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}>

        <RxCross1 className=' text-white absolute top-[20px] right-[25px] w-[20px] h-[20px]' onClick={() => setHam(false)} />
        <button type='submit' className='min-w-[90px] h-[30px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer m-[15px] ' onClick={handleLogOut}>Log Out</button>

        <button type='submit' className='min-w-[95px] h-[35px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer px-[5px] py-[5px]' onClick={() => navigate("/customize")}>Customize your Assistant</button>

        <h1 className='text-white font-semibold text-[13px] p-[13px]'>History</h1>
        <div className='w-full h-[70%] overflow-auto flex flex-col gap-[18px] p-[10px]'>
          {userData.history?.map((his) => (
            <span className='text-white  text-[15px] leading-[7px] '>{his}</span>
          ))}
        </div>

      </div>

      <button type='submit' className='min-w-[90px] absolute hidden lg:block top-[18px] mt-[35px] right-[18px] h-[30px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer' onClick={handleLogOut}>Log Out</button>

      <button type='submit' className='min-w-[95px] absolute hidden lg:block top-[100px] right-[18px] h-[35px] text-black font-semibold bg-white rounded-full text-[15px] cursor-pointer px-[5px] py-[5px]' onClick={() => navigate("/customize")}>Customize your Assistant</button>

      <div className='w-[140px] h-[200px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>

        <img src={userData.assistantImage} alt="" className='h-full object-cover' />

      </div>
      <h1 className='text-white text-[15px] font-semibold'>I'm {userData.assistantName}</h1>
      {!aiText && <img src={userImg} className='w-[150px] text-white' />}
      {aiText && <img src={aiImg} className='w-[150px] bg-white' />}
      <h1 className='text-white text-[16px] font-semibold text-wrap'>{userText ? userText : aiText ? aiText : null}</h1>
    </div>
  )
}

export default Home
