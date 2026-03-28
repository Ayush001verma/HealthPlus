// Using native fetch in Node 18+

const getNearbyStores = async (lat, lng, radius = 5000) => {
  console.log(`[MAPS-DEBUG] Fetching stores near (${lat}, ${lng}) with radius ${radius} using Mappls API`);

  const apiKey = process.env.MAPPLS_API_KEY;
  const clientId = process.env.MAPPLS_CLIENT_ID;
  const clientSecret = process.env.MAPPLS_CLIENT_SECRET;

  let accessToken = null;
  let isStaticKey = false;

  if (apiKey && !apiKey.includes('your_') && apiKey.length > 5) {
    // 1A. Use Static REST API Key
    console.log('[MAPS-DEBUG] Using Static Mappls REST API Key...');
    accessToken = apiKey;
    isStaticKey = true;
  } else if (clientId && clientSecret && !clientId.includes('your_') && !clientSecret.includes('your_')) {
    // 1B. Use OAuth Client ID / Secret
    try {
      console.log('[MAPS-DEBUG] Requesting OAuth token from Mappls...');
      const authParams = new URLSearchParams();
      authParams.append('grant_type', 'client_credentials');
      authParams.append('client_id', clientId);
      authParams.append('client_secret', clientSecret);

      const authResponse = await fetch('https://outpost.mappls.com/api/security/oauth/token', {
        method: 'POST',
        body: authParams,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (!authResponse.ok) throw new Error(`Mappls auth failed: ${authResponse.status}`);
      const authData = await authResponse.json();
      accessToken = authData.access_token;
      isStaticKey = false;
    } catch (err) {
      console.error('[MAPS-DEBUG] OAuth Error:', err.message);
      throw err;
    }
  } else {
    throw new Error('Mappls API credentials missing. Add MAPPLS_API_KEY (or MAPPLS_CLIENT_ID / SECRET) to .env');
  }

  try {
    // 2. Fetch Nearby Places
    console.log('[MAPS-DEBUG] Fetching nearby places from Mappls...');
    let nearbyResponse;
    
    if (isStaticKey) {
       console.log('[MAPS-DEBUG] Trying static key URL parameters...');
       
       // Known fallback endpoints for Mappls REST API keys
       const endpoints = [
         `https://atlas.mappls.com/api/places/nearby/json?keywords=pharmacy,chemist,medical,store&refLocation=${lat},${lng}&radius=${radius}&access_token=${accessToken}`,
         `https://search.mappls.com/search/places/nearby/json?keywords=pharmacy,chemist,medical,store&refLocation=${lat},${lng}&radius=${radius}&access_token=${accessToken}`,
         `https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy,chemist,medical,store&refLocation=${lat},${lng}&radius=${radius}&access_token=${accessToken}`
       ];

       for (const url of endpoints) {
         console.log(`[MAPS-DEBUG] Trying static endpoint...`);
         nearbyResponse = await fetch(url);
         if (nearbyResponse.ok) {
           console.log(`[MAPS-DEBUG] Success with static endpoint!`);
           break;
         }
       }

       if (!nearbyResponse || !nearbyResponse.ok) {
         throw new Error('Mappls static REST API key rejected by all endpoints. Please use MAPPLS_CLIENT_ID and MAPPLS_CLIENT_SECRET instead for proper OAuth.');
       }
       
    } else {
       // Standard OAuth
       const nearbyUrl = `https://atlas.mappls.com/api/places/nearby/json?keywords=pharmacy,chemist,medical,store&refLocation=${lat},${lng}&radius=${radius}`;
       nearbyResponse = await fetch(nearbyUrl, {
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${accessToken}`
         }
       });

       if (!nearbyResponse.ok) {
         const errorText = await nearbyResponse.text();
         console.error('[MAPS-DEBUG] Mappls Nearby API Failed:', errorText);
         throw new Error(`Mappls Nearby API failed: ${nearbyResponse.status}`);
       }
    }

    const data = await nearbyResponse.json();
    
    if (!data || !data.suggestedLocations) {
      console.warn('[MAPS-DEBUG] Invalid response format from Mappls or no locations found.');
      return [];
    }

    console.log(`[MAPS-DEBUG] Successfully fetched ${data.suggestedLocations.length} locations from Mappls`);

    // 3. Map to existing frontend format
    const stores = data.suggestedLocations.map(location => {
      // Return objects mapped identically to the previous Overpass API approach
      return {
        id: location.eLoc, // eLoc is Mappls unique place ID
        name: location.placeName || "Unknown Pharmacy",
        lat: location.latitude,
        lng: location.longitude,
        address: location.placeAddress || "Address not provided",
        phone: location.phone || "N/A",
        opening_hours: "N/A" // Opening hours not typically standard in basic radius search payload
      };
    });

    return stores;
  } catch (err) {
    console.error('[MAPS-DEBUG] Error using Mappls API:', err.message);
    throw err;
  }
};

module.exports = {
  getNearbyStores
};
