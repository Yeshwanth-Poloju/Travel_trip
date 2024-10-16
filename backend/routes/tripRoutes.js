// /backend/routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { addTrip, getTrips, editTrip, deleteTrip } = require('../controllers/tripController');

router.post('/trips', addTrip);
router.get('/trips', getTrips);
router.put('/trips/:id', editTrip);  // Edit Trip Route
router.delete('/trips/:id', deleteTrip);  // Delete Trip Route

module.exports = router;
