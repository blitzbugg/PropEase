import { useState } from "react";

const Slider = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-xl">
      <div className="flex-3">
        <img 
          src={mainImage} 
          alt="Property" 
          className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md" 
        />
      </div>
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            className={`w-16 h-16 object-cover rounded-md cursor-pointer flex-shrink-0 hover:opacity-90 transition-opacity ${
              mainImage === img ? "border-2 border-blue-500 shadow-sm" : "border border-gray-300"
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;