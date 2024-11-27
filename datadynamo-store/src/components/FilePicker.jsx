import React, { useState } from 'react'

const FilePicker = () => {
  const [file, setFile] = useState(null)

  const readFile = (type) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
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

  return (
    <div className='filepicker-container'>
      <div className="filepicker-input-section">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <p className='filepicker-file-name'>
          {file ? file.name : "Tiedostoa ei valittu"}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <button className='filepicker-button' onClick={() => readFile(file)}>
          Lisää kuva
        </button>
        <button className='filepicker-button' onClick={() => setFile(null)}>
          Tyhjennä
        </button>
      </div>
    </div>
  )
}

export default FilePicker