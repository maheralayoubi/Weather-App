// Get the location after the page loaded
window.addEventListener('load', () => {
    // Longitude
    let long;
    // Latitude
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        });
    }
});