import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from 'react-toastify'
import useToken from "../stores/useToken"


function Login() {
    let apiURL = import.meta.env.VITE_API_URL

    
    const { register, getValues} = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    })
    
    const navigate = useNavigate()
    const { setToken } = useToken()
    const submit = () => {
        const { username, password} = getValues()
        axios
            .post(apiURL + '/auth/login', { username, password })
            .then((result) => {
                console.log(result)
                if (result.data.token) {
                    toast.success('Succesful')
                    setToken(result.data.token)
                    navigate('/chats')
                }
                else {
                    toast.error(result.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

  return (
    <main className="h-screen bg-sky-950 flex justify-center items-center">
        <div className="h-5/10 w-3/10 bg-sky-600 gap-4 rounded-2xl flex flex-col justify-center items-center">
            <input {...register('username')} className="bg-sky-500 rounded-xl text-white p-3" />
            <input {...register('password')} className="bg-sky-500 rounded-xl text-white p-3" />
            <button onClick={submit} className="bg-rose-700 text-white p-4 rounded-xl hover:bg-rose-400">Login </button>
        </div>
    </main>
  )
}

export default Login