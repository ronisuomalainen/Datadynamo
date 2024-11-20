import '../index.css'

const Store = () => {
  return (
    <div className="store-content">
    <div className="image-section">
      <img src="matto.webp" alt="Tuotekuva"/>
      <button>Lisää kuva</button>
    </div>
    <div className="details-section">
      <p>Lorem ipsum hyvä hiirimatto omalla kuvalla</p>
      <p>1,50€</p>
      <button>Osta</button>
    </div>
  </div>
  )
}

export default Store