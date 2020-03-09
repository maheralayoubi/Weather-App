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
            let windPace = document.querySelector('.transder);

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
                                const {
                                    temperature,
                                    summary,
                                    windSpeed
                                } = data.currently;
                                // Set DOM elemnts from the API
                                temperatureDegree.textContent = temperature;
                                temperatureDescription.textContent = summary;
                                locationTimezone.textContent = data.timezone;
                                windPace.textContent = windSpeed;
                            });
                    });
                }
            });