// /backend/routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { addTrip, getTrips, editTrip, deleteTrip } = require('../controllers/tripController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/trips',authenticateToken, addTrip);
router.get('/trips',authenticateToken, getTrips);
router.put('/trips/:id',authenticateToken, editTrip);  // Edit Trip Route
router.delete('/trips/:id',authenticateToken, deleteTrip);  // Delete Trip Route

module.exports = router;
