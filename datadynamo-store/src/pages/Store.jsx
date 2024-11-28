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
        <label htmlFor="scale-slider">Säädä kuvan kokoa</label>
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
        <label htmlFor="rotation-slider">Käännä kuvaa</label>
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
        <span>{Math.round(designScale * 100)}%</span>
        <span>{designRotation}°</span>
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