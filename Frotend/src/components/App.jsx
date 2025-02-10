import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Toaster } from "react-hot-toast"

import { server } from './constants/config'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { LayoutLoader } from './components/layout/Loaders'
import { setIsAdmin, userExist, userNotExist } from './redux/reducers/auth'
import { SocketProvider } from './socket'
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute"
import { useGetIsAdminQuery } from './redux/api/api'
import { useErrors } from './hooks/hooks'

const Home = lazy(() => import("./pages/Home"))
const Chats = lazy(() => import("./pages/Chats"))
const Groups = lazy(() => import("./pages/Groups"))
const Login = lazy(() => import("./pages/Login"))
const NotFound = lazy(() => import("./pages/NotFound"))

const AdminLogin = lazy(() => import("./pages/admin/Login"))
const DashBoard = lazy(() => import("./pages/admin/DashBoard"))
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"))
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement"))



const App = () => {
  const { user, loader } = useSelector((state => state.auth))
  const { isAdmin } = useSelector((state) => (state.auth))

  const dispatch = useDispatch()



  useEffect(() => {
    axios.get(`${server}/api/v1/user/profile`, { withCredentials: true })
      .then((res) => {
        dispatch(userExist(res.data.user))

      })
      .catch((err) => {
        dispatch(userNotExist())
      })
  }, [dispatch])

  return loader ? <LayoutLoader /> : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            <SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>
          }>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chats />} />
            <Route path='/groups' element={<Groups />} />
          </Route>


          <Route path='/login' element={
            <ProtectedRoute user={!user} redirect='/'>
              <Login />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}

          <Route path='/admin' element={<AdminLogin />} />

          <Route element={
            <AdminProtectedRoute isAdmin={isAdmin} />
          }>
            <Route path='/admin/dashboard' element={<DashBoard />} />
            <Route path='/admin/messages' element={<MessageManagement />} />
            <Route path='/admin/chats' element={<ChatManagement />} />
            <Route path='/admin/users' element={<UserManagement />} />
          </Route>


          <Route path='*' element={<NotFound />} />

        </Routes>
      </Suspense>
      <Toaster position='bottom-center' />

    </BrowserRouter>
  )
}

export default App