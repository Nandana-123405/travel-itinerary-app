const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  uploadAndGenerate,
  getUserItineraries,
  getItineraryById,
  generateShareableLink,
  getSharedItinerary,
  deleteItinerary
} = require('../controllers/itineraryController');

// Protected routes
router.post('/upload', protect, upload.single('document'), uploadAndGenerate);
router.get('/my-itineraries', protect, getUserItineraries);
router.get('/:id', protect, getItineraryById);
router.post('/share/:id', protect, generateShareableLink);
router.delete('/:id', protect, deleteItinerary);

// Public route for shared itineraries
router.get('/shared/:shareableId', getSharedItinerary);

module.exports = router;