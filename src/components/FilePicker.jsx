import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const FilePicker = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const readFile = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        onFileSelect(event.target.result);
        console.log('File loaded successfully!');
      };

      reader.onerror = () => {
        console.error('Failed to read the file');
      };

      reader.readAsDataURL(file);
    } else {
      alert('No file selected');
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  return (
    <div className="filepicker-container">
      <div className="filepicker-input-section">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="filepicker-button-container">
        <button className="filepicker-button" onClick={() => readFile(file)}>
          Add Image
        </button>
        <button className="filepicker-button" onClick={clearFile}>
          Clear
        </button>
      </div>
    </div>
  );
};

// PropTypes validation for FilePicker component
FilePicker.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FilePicker;
