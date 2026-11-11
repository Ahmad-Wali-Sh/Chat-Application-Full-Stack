import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useToken from "../stores/useToken";

function Chats({ children }) {
  const [rooms, setRooms] = useState([])
  const apiURL = import.meta.env.VITE_API_URL
  const { token } = useToken()

  useEffect(() => {
    axios
      .get(apiURL + '/rooms', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setRooms(result?.data?.user_rooms)
      })
      .catch((error) => console.log(error))
  }, [])

  const navigate = useNavigate()

  return (
    <main className="h-screen p-2 bg-sky-900">
      <header className="h-1/8 bg-sky-800 flex justify-around p-3">
        <div>
          <h1>Fullname</h1>
          <h3>Username</h3>
        </div>
        <div>
          <p>Biography</p>
        </div>
      </header>
      <section className="h-7/8 bg-sky-700 flex">
        <div className="w-2/8 bg-sky-400 flex flex-col">
        {rooms.map((room)=> (
          <h1 onClick={() => navigate('/chat/' + room.id)} className="w-full h-20 flex justify-center items-center hover:bg-red-400">{room.description}</h1> 
          ))}
             
        </div>
        <article className="w-6/8 bg-blue-500 flex justify-center items-center text-white">
              {children ? children : "No Chat Started Yet. Click on Any Room to Start The Chat."}
        </article>
      </section>
    </main>
  );
}

export default Chats;
