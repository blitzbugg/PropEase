import { useState } from "react";

const Slider = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <img
          src={mainImage}
          alt="Property"
          className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-sm"
        />
      </div>
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-1 md:pb-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl cursor-pointer flex-shrink-0 transition-all duration-200 ${
              mainImage === img
                ? "ring-2 ring-emerald-500 ring-offset-2 shadow-md"
                : "opacity-70 hover:opacity-100 border border-slate-200"
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;