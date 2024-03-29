import express, { Request, Response } from "express"

import { registerUser } from "../controllers/userController"
import { check } from "express-validator"
import { verifyToken } from "../middleware/auth"
import User from "../models/userModel"

const router = express.Router()

router.get("/me", verifyToken, async(req: Request, res: Response) => {
  const userId = req.userId

  try {
    const user = await User.findById(userId).select("-password")

    if(!user) {
      return res.status(400).json({message:"User not found"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "something went wrong"})
  }
})


// /api/users/register
// validator, continues in usercontroller
router.post("/register", [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  })
] ,registerUser)

export default router 
