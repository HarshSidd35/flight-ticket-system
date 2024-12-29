const express = require('express');
const router = express.Router();
const { isUser, isAdmin } = require('../middleware/auth');
const Flight = require('../models/Flight');
const redisClient = require('../utils/redisClient');

// Search flights with caching
router.get('/', isUser, async (req, res) => {
  try {
    const { source, destination, travelDate } = req.query;
    console.log(req.query)
    const cacheKey = `flights:${source}:${destination}:${travelDate}`;

    // Check Redis cache
    const cachedFlights = await redisClient.get(cacheKey);
    if (cachedFlights) {
      console.log("returned")
      return res.json(JSON.parse(cachedFlights));
    }

    // Fetch flights from DB
    console.log(new Date(travelDate))
    const flights = await Flight.find({
      source:source,
      destination:destination,
    });
    console.log(flights)
    console.log(source, destination, travelDate)

    // Store result in Redis cache for 10 minutes
    await redisClient.setEx(cacheKey, 600, JSON.stringify(flights));
    return res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get flight details
router.get('/:id', isUser, async (req, res) => {
  try {
    const cacheKey = `flight:${req.params.id}`;

    // Check Redis cache
    const cachedFlight = await redisClient.get(cacheKey);
    if (cachedFlight) {
      return res.json(JSON.parse(cachedFlight));
    }

    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    // Store result in Redis cache for 10 minutes
    await redisClient.setEx(cacheKey, 600, JSON.stringify(flight));
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
