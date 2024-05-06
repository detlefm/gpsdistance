let savedPosition = NaN;
let doDebug = false;
let activeElement = 0

const coordButton = document.getElementById('lastCoord')
const calculateButton = document.getElementById('calculateButton');
const debugText = document.getElementById('debugText')

if (isNaN(savedPosition)){
    navigator.geolocation.getCurrentPosition((position) =>{
        savedPosition = position.coords
        if (doDebug==true){
            savedPosition = getNextCoordinates()
        }
        coordButton.innerText = `${savedPosition.latitude},${savedPosition.longitude}`    
})};


function resultLine(distance, start,end){
    return `${distance} : ${start.latitude},${start.longitude}-${end.latitude},${end.longitude}`
}


function addLine(textField, newline){
    const textWithLineBreak = `${textField.value}\n${newline}`; // Add line with newline
    textField.value = textWithLineBreak;
}

coordButton.addEventListener('click', () => {
    coordButton.innerText = 'Get GPS ...'
    // Get current GPS position again (replace this with actual geolocation API call)
    navigator.geolocation.getCurrentPosition((position) => {
        let currentPosition = position.coords;
        if (doDebug==true){
            currentPosition = getNextCoordinates()
        }   
        savedPosition = currentPosition;
        coordButton.innerText = `${savedPosition.latitude},${savedPosition.longitude}`
    });
});

calculateButton.addEventListener('click', () => {
    calculateButton.innerText = 'Bitte warten ...'
    // Get current GPS position again (replace this with actual geolocation API call)
    navigator.geolocation.getCurrentPosition((position) => {
        let currentPosition = position.coords;
        if (doDebug==true){
            currentPosition = getNextCoordinates()
        }   
        // Calculate distance (replace this with actual distance calculation logic)
        const km = calculateDistance(savedPosition, currentPosition);
        const distance = (km * 1000).toFixed(1)
        // distanceOutput.value = distance;
        //distanceButton.innerText = distance;
        coordButton.innerText = `${savedPosition.latitude},${savedPosition.longitude}`
        const line = resultLine(distance,savedPosition,currentPosition)
        addLine(debugText,line)
        savedPosition = currentPosition;
        calculateButton.innerText = distance;
        });
    });





function getNextCoordinates(){
    const coordinates = [
        { latitude: 48.5978312, longitude: 17.8461754 },
        { latitude: 48.5929992, longitude: 17.8521006 }];
    if (activeElement >= coordinates.length){
        return {latitude: 48.59791,longitude:17.74895}
    }
    activeElement = activeElement +1
    return coordinates[activeElement-1]   
}

function createCoordinates(latitude, longitude) {

    const geolocationCoordinates = {
        latitude: latitude,
        longitude: longitude,
    };

    return geolocationCoordinates;
}


function calculateDistance(startCoords, endCoords) {
    const earthRadius = 6371; // Earth radius in kilometers

    const startLat = toRadians(startCoords.latitude);
    const startLon = toRadians(startCoords.longitude);
    const endLat = toRadians(endCoords.latitude);
    const endLon = toRadians(endCoords.longitude);

    const deltaLat = endLat - startLat;
    const deltaLon = endLon - startLon;

    const sinHalfDeltaLat = Math.sin(deltaLat / 2);
    const sinHalfDeltaLon = Math.sin(deltaLon / 2);

    const a = sinHalfDeltaLat * sinHalfDeltaLat +
            Math.cos(startLat) * Math.cos(endLat) *
            sinHalfDeltaLon * sinHalfDeltaLon;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
}

function toRadians(degree) {
    return degree * (Math.PI / 180);
}



function calculateTargetPosition(startingPosition, angle, distance) {
   
  
    // Extract starting latitude and longitude
    const startingLatitude = startingPosition.latitude;
    const startingLongitude = startingPosition.longitude;
  
    // Convert distance to radians
    const distanceInRadians = distance / (6371 * 1000); // Earth radius in meters
  
    // Calculate angular displacement
    const angularDisplacement = angle * Math.PI / 180;
  
    // Calculate change in latitude
    const deltaLatitude = Math.atan2(
      Math.sin(angularDisplacement) * distanceInRadians,
      Math.cos(angularDisplacement) * Math.cos(startingLatitude)
    );
  
    // Calculate target latitude
    const targetLatitude = startingLatitude + deltaLatitude;
  
    // Calculate change in longitude
    const deltaLongitude = distanceInRadians * Math.sin(angularDisplacement) / Math.cos(targetLatitude);
  
    // Calculate target longitude
    const targetLongitude = startingLongitude + deltaLongitude;
  
    // Ensure longitude is within valid range
    targetLongitude = normalizeLongitude(targetLongitude);
  
    // Return target position
    //return [targetLatitude, targetLongitude];
    return {latitude:targetLatitude,longitude:targetLongitude};
  }
  
  // Function to check if coordinates are in decimal degrees format
  function isDecimalDegrees(coordinates) {
    return (
      coordinates[0] >= -90 && coordinates[0] <= 90 &&
      coordinates[1] >= -180 && coordinates[1] <= 180
    );
  }
  
  // Function to convert degrees to decimal degrees
  function convertDegreesToDecimal(degrees) {
    return [degrees[0], degrees[1]];
  }
  
  // Function to normalize longitude to be within -180 to 180 degrees
  function normalizeLongitude(longitude) {
    while (longitude < -180) {
      longitude += 360;
    }
  
    while (longitude > 180) {
      longitude -= 360;
    }
  
    return longitude;
  }
  
  // Example usage
//   const startingPosition = [51.505, -0.09]; // London, UK
//   const startingPosition = {latitude:51.505, longitude:-0.09}
//   const angle = 45; // Degrees
//   const distance = 100000; // Meters
  
//   const targetPosition = calculateTargetPosition(startingPosition, angle, distance);
//   console.log("Target position:", targetPosition);
  