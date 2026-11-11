import Chats from "./Chats"
import Message from "./Message"


function Chat() {
  return (
    <Chats>
        <article className="h-full w-full bg-blue-500 ">
                <div className="h-9/10 border p-10 flex flex-col gap-2 overflow-auto">
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Myself'} myself={true} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Myself'} myself={true} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Ahmad'} text={'Hello'} timestamp={'4:08 PM'} />
                    <Message user={'Myself'} myself={true} text={'Hello'} timestamp={'4:08 PM'} />
                </div>
                <div className="h-1/10 border flex justify-center items-center gap-4">
                    <input className="h-8/10 w-8/10 p-4 bg-red-400 rounded-xl" />
                    <button className="bg-blue-800 rounded-xl hover:bg-blue-700 p-3">📩</button>
                </div>
        </article>
    </Chats>
  )
}

export default Chat