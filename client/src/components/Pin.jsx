import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";

// Fix Leaflet icon issue
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Pin({ item }) {
  const openGoogleMaps = (e) => {
    e.preventDefault();
    const { latitude, longitude } = item;
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  };

  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="flex gap-4 !p-0 overflow-hidden rounded-xl">
          <img
            src={Array.isArray(item.images) ? item.images[0] : item.images}
            alt=""
            className="w-20 h-full object-cover"
            onError={(e) => {
              e.target.src = '/default-property.jpg';
            }}
          />
          <div className="flex flex-col justify-between py-2 pr-2">
            <Link
              to={`/${item.id}`}
              className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors leading-snug"
            >
              {item.title}
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {item.bedroom} bedroom
            </div>
            <b className="text-emerald-700 text-sm font-bold">₹ {Number(item.price).toLocaleString()}</b>
            <a
              href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
              onClick={openGoogleMaps}
              className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;