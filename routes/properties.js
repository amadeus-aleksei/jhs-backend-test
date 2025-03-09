const express = require('express');
const axios = require('axios'); 
const router = express.Router();

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"; // Load from .env
// const STRAPI_URL = "https://api.probablyawebsite.com"; // Force HTTPS

router.get('/', async (req, res) => {
  try {
    console.log("🔎 Fetching properties from Strapi...");

    const response = await axios.get(`${STRAPI_URL}/api/properties?populate=*`); // Use populate=*
    
    if (!response.data || !response.data.data) {
      console.error("❌ Strapi response is malformed:", response.data);
      return res.status(500).json({ message: "Invalid Strapi response format" });
    }

    const properties = response.data.data;

    if (!Array.isArray(properties) || properties.length === 0) {
      console.log("⚠️ No properties found.");
      return res.json([]); // Return empty array instead of 404
    }

    const formattedProperties = properties.map(property => {

      return {
      id: property.id,
      address: property.address ?? "No Address Available",
      price: property.price !== null ? `$${property.price}` : "N/A",
      bedrooms: property.bedrooms ?? 0,
      bathrooms: property.bathrooms ?? 0,
      sqft: property.sqft ?? 0,
      listingstatus: property.listingstatus ?? "Unknown",
      zillowlink: property.zillowlink ?? "#",
      images: property.images?.map(img => {
        const imgUrl = img.url;
        return imgUrl.startsWith("/") ? `${STRAPI_URL}${imgUrl}` : imgUrl;
      }) ?? [],
      
    }
  });
  
    console.log("✅ Sending Formatted Properties:", formattedProperties);
    res.json(formattedProperties);
  } catch (err) {
    console.error("❌ Error fetching properties from Strapi:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
