import { useUser } from "@clerk/clerk-react"
import { Navigate, Outlet } from "react-router"

const protectedLayout = () => {

  const { isLoaded, isSignedIn, user } = useUser()

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />
  }

  return (
    <Outlet/>
  )
  
}

export default protectedLayout