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
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // This API enables cross-origin requests to anywhere.
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            // API form Darksy
            const api = `${proxy}https://api.darksky.net/forecast/6827c7328316b77e8a44df6fb72b0454/${lat},${long}`;

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
                    // Calculating Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    // Change temp to Celsius - Farenhiet
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        // Replacin - with _ and upper case it to make it same as Skycons naming
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        // This will animate the icon
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
