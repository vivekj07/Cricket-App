import axios from "axios"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { lazy, Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './App.css'
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Loader from "./components/loaders/Loader"
import { server } from "./constants/config"
import { userExist, userNotExist } from "./redux/reducers/auth"
import { LayoutLoader } from "./pages/Loaders"


// User Pages
const Login = lazy(()=> import("../src/pages/Login"))
const Home = lazy(()=> import("../src/pages/User/Home"))
const UserPlayerList = lazy(()=> import("../src/pages/User/PlayerList"))
const UserPlayerDetails = lazy(()=> import("../src/pages/User/PlayerDetails"))
const UserTeamList = lazy(()=> import("../src/pages/User/TeamList"))
const UserTeamDetails = lazy(()=> import("../src/pages/User/TeamDetails"))
const UserLeagueList = lazy(()=> import("../src/pages/User/LeagueList"))
const UserLeagueDetails = lazy(()=> import("../src/pages/User/LeagueDetails"))
const UserMatchList = lazy(()=> import("../src/pages/User/MatchList"))
const UserAdminMatchDetails = lazy(()=> import("../src/pages/User/MatchDetails"))
const UserUmpireList = lazy(()=> import("../src/pages/User/UmpireList"))
const UserUmpireDetails = lazy(()=> import("../src/pages/User/UmpireDetails"))
const UserVenueList = lazy(()=> import("../src/pages/User/VenueList"))
const UserVenueDetails = lazy(()=> import("../src/pages/User/VenueDetails"))
const NotFound = lazy(()=> import("../src/pages/NotFound"))

// Admin Pages
const AdminHome = lazy(()=> import("../src/pages/Admin/Home"))
const PlayerList = lazy(()=> import("../src/pages/Admin/PlayerList"))
const PlayerDetails = lazy(()=> import("../src/pages/Admin/PlayerDetails"))
const TeamList = lazy(()=> import("../src/pages/Admin/TeamList"))
const TeamDetails = lazy(()=> import("../src/pages/Admin/TeamDetails"))
const LeagueList = lazy(()=> import("../src/pages/Admin/LeagueList"))
const LeagueDetails = lazy(()=> import("../src/pages/Admin/LeagueDetails"))
const MatchList = lazy(()=> import("../src/pages/Admin/MatchList"))
const AdminMatchDetails = lazy(()=> import("../src/pages/Admin/MatchDetails"))
const UmpireList = lazy(()=> import("../src/pages/Admin/UmpireList"))
const UmpireDetails = lazy(()=> import("../src/pages/Admin/UmpireDetails"))
const VenueList = lazy(()=> import("../src/pages/Admin/VenueList"))
const VenueDetails = lazy(()=> import("../src/pages/Admin/VenueDetails"))


function App() {
  const {user,loader}=useSelector((state)=> state.auth)

  const dispatch=useDispatch()

  useEffect(() => {
    axios.get(`${server}/api/v1/user/profile`, { withCredentials: true })
      .then((res) => {
        dispatch(userExist(res.data.user))

      })
      .catch((err) => {
        dispatch(userNotExist())
      })
  }, [dispatch])

  return loader ? <LayoutLoader /> :

  (
    <BrowserRouter>

        <Suspense fallback={<LayoutLoader />}>
        <Routes>

        <Route path='/login' element={
            <ProtectedRoute isAuthenticated={!user} redirect='/'>
              <Login />
            </ProtectedRoute>
        } />
          

          <Route element={
            <ProtectedRoute isAuthenticated={user}/>
          }>
              <Route path="/" element={<Home />} />
              <Route path="/player" element={<UserPlayerList />} />
              <Route path="/player/:id" element={<UserPlayerDetails />} />
              <Route path="/team" element={<UserTeamList />} />
              <Route path="/team/:id" element={<UserTeamDetails />} />
              <Route path="/league" element={<UserLeagueList />} />
              <Route path="/league/:id" element={<UserLeagueDetails />} />
              <Route path="/match" element={<UserMatchList />} />
              <Route path="/match/:id" element={<UserAdminMatchDetails />} />
              <Route path="/umpire" element={<UserUmpireList />} />
              <Route path="/umpire/:id" element={<UserUmpireDetails />} />
              <Route path="/venue" element={<UserVenueList />} />
              <Route path="/venue/:id" element={<UserVenueDetails />} />
          </Route>

          <Route element={
            <ProtectedRoute isAuthenticated={user?.isAdmin}/>
          }>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/player" element={<PlayerList />} />
              <Route path="/admin/player/:id" element={<PlayerDetails />} />
              <Route path="/admin/team" element={<TeamList />} />
              <Route path="/admin/team/:id" element={<TeamDetails />} />
              <Route path="/admin/league" element={<LeagueList />} />
              <Route path="/admin/league/:id" element={<LeagueDetails />} />
              <Route path="/admin/match" element={<MatchList />} />
              <Route path="/admin/match/:id" element={<AdminMatchDetails />} />
              <Route path="/admin/umpire" element={<UmpireList />} />
              <Route path="/admin/umpire/:id" element={<UmpireDetails />} />
              <Route path="/admin/venue" element={<VenueList />} />
              <Route path="/admin/venue/:id" element={<VenueDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>

        <Toaster position='bottom-center' />

    </BrowserRouter>
  )
}

export default App
