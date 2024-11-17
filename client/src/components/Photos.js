import React, { useState } from 'react';
import './Photos.css';

const PhotosUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [location, setLocation] = useState(''); // To store the location of the photos

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages(imageArray);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleUpload = () => {
    // Here, you would typically send the image and location to your database.
    console.log("Uploading images from location:", location);
    // Resetting the location after upload
    setLocation('');
  };

  return (
    <div className="photos-upload">
      <h2>Upload Your Travel Photos</h2>
      <p>Share your travel memories with the community!</p>
      
      {/* Input to add location */}
      <input
        type="text"
        placeholder="Enter the place where the photo was taken"
        value={location}
        onChange={handleLocationChange}
        className="location-input"
      />
      <br />
      
      {/* File input for image selection */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="image-upload-input"
      />
      <button className="upload-button" onClick={handleUpload}>Upload</button>
      
      {/* Display selected images and the corresponding location */}
      <div className="image-preview">
        {selectedImages.length > 0 && (
          <h3>Uploaded Images:</h3>
        )}
        <div className="image-gallery">
          {selectedImages.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
              <p>{location ? `Location: ${location}` : "No location specified"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosUpload;
