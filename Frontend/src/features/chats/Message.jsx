
function Message({ user, text, timestamp, myself}) {
  return (
    <main className={`${myself ? 'justify-end' : 'justify-start'} w-full flex`}>
    <div className={`${myself ? 'bg-red-500' : 'bg-gray-900'} min-w-5/10 rounded-xl p-2 max-w-5/10`}>
        <h1 className="text-red-300">{user}</h1>
        <h2>{text}</h2>
        <h3 className="text-gray-500 text-sm">{timestamp}</h3>
    </div>
    </main>
  )
}

export default Message