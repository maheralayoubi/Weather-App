// Get the location after the page loaded
window.addEventListener('load', () => {
    // Longitude
    let long;
    // Latitude
    let lat;
    // Connecting with HTML
    let temperatureDescription = document.querySelector('.temprature-description');
    let temperatureDegree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let windPace = document.querySelector('.wind-pace');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // This API enables cross-origin requests to anywhere.
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            // API form Darksy 
            const api = `${proxy}https://api.darksky.net/forecast/2e5c7457953c48614814c66834bfa7d3/${lat},${long}`;

            // Get the information from the API
            fetch(api)
                .then(response => {
                    // Convert the info into JSON
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        temperature,
                        summary,
                        icon,
                        windSpeed
                    } = data.currently;
                    // Set DOM elemnts from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    windPace.textContent = windSpeed;
                    // Set Icon
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new skycons({
            color: "white"
        });
        // Replacin - with _ and upper case it to make it same as Skycons code
        const currentIcon = icon.replace(/-/g, "_").upperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }
});