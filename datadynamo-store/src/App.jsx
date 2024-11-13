import { useEffect, useState } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import { supabase } from './services/supabase_client.js'

import Navbar from './components/NavBar.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Store from './pages/Store.jsx'
import Profile from './pages/Profile.jsx'
import Welcome from './pages/Welcome.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        navigate('/')
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [navigate])

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/store"
            element={
              <ProtectedRoute user={user}>
                <Store />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
