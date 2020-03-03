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

            // This API enables cross-origin requests to anywhere.
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/2e5c7457953c48614814c66834bfa7d3/${lat},${long}`;

            // Get the information from the API
            fetch(api)
                .then(response => {
                    // Convert the info into JSON
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });
        });
    }
});