import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default Leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Contact: React.FC = () => {
  const position: [number, number] = [33.888630, 35.495480]; // Beirut coordinates

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Contact Us</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {/* Info Card */}
        <div style={{
          flex: "1 1 300px",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          minWidth: "300px"
        }}>
          <h2>Our Office</h2>
          <p>123 Main Street, Beirut, Lebanon</p>
          <p>Phone: +961 71 234 567 (Africell)</p>
          <p>Email: africell.com</p>
          <p>Website: <a href="https://www.africell.com/contact-press/" target="_blank" rel="noopener noreferrer">www.africell/contactUs.com</a></p>
        </div>

        {/* Map */}
        <div style={{ flex: "2 1 500px", minHeight: "400px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Our Office Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
