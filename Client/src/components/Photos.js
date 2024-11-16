import React, { useState } from 'react';
import './Photos.css';

const PhotosUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages(imageArray);
  };

  return (
    <div className="photos-upload">
      <h2>Upload Your Travel Photos</h2>
      <p>Share your travel memories with the community!</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      <button className="upload-button">Upload</button>
      
      <div className="image-preview">
        {selectedImages.length > 0 && (
          <h3>Uploaded Images:</h3>
        )}
        <div className="image-gallery">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Uploaded ${index}`}
              className="uploaded-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosUpload;
