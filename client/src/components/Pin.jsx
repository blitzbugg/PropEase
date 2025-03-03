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

function Pin({item}) {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="flex gap-5">
            <img src={item.img} alt="" className="w-16 h-12 object-cover border-2"/>
            <div className="flex flex-col justify-between">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span>{item.bedroom} bedroom</span>
                <b>₹ {item.price}</b>
            </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
