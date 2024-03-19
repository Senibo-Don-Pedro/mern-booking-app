import express from "express"

import { registerUser } from "../controllers/userController"
import { check } from "express-validator"

const router = express.Router()



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
