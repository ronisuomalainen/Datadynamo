import { useNavigate } from 'react-router-dom'
import '../index.css'
import FilePicker from '../components/FilePicker'
import { useState } from 'react'

const Store = () => {
  const navigate = useNavigate()

  const [uploadedImage, setUploadedImage] = useState(null)
  const [designScale, setDesignScale] = useState(1)
  const [designPosition, setDesignPosition] = useState({ x:0, y:0 })
  const [designRotation, setDesignRotation] = useState(0)
  const [designIsMoving, setDesignIsMoving] = useState(false)

  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)

  

  const handlePurchase = (e) => {
    e.preventDefault()
    navigate('/order') 
  }

  const handleScaleChange = (e) => {
    setDesignScale(e.target.value)
  }

  const handleRotationChange = (e) => {
    setDesignRotation(e.target.value)
  }

  const handleMouseDown = (e) => {
    setDesignIsMoving(true)
    setStartX(e.clientX - designPosition.x)
    setStartY(e.clientY - designPosition.y)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (moveEvent) => {
    if (designIsMoving) {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      setDesignPosition({ x: deltaX, y: deltaY })
    }
  }

  const handleMouseUp = () => {
    setDesignIsMoving(false)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const resetQuantity = () => {
    setQuantity(1);
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  return (
    <div className="store-content">
      <div className="image-section">
        <div className='mouse-mat' >
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt='Oma design'
              className='design'
              style={{
                transform: `
                    translate(${designPosition.x}px, ${designPosition.y}px)
                    scale(${designScale})
                    rotate(${designRotation}deg)
                  `,
                cursor: designIsMoving ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
            />
          )}
        </div>
        <FilePicker onFileSelect={setUploadedImage}/>
        <label htmlFor="scale-slider">Säädä kuvan kokoa {Math.round(designScale * 100)}%</label>
        <input
          id='scale-slider' 
          type="range"
          min='0.1'
          max='2'
          step='0.01'
          value={designScale}
          onChange={handleScaleChange}
          className='slider'
        />
        <label htmlFor="rotation-slider">Käännä kuvaa {designRotation}°</label>
        <input
          id='rotation-slider' 
          type="range"
          min='-360'
          max='360'
          step='1'
          value={designRotation}
          onChange={handleRotationChange}
          className='slider'
        />
      </div>
      <form onSubmit={handlePurchase}>
        <div className="details-section">
          <h2>Hiirimatto omalla designillä</h2>
          <select id="size" onChange={handleInputChange} required>
                <option defaultValue="">Valitse koko</option>
                <option value="small">Small 18€/kpl</option>
                <option value="normal">Normal 30€/kpl</option>
                <option value="large">Large 45€/kpl</option>
          </select>
          <div className="quantity-selector">
              <button type="button" onClick={decreaseQuantity} className="quantity-button">-</button>
              <div className="quantity-display">{quantity}</div>
              <button type="button" onClick={increaseQuantity} className="quantity-button">+</button>
              <div className="delete-icon" onClick={resetQuantity}>🗑️</div>
          </div>
            <button className='purchase_Btn'>Osta</button>
            <p>Mikäli haluat tilata isomman erän ota yhteyttä info@datadynamo.fi</p>
            <p>Tuotteiden koot:<p></p>
              Small: K 27cm x L 32cm<p></p>
              Medium: K 40cm x L 45cm<p></p>
              Large: K 40cm x L 90cm
            </p>
        </div>
      </form>
    </div>
  )
}
export default Store