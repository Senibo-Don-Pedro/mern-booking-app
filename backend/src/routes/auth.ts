import express, {Request, Response} from "express"
import { check } from "express-validator"
import { loginUser, logoutUser } from "../controllers/authController" 
import { verifyToken } from "../middleware/auth"


const router = express.Router()

router.post("/login", [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  })
], loginUser )

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({userId: req.userId})
})

router.post("/logout", logoutUser )

export default router
