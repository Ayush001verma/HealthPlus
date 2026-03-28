import axios from 'axios';

// Assuming your backend runs on port 3001
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface Store {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  opening_hours: string;
}

export const getNearbyStores = async (lat: number, lng: number, radius: number = 5000): Promise<Store[]> => {
  try {
    const response = await axios.get(`${API_URL}/maps/nearby-stores`, {
      params: { lat, lng, radius },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby stores:', error);
    throw error;
  }
};
