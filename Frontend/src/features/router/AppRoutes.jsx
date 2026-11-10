import { Routes, Route } from 'react-router'
import Login from '../auth/Login'
import useToken from '../stores/useToken'
import SignUp from '../auth/SignUp'
import ProtectedRoute from './ProtectedRoute'


function AppRoutes() {
  const { token } = useToken()
  return (
    <Routes>
        <Route path='/' element={<ProtectedRoute element={<div>Home</div>}/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/chats' element={<ProtectedRoute element={<div>Chats: {token}</div>}/>}/>
        <Route path='/chat/:id' element={<ProtectedRoute element={<div>Chat ID</div>}/>}/>
    </Routes>
  )
}

export default AppRoutes