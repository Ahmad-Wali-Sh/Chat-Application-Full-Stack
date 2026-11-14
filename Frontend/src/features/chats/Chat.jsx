import { useEffect, useState } from "react";
import Chats from "./Chats";
import Message from "./Message";
import { useParams } from "react-router";
import axios from "axios";
import useToken from "../stores/useToken";
import useMe from "../stores/useMe";
import { useForm } from "react-hook-form";

function Chat() {
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API_URL;
  const { token } = useToken();
  const { user } = useMe();
  const [messages, setMessages] = useState([]);
  const { register, getValues, reset } = useForm();

  const submit = () => {
    const { message } = getValues();

    const newMessage = {
      text: message,
      user_id: user.id,
      room_id: id,
      assets: null,
      reply_id: null
    };
    reset({
      message: ''
    })
    axios
      .post(apiURL + "/messages", newMessage, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => { 
        console.log(result)
        getAllMessages()
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const getAllMessages = () => {
    axios
      .get(apiURL + "/messages/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setMessages(result.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let intervalID = setInterval(getAllMessages, 1000)

    return () => clearInterval(intervalID)
  }, [id, token, apiURL]);


  return (
    <Chats>
      <article className="h-full w-full bg-blue-500 ">
        <div className="h-9/10 border p-10 flex flex-col gap-2 overflow-auto">
          {messages?.map((mes) => {
            return (
              <Message
                myself={mes.user_id == user.id}
                user={mes.user_id}
                text={mes.text}
                timestamp={mes.timestamp}
              />
            );
          })}
        </div>
        <div className="h-1/10 border flex justify-center items-center gap-4">
          <input
            {...register("message")}
            className="h-8/10 w-8/10 p-4 bg-red-400 rounded-xl"
          />
          <button
            onClick={() => submit()}
            className="bg-blue-800 rounded-xl hover:bg-blue-700 p-3"
          >
            📩
          </button>
        </div>
      </article>
    </Chats>
  );
}

export default Chat;
