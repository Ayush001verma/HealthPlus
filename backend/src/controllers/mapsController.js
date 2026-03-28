const mapsService = require('../services/mapsService');

const getNearbyStores = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Default radius 5000m (5km) if not provided
    const searchRadius = radius ? parseInt(radius, 10) : 5000;
    
    const stores = await mapsService.getNearbyStores(parseFloat(lat), parseFloat(lng), searchRadius);
    
    res.status(200).json(stores);
  } catch (error) {
    console.error('Error in getNearbyStores controller:', error);
    res.status(500).json({ error: 'Internal server error while fetching stores' });
  }
};

module.exports = {
  getNearbyStores
};
