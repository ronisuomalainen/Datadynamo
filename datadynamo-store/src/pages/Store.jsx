import { useNavigate } from 'react-router-dom'
import '../index.css'
import FilePicker from '../components/FilePicker'
import { useRef, useState } from 'react'

const Store = () => {
  const navigate = useNavigate()

  const [uploadedImage, setUploadedImage] = useState(null)
  const [designScale, setDesignScale] = useState(1)
  const [designPosition, setDesignPosition] = useState({ x:0, y:0 })
  const [designRotation, setDesignRotation] = useState(0)

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('')
  const [price, setPrice] = useState(0)

  const mouseMatRef = useRef(null)

  const handlePurchase = (e) => {
    e.preventDefault()
    navigate('/order', { state: { size, price, quantity } }) 
  }

  const handleScaleChange = (e) => {
    setDesignScale(e.target.value)
  }

  const handleRotationChange = (e) => {
    setDesignRotation(e.target.value)
  }

  const handlePositionXChange = (e) => {
    const percentage = e.target.value
    if (mouseMatRef.current) {
      const divWidth = mouseMatRef.current.offsetWidth
      const positionX = (percentage / 100) * divWidth
      setDesignPosition(prevPosition => ({ ...prevPosition, x: positionX }))
    }
  }

  const handlePositionYChange = (e) => {
    const percentage = e.target.value
    if (mouseMatRef.current) {
      const containerHeight = mouseMatRef.current.offsetHeight
      const positionY = (percentage / 100) * containerHeight
      setDesignPosition(prevPosition => ({ ...prevPosition, y: positionY }))
    }
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  const resetQuantity = () => {
    setQuantity(1)
  }

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value
    setSize(selectedSize)

    if (selectedSize === 'small') {
      setPrice(18)
    } else if (selectedSize === 'normal') {
      setPrice(30)
    } else if (selectedSize === 'large') {
      setPrice(45)
    } else {
      setPrice(0)
    }
  }

  return (
    <div className="store-content">
      <div className="image-section">
        <div className="mouse-mat" ref={mouseMatRef}>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Oma design"
              className="design"
              style={{
                transform: `
                  translate(${designPosition.x}px, ${designPosition.y}px)
                  scale(${designScale})
                  rotate(${designRotation}deg)
                `,
              }}
            />
          )}
          <input
            id="position-y-slider"
            type="range"
            min="-50"
            max="50"
            step="1"
            value={designPosition.y / (mouseMatRef.current?.offsetHeight || 1) * 100}
            onChange={handlePositionYChange}
            className="vertical-slider"
          />
          <input
            id="position-x-slider"
            type="range"
            min="-50"
            max="50"
            step="1"
            value={designPosition.x / (mouseMatRef.current?.offsetWidth || 1) * 100}
            onChange={handlePositionXChange}
            className="horizontal-slider"
          />
        </div>
        
        <FilePicker onFileSelect={setUploadedImage} />
        <label htmlFor="scale-slider">Säädä kuvan kokoa {Math.round(designScale * 100)}%</label>
        <input
          id="scale-slider"
          type="range"
          min="0.1"
          max="2"
          step="0.01"
          value={designScale}
          onChange={handleScaleChange}
          className="slider"
        />
        <label htmlFor="rotation-slider">Käännä kuvaa {designRotation}°</label>
        <input
          id="rotation-slider"
          type="range"
          min="-360"
          max="360"
          step="1"
          value={designRotation}
          onChange={handleRotationChange}
          className="slider"
        />
      </div>

      <form onSubmit={handlePurchase}>
        <div className="details-section">
          <h2>Hiirimatto omalla designillä</h2>
          <select id="size" onChange={handleSizeChange} required>
            <option defaultValue="">Valitse koko</option>
            <option value="small">Small 18€</option>
            <option value="normal">Normal 30€</option>
            <option value="large">Large 45€</option>
          </select>
          <div className="quantity-selector">
            <button type="button" onClick={decreaseQuantity} className="quantity-button">-</button>
            <div className="quantity-display">{quantity}</div>
            <button type="button" onClick={increaseQuantity} className="quantity-button">+</button>
            <div className="reset-icon" onClick={resetQuantity}>↻</div>
          </div>
          <p><strong>Hinta yhteensä:</strong> {price * quantity} €</p>
          <button type="submit" className="purchase_Btn">Osta</button>
          <p>Mikäli haluat tilata isomman erän ota yhteyttä info@datadynamo.fi</p>
          <p><h2><strong>Tuotteiden koot:</strong></h2><p />
            Small: K 27cm x L 32cm<p />
            Medium: K 40cm x L 45cm<p />
            Large: K 40cm x L 90cm
          </p>
        </div>
      </form>
    </div>
  )
}

export default Store