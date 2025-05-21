document.getElementById('location-form').addEventListener('submit', function(event) { //run this function when someone submit
    event.preventDefault(); // prevent reload web

    // Get the values from the form
    const city = document.getElementById('city').value;

    // Send data to back-end server
    fetch(`http://localhost:5000/get_weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            // Update location, sea level pressure, surface pressure
            document.getElementById('location').textContent = `Location: ${data.name}`;
            if (data.main.sea_level) {
                document.getElementById('sea-level-pressure').textContent = `Sea Level Pressure: ${data.main.sea_level} hPa`;
            } else {
                document.getElementById('sea-level-pressure').textContent = 'Sea Level Pressure: Data not available';
            }
            document.getElementById('surface-pressure').textContent = `Surface Pressure: ${data.main.pressure} hPa`;
            
            const floodRiskElement = document.getElementById('flood-risk');
            if (data.main.sea_level && data.main.sea_level > 1020) { // 1020 hPa which is unit to count the pressure
                floodRiskElement.textContent = '⚠️ Warning: Increase high level water indicates flood risks!';
                floodRiskElement.classList.add('warning'); // add and remove from css
                floodRiskElement.classList.remove('success');
            } else {
                floodRiskElement.textContent = '✅ Sea level is within a normal range.';
                floodRiskElement.classList.add('success');
                floodRiskElement.classList.remove('warning');
            }

            // Show the result section
            document.getElementById('result').classList.remove('hidden');
        })

        // if it goes wrong 
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching data.');
        });
});
