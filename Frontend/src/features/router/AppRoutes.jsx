import { Routes, Route } from 'react-router'
import Login from '../auth/Login'
import useToken from '../stores/useToken'


function AppRoutes() {
    const { token } = useToken()
  return (
    <Routes>
        <Route path='/' element={<div>Home</div>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/chats' element={<div>Chats: {token}</div>}/>
        <Route path='/chat/:id' element={<div>Chat ID</div>}/>
    </Routes>
  )
}

export default AppRoutes