// Parse extracted text to find travel information
const parseTravelInfo = (text) => {
  const travelInfo = {
    flights: [],
    hotels: [],
    dates: [],
    passengers: [],
    bookingRefs: []
  };

  // Look for flight patterns
  const flightRegex = /(FLIGHT|FLT|flight number|flight)[:\s]*([A-Z0-9]{2,6})/gi;
  let match;
  while ((match = flightRegex.exec(text)) !== null) {
    travelInfo.flights.push(match[2]);
  }

  // Look for dates (various formats)
  const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})/gi;
  while ((match = dateRegex.exec(text)) !== null) {
    travelInfo.dates.push(match[0]);
  }

  // Look for hotel names
  const hotelRegex = /(hotel|resort|inn|suites)[:\s]*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi;
  while ((match = hotelRegex.exec(text)) !== null) {
    travelInfo.hotels.push(match[2]);
  }

  // Look for booking references
  const bookingRegex = /(booking ref|confirmation|PNR|reference)[:\s]*([A-Z0-9]{6,10})/gi;
  while ((match = bookingRegex.exec(text)) !== null) {
    travelInfo.bookingRefs.push(match[2]);
  }

  return travelInfo;
};

module.exports = parseTravelInfo;