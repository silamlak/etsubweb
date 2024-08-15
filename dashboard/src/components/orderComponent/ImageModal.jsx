import React, { useState } from "react";

const ImageModal = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full cursor-pointer"
        onClick={onClose} // Close the modal when the image is clicked
      />
    </div>
  );
};

export default ImageModal;
