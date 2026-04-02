// "use client";

// import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix default marker icons issue
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// interface FarmLocationMapProps {
//   latitude: number;
//   longitude: number;
//   farmerName: string;
// }

// export default function FarmLocationMap({
//   latitude,
//   longitude,
//   farmerName,
// }: FarmLocationMapProps) {
//   return (
//     <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
//       <MapContainer
//         center={[latitude, longitude]}
//         zoom={17}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <LayersControl position="topright">
//           {/* Default Map */}
//           <LayersControl.BaseLayer checked name="Map View">
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />
//           </LayersControl.BaseLayer>

//           {/* Satellite View */}
//           <LayersControl.BaseLayer name="Satellite View">
//             <TileLayer
//               url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//               attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye'
//             />
//           </LayersControl.BaseLayer>
//         </LayersControl>

//         <Marker position={[latitude, longitude]}>
//           <Popup>{farmerName}'s Farm</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }











"use client";

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface FarmLocationMapProps {
  latitude: number;
  longitude: number;
  farmerName: string;
}

export default function FarmLocationMap({
  latitude,
  longitude,
  farmerName,
}: FarmLocationMapProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div className="w-full">
      <div className="h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
        <MapContainer
          center={[latitude, longitude]}
          zoom={17}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <LayersControl position="topright">
            {/* Default Map */}
            <LayersControl.BaseLayer checked name="Map View">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
            </LayersControl.BaseLayer>

            {/* Satellite View */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye'
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <Marker position={[latitude, longitude]}>
            <Popup>{farmerName}'s Farm</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Google Maps Button */}
      <div className="mt-3 flex justify-end">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}