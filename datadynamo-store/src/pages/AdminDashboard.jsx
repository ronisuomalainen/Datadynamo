import { useState, useEffect } from "react"
import { supabase } from "../services/supabase_client"

const AdminDashboard = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching orders: ', error)
    } else {
      setOrders(data)
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    const adminPassword = 'admin123'
    if (password === adminPassword) {
      setIsAuthenticated(true)
    } else {
      alert('Väärä salasana')
    }
  }
  
  if (!isAuthenticated) {
    return (
      <div className="password-container">
        <h2>Admin Dashboard - Anna Salasana</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Salasana"
            required
          />
          <button type="submit">Ok</button>
        </form>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <h2>Viimeiset 20 tilausta</h2>
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Tuote</th>
            <th>Koko</th>
            <th>Määrä</th>
            <th>Kokonaishinta</th>
            <th>Päivämäärä</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.product}</td>
              <td>{order.size}</td>
              <td>{order.quantity}</td>
              <td>{order.price} €</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard