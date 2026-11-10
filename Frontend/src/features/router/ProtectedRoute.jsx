import { Link } from "react-router"
import useToken from "../stores/useToken"

function RedirectPage() {
    return (
        <main className="bg-red-950 h-screen flex justify-center items-center">
            <Link className="bg-red-500 p-4 rounded-xl" to='/login'>Go Back to Login Page!</Link>
        </main>
    )
}

function ProtectedRoute({ element }) {
    const { token } = useToken()

  return (
    token ? element : <RedirectPage />
  )
}



export default ProtectedRoute