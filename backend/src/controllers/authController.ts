import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginUser = async (req:Request ,res:Response ) => {
  //continuation of validation 
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(401).json({message: errors.array()})
  }
  
  //get email and password from request 
  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({message:"Invalid Credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password )
    if (!isMatch) {
      return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    })

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000
    })

    res.status(200).json({userId: user._id})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong"})
  }
}
export const logoutUser = async (req:Request, res:Response ) => {
  res.cookie("auth_token", "", {
    expires: new Date(0)
  })
  res.send()
}
