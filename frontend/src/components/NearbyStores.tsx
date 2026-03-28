import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getNearbyStores, Store } from '../api/mapsApi';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet not showing correctly
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Medical Store Icon
const medicalIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically update map center
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const NearbyStores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Default to a central location if denied geolocation
  const [userLocation, setUserLocation] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [locationLoaded, setLocationLoaded] = useState<boolean>(false);

  // Search location state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchingLocation, setSearchingLocation] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
          setLocationLoaded(true);
          fetchStores(lat, lng);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied or unavailable. Showing default map. You can also search explicitly.");
          setLocationLoaded(true);
          fetchStores(userLocation[0], userLocation[1]); // Fetch for default
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocationLoaded(true);
      fetchStores(userLocation[0], userLocation[1]); // Fetch for default
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchingLocation(true);
    setError(null);
    try {
      // Use OpenStreetMap Nominatim API to geocode the query
      // Added User-Agent as required by Nominatim usage policy
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`, {
        headers: {
          'User-Agent': 'HealthPlus-Medical-Finder'
        }
      });
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setUserLocation([lat, lon]);
        setLocationLoaded(true); // Ensure map displays even if geolocation was stuck
        fetchStores(lat, lon);
      } else {
        setError("Location not found. Please try another search term.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setError("Failed to search location. Please try again.");
    } finally {
      setSearchingLocation(false);
    }
  };

  const fetchStores = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const fetchedStores = await getNearbyStores(lat, lng, 3000); // 3km radius
      setStores(fetchedStores);
    } catch (err) {
      console.error("Fetch stores error:", err);
      setError("Failed to fetch nearby stores. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl my-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Nearby Medical Stores</h2>
          <p className="text-gray-500 mt-2">Find pharmacies and medical supplies near your current location.</p>
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full md:w-auto mt-4 md:mt-0 relative group">
          <input 
            type="text" 
            placeholder="Search specific location..." 
            className="w-full md:w-72 px-4 py-2 border border-blue-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={searchingLocation}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition disabled:bg-blue-300 shadow-sm"
          >
            {searchingLocation ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}

      {locationLoaded && (
        <div className="w-full h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-inner flex relative">
          
          {/* Map Layer */}
          <div className="w-full md:w-2/3 h-full">
            <MapContainer center={userLocation} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={userLocation} />
              
              {/* User Location Marker */}
              <Marker position={userLocation}>
                <Popup>You are here</Popup>
              </Marker>

              {/* Store Markers */}
              {stores.map((store) => (
                <Marker 
                  key={store.id} 
                  position={[store.lat, store.lng]}
                  icon={medicalIcon}
                >
                  <Popup>
                    <div className="font-sans">
                      <strong className="text-lg text-blue-800">{store.name}</strong>
                      <div className="mt-2 text-sm text-gray-700">
                        {store.address !== "Address not provided" && <p>📍 {store.address}</p>}
                        {store.phone !== "N/A" && <p>📞 {store.phone}</p>}
                        {store.opening_hours !== "N/A" && <p>🕒 {store.opening_hours}</p>}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* List Layer */}
          <div className="hidden md:block w-1/3 h-full bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-4 bg-white border-b border-gray-200 sticky top-0 font-bold text-gray-700 shadow-sm z-10">
              {stores.length} Stores Found
            </div>
            <div className="p-4 space-y-4">
              {stores.length === 0 && !loading ? (
                <p className="text-gray-500 text-center mt-10">No stores found within 3km.</p>
              ) : (
                stores.map(store => (
                  <div key={store.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{store.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{store.address}</p>
                    <div className="mt-3 flex gap-2">
                       {store.phone !== "N/A" && (
                         <a href={`tel:${store.phone}`} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Call</a>
                       )}
                       <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          Directions
                        </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyStores;
