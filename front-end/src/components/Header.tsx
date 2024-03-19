import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import { SignOutButton } from "./SignOutButton"

export const Header = () => {
  
  const {isLoggedIn} = useAppContext()
  
  return (
    <div className="py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Reserve.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? <>
            <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to={"/my-bookings"}>My Bookings</Link>
            <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to={"/my-hotels"}>My Hotels</Link>
            <SignOutButton />
          </> : 
          <Link to={"/sign-in"} className="flex items-center text-green-600 px-3 font-bold bg-white hover:bg-gray-200">
            sign In
          </Link> }
         
        </span>
      </div>
    </div>
  )
}
