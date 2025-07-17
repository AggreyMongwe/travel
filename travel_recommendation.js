window.onload = () => {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries;
            countries.forEach(country => {
                country.cities.forEach(city => {
                    displayCountryCard(city.name, city.imageUrl, city.description);
                });
            });
        })
        .catch(error => console.error('Failed to load countries:', error));
};

function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('results');
    results.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if (input.includes('temple')) {
                data.temples.forEach(temple => {
                    displaySearchCard(temple.name, temple.imageUrl, temple.description);
                });
            } else if (input.includes('beach')) {
                data.beaches.forEach(beach => {
                    displaySearchCard(beach.name, beach.imageUrl, beach.description);
                });
            } else {
                results.innerHTML = '<p>No matching category found. Try beach or temple.</p>';
            }
        })
        .catch(error => {
            console.error('Failed to load data:', error);
            results.innerHTML = '<p>Failed to load data.</p>';
        });
}

function displayCountryCard(name, img, desc) {
    const results = document.getElementById('countryResults');
    results.innerHTML += `
        <div class="card">
            <img src="${img}" alt="${name}">
            <h3>${name}</h3>
            <p>${desc}</p>
        </div>
    `;
}

function displaySearchCard(name, img, desc) {
    const results = document.getElementById('results');
    results.innerHTML += `
        <div class="card">
            <img src="${img}" alt="${name}">
            <h3>${name}</h3>
            <p>${desc}</p>
        </div>
    `;
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}