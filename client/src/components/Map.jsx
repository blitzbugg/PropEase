import { MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";


const Map = ({items}) => {

  return (
    <MapContainer center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [12.2602, 77.1461]} zoom={7} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {items.map((item) => (
        <Pin item={item} key={item.id}/>
      ))}
    </MapContainer>
  );
};

export default Map;
