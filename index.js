const startLoc = createGeolocationCoordinates(48.59798,17.74878)

const end_Loc = createGeolocationCoordinates(48.59800,17.75132)


const date = new Date(); // Get the current Date

// const hours = date.getHours(); // Get the current hour (0-23)
// const minutes = date.getMinutes(); // Get the current minute (0-59)
// const seconds = date.getSeconds(); // Get the current second (0-59)

console.log(`Current time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

// console.log('Old')
// console.log(calculateDistance_old(startLoc,end_Loc))
console.log('New : '+ calculateDistanceHaversine(startLoc,end_Loc))



function createGeolocationCoordinates(latitude, longitude) {

    const geolocationCoordinates = {
        latitude: latitude,
        longitude: longitude,
    };

    return geolocationCoordinates;
}



function calculateDistanceHaversine(startCoords, endCoords) {

    
    function toRadians(degree) {
        return degree * (Math.PI / 180);
    }

    if (isNaN(startCoords.latitude) || 
        isNaN(startCoords.longitude) || 
        isNaN(endCoords.latitude) || 
        isNaN(endCoords.longitude)) {
        return -1;
    }

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
  

