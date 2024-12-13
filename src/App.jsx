import { useEffect, useState } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase_client.js';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Store from './pages/Store.jsx';
import Profile from './pages/Profile.jsx';
import Welcome from './pages/Welcome.jsx';
import Order from './pages/Order.jsx';
import Endpage from './pages/Endpage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Payment from './pages/Payment.jsx';
import Navbar from './components/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import GuestRoute from './components/GuestRoute.jsx';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (
          !session?.user &&
          !['/login', '/register'].includes(location.pathname)
        ) {
          navigate('/');
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        //console.log("Logged in user: ", user.email)
      } else {
        //console.log("Not logged in")
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <>
      <Navbar user={user} />
      <div className="main-container">
        <Routes>
          {/* Redirect from /Datadynamo to / */}
          <Route path="/Datadynamo" element={<Navigate to="/" replace />} />
          {/* Guest routes: only accessible if the user is not logged in */}
          <Route
            path="/"
            element={
              <GuestRoute user={user}>
                <Welcome />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute user={user}>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute user={user}>
                <Login />
              </GuestRoute>
            }
          />

          {/* Protected routes: only accessible if the user is logged in */}
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
          <Route
            path="/order"
            element={
              <ProtectedRoute user={user}>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/endpage"
            element={
              <ProtectedRoute user={user}>
                <Endpage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute user={user}>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
