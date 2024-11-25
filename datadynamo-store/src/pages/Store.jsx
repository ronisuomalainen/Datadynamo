import { useNavigate } from 'react-router-dom'
import '../index.css'

const Store = () => {
  const navigate = useNavigate()
  const handlePurchase = () => {
      navigate('/order') 
  }
  
  return (
  <div className="store-content">
    <div className="image-section">
      <img src="matto.webp" alt="Tuotekuva"/>
      <button className='add_Picture'>Lisää kuva</button>
    </div>
    <form onSubmit={handlePurchase}>
    <div className="details-section">
      <p>Hiirimatto omalla designillä</p>
      <p>20cm x 35cm - 40€</p>
      <button className='purchase_Btn'>Osta</button>
    </div>
    </form>
  </div>
  )
}
export default Store