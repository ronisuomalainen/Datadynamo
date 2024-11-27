import { useNavigate } from 'react-router-dom'
import '../index.css'
import FilePicker from '../components/FilePicker'
import { useState } from 'react'

const Store = () => {
  const navigate = useNavigate()
  const [uploadedImage, setUploadedImage] = useState(null)
  const [designScale, setDesignScale] = useState(1)

  const handlePurchase = (e) => {
    e.preventDefault()
    navigate('/order') 
  }

  const handleScaleChange = (event) => {
    setDesignScale(event.target.value)
  }

  /*const handleImagePosition = document.getElementById("input"); {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    handleImagePosition.addEventListener("mousedown", (event) => {
      isDragging = true;
      offsetX = event.clientX - car.getBoundingClientRect().left;
      offsetY = event.clientY - car.getBoundingClientRect().top;
      car.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        car.style.left = `${x}px`;
        car.style.top = `${y}px`;
      }
    });
  }*/
  
  return (
    <div className="store-content">
      <div className="image-section">
        <img src="matto.png" alt="Tuotekuva" />
    
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt='Oma design'
            className='design'
            style={{
              transform: `scale(${designScale})`
            }}
          />
        )}
        <FilePicker onFileSelect={setUploadedImage}/>
        <label htmlFor="scale-slider">Säädä kuvan kokoa</label>
        <input
          id='scale-slider' 
          type="range"
          min='0.1'
          max='1'
          step='0.05'
          value={designScale}
          onChange={handleScaleChange}
        />
        <span>{Math.round(designScale * 100)}%</span>
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