import axios from "axios"
const geminiResponse = async (command,assistantName, username) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL
        const prompt = `you are a virtual assistant named ${assistantName} created by ${username} .
        you are not a google. you will now behave like a voice-enabled assistant.
        
        your task is to understant the user's natural language input and respond with a JSON object like this:
        
        {
        "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
        "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
        "instagram_open" | "facebook_open" | "weather_show",
        "userInput": "<original user input>" {only remove your name from the user input if 
        exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to 
        userinput me only vo vala text jaye,
        "response": "<a short spoken response to read out loud to the users>"
        }
        
        instructions:
        - "type": determine the intent of user.
        - "userinput": original sentence the user spoke.
        - "response": A short voice-friendly reply, e.g, "Sure, playing it now", "here
        what I found", "today is tuesday", etc.

        type meanings:
        - "general": if it's a factual or informational question.
        aur agar koi aisa question puche jiska answer tumhe pta
        hai usko bhi general ki category me rakho bus short answer dena
        - "google_search": if user want to search something on google.
        - "youtube_search":  if user want to search something on youtube.
        - "youtube_play":  if user want to directly play a video or song.
        - "calculator_open":  if user want to open a calculator.
        - "instagram_open": if user want to open a instagram.
        - "facebook_open": if user want to open a facebook.
        - "weather_show": if user want to know weather.
        - "get_time": if user asks for current time.
        - "get_date": if user asks for today's date.
        - "get-day": if user asks what day it is.
        - "get_month": if user asks for current month.
        
        important:
        - use ${username} agar koi puche tumhe kisne banaya
        - only respond with the JSON object, nothing else.

        now your userInput- ${command}
        `;
        const result = await axios.post(apiUrl, {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }]
                }]
        })
        return result.data.candidates[0].content.parts[0].text
    } catch (error) {
        console.log(error)
    }
}
export default geminiResponse