// first of all will learn what is authentication for this i have a new project which name is authentication you can refer from there
import genToken from "../config/token.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
export const signUp = async (req,res) =>{
    try {
    const {name, email, password} = req.body
    const existEmail = await User.findOne({email})
    if(existEmail){
        return res.status(400).json({massage:"email already exists !"})
    }

    if(password.length < 6){
        return res.status(400).json({massage:"password must be atleast 6 characters"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, password:hashedPassword, email
    })

    const token = await genToken(user._id)

    res.cookie("token", token, {
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:false
    })

    return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({massage:`sign up error ${error}`})
    }
}

export const login = async (req,res) =>{
    try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({massage:"email does not exists !"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    const token = await genToken(user._id)

    if(!isMatch){
        return res.status(400).json({massage:"incorrect password"})
    }

    res.cookie("token", token, {
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:false
    })

    return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({massage:`login error ${error}`})
    }
}

export const logOut = async (req, res) =>{
    try {
        res.clearCookie("token")
        return res.status(200).json({massage:"log out successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({massage:`logout error ${error}`})
    }
}