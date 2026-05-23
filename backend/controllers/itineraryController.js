const Itinerary = require('../models/Itinerary');
const extractText = require('../utils/extractText');
const parseTravelInfo = require('../utils/parseExtractedData');
const generateItinerary = require('../utils/generateItinerary');
const crypto = require('crypto');

// @desc    Upload document and generate itinerary
// @route   POST /api/itinerary/upload
// @access  Private
const uploadAndGenerate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Step 1: Extract text from file
    const extractedText = await extractText(req.file);
    
    // Step 2: Parse travel information
    const parsedData = parseTravelInfo(extractedText);
    
    // Step 3: Generate AI itinerary
    const aiItinerary = await generateItinerary(extractedText, parsedData);
    
    // Step 4: Save to database
    const itinerary = await Itinerary.create({
      user: req.user.id,
      title: `Trip - ${new Date().toLocaleDateString()}`,
      originalFileName: req.file.originalname,
      extractedData: parsedData,
      aiItinerary: aiItinerary
    });
    
    res.status(201).json({
      message: 'Itinerary generated successfully',
      itinerary: {
        id: itinerary._id,
        title: itinerary.title,
        extractedData: itinerary.extractedData,
        aiItinerary: itinerary.aiItinerary,
        createdAt: itinerary.createdAt
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all user itineraries
// @route   GET /api/itinerary/my-itineraries
// @access  Private
const getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single itinerary
// @route   GET /api/itinerary/:id
// @access  Private
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    // Check if user owns this itinerary
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate shareable link
// @route   POST /api/itinerary/share/:id
// @access  Private
const generateShareableLink = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    // Check ownership
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Generate unique shareable ID if not exists
    if (!itinerary.shareableId) {
      itinerary.shareableId = crypto.randomBytes(8).toString('hex');
      await itinerary.save();
    }
    
    const shareableUrl = `${req.protocol}://${req.get('host')}/api/itinerary/shared/${itinerary.shareableId}`;
    
    res.json({ shareableUrl, shareableId: itinerary.shareableId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get shared itinerary (no auth required)
// @route   GET /api/itinerary/shared/:shareableId
// @access  Public
const getSharedItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ 
      shareableId: req.params.shareableId 
    });
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    res.json({
      title: itinerary.title,
      aiItinerary: itinerary.aiItinerary,
      extractedData: itinerary.extractedData,
      createdAt: itinerary.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete itinerary
// @route   DELETE /api/itinerary/:id
// @access  Private
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await itinerary.deleteOne();
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadAndGenerate,
  getUserItineraries,
  getItineraryById,
  generateShareableLink,
  getSharedItinerary,
  deleteItinerary
};