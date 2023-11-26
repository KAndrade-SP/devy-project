import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import { auth } from "./services/firebase"
import { signOut } from "firebase/auth"
import { matchPath } from 'react-router'

import Navbar from "./components/Navbar/Navbar"
import AddEditPost from "./pages/AddEditPost/AddEditPost"
import { Login } from './pages/Login/index'
import { Home } from "./pages/Home"

import './styles/global.scss'

export default function App() {

  const [active, setActive] = useState("home")
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      setActive("login")
    })
  }

  return (
    <div className="App">
      {user || !!matchPath("/", location.pathname) ? <Navbar
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      /> : <></>}
      <Routes>
        <Route
          path="/"
          element={<Home setActive={setActive} active={active} user={user} />}
        />
        <Route
          path="/create"
          element={ 
            user ? <AddEditPost user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:id"
          element={ 
            <AddEditPost user={user} setActive={setActive} /> 
          }
        />
        <Route 
          path="/login" 
          element={<Login setActive={setActive} active={active} user={user}/>} 
        />
      </Routes>
    </div>
  );
}
