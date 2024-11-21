import { Navigate, useNavigate } from 'react-router-dom'
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
      <p>Lorem ipsum hyvä hiirimatto omalla kuvalla</p>
      <p>1,50€</p>
      <button className='purchase_Btn'>Osta</button>
    </div>
    </form>
  </div>
  
  )

}
export default Store