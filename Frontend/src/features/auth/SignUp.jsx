import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import useToken from "../stores/useToken"


function SignUp() {

  const { register, getValues } = useForm()
  const apiURL = import.meta.env.VITE_API_URL

  const navigate = useNavigate()
  const { setToken } = useToken()

  const submit = () => {
    const formData = getValues()
    console.log(formData)

    axios
        .post(apiURL + '/auth/signup', formData)
        .then((result) => {
          if (result.data.token) {
            toast.success('Account Succesfully Created')
            setToken(result.data.token)
            navigate('/chats')
          }
          else {
            toast.error('Account Failed to be created. try again.')
          }
        })
        .catch((error) => console.log(error))
  }

  return (
    <main className="bg-sky-950 h-screen flex justify-center items-center">
      <section className="w-5/10 h-5/10 bg-sky-500 grid grid-cols-2 p-10 gap-4 rounded-xl">
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="text" {...register('username')} placeholder="Enter Your Username" />
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="password" {...register('password')} placeholder="Enter Your Password"/>
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="text" {...register('fullname')} placeholder="Enter Your Fullname"/>
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="number" {...register('age')} placeholder="Enter Your Age"/>
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="text" {...register('bio')} placeholder="Enter Your Biography"/>
        {/* <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="file" {...register('profile')} disabled placeholder="Enter Your Profile"/> */}
        <div>Under Maintanecne</div>
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="date" {...register('birthdate')} placeholder="Enter Your Birthdate"/>
        <input className="p-2 rounded-xl bg-sky-200 shadow-2xl shadow-sky-500" type="text" {...register('email')} placeholder="Enter Your Email"/>
      <button className="bg-green-600 p-4 rounded-xl text-white" onClick={submit}>Signup</button>
      <button className="bg-slate-600 rounded-xl text-white" onClick={() => navigate('/login')}>Login</button>
      </section>
    </main>
  )
}

export default SignUp

