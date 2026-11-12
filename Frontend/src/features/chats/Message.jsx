import axios from "axios"
import { useEffect, useState } from "react"
import useToken from "../stores/useToken"



function Message({ user, text, timestamp, myself}) {

  const [users, setUsers] = useState([])
  const apiURL = import.meta.env.VITE_API_URL
  const { token } = useToken()

  useEffect(() => {
    axios
      .get(apiURL + '/users', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((result) => setUsers(result.data))
      .catch(error => console.log(error))
  }, [user, apiURL, token])

  const userOBJ = users?.find((u) => u.id == user)

  return (
    <main className={`${myself ? 'justify-end' : 'justify-start'} w-full flex`}>
    <div className={`${myself ? 'bg-red-500' : 'bg-gray-900'} min-w-5/10 rounded-xl p-2 max-w-5/10`}>
        <h1 className="text-red-300">{userOBJ?.fullname}</h1>
        <h2>{text}</h2>
        <h3 className="text-gray-500 text-sm">{timestamp}</h3>
    </div>
    </main>
  )
}

export default Message