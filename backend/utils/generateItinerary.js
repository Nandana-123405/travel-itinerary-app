const axios = require('axios');

const generateItinerary = async (extractedText, parsedData) => {
  try {
    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // Fallback: Generate mock itinerary if no API key
      return generateMockItinerary(parsedData);
    }

    // Create prompt for AI
    const prompt = `
    You are a travel itinerary planner. Based on the following travel booking information, create a detailed day-by-day itinerary.
    
    Extracted Information:
    - Flights: ${parsedData.flights.join(', ') || 'Not specified'}
    - Hotels: ${parsedData.hotels.join(', ') || 'Not specified'}
    - Dates: ${parsedData.dates.join(', ') || 'Not specified'}
    - Booking References: ${parsedData.bookingRefs.join(', ') || 'Not specified'}
    
    Raw extracted text from document:
    ${extractedText.substring(0, 1500)}
    
    Please provide a response in this exact format:
    
    📅 TRAVEL ITINERARY
    
    Day 1:
    - Morning: [activity]
    - Afternoon: [activity]
    - Evening: [activity]
    
    Day 2:
    - Morning: [activity]
    - Afternoon: [activity]
    - Evening: [activity]
    
    Important Notes:
    - [any important travel tips]
    
    Recommendations:
    - [local food recommendations]
    - [safety tips]
    `;

    // Call Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    return aiResponse;

  } catch (error) {
    console.error('AI API Error:', error.message);
    // Fallback to mock itinerary
    return generateMockItinerary(parsedData);
  }
};

// Fallback mock itinerary generator
const generateMockItinerary = (parsedData) => {
  const hotel = parsedData.hotels[0] || 'your hotel';
  const date = parsedData.dates[0] || 'your travel date';
  
  return `
📅 TRAVEL ITINERARY

Day 1 (Arrival Day):
- Morning: Arrive at destination, check into ${hotel}
- Afternoon: Take a rest and explore local area around ${hotel}
- Evening: Welcome dinner at a local restaurant

Day 2:
- Morning: Visit major tourist attractions (check local opening hours)
- Afternoon: Lunch at a local cafe, then sightseeing
- Evening: Cultural show or local market visit

Day 3:
- Morning: Outdoor activities or museum visit
- Afternoon: Shopping and exploring hidden gems
- Evening: Farewell dinner with local cuisine

Day 4 (Departure):
- Morning: Breakfast at hotel, last minute shopping
- Afternoon: Check out from hotel, travel to airport
- Evening: Departure

Important Notes:
- Keep your booking references handy: ${parsedData.bookingRefs.join(', ')}
- Flight details: ${parsedData.flights.join(', ')}
- Confirm check-in times 24 hours before

Recommendations:
- Try local street food (but ensure hygiene)
- Download offline maps before your trip
- Keep photocopies of important documents
  `;
};

module.exports = generateItinerary;