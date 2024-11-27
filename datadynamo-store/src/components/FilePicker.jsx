import React, { useRef, useState } from 'react'

const FilePicker = ({ onFileSelect }) => {
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const readFile = (type) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        onFileSelect(event.target.result)
        console.log('File loaded succesfully!')
      }

      reader.onerror = () => {
        console.error("Failed to read the file")
      }

      reader.readAsDataURL(file)
    } else {
      alert('Tiedostoa ei valittu')
    }
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onFileSelect(null)
  }

  return (
    <div className='filepicker-container'>
      <div className="filepicker-input-section">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className='filepicker-button-container'>
        <button className='filepicker-button' onClick={() => readFile(file)}>
          Lisää kuva
        </button>
        <button className='filepicker-button' onClick={clearFile}>
          Tyhjennä
        </button>
      </div>
    </div>
  )
}

export default FilePicker