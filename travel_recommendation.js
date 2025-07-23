function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    console.log(input);
    const results = document.getElementById('results');
    results.innerHTML = '';

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (input.includes('temple') || input.includes('temples')) {
                data.temples.forEach(temple => {
                    displaySearchCard(temple.name, temple.imageUrl, temple.description);
                });
            } else if (input.includes('beach') || input.includes('beaches')) {
                data.beaches.forEach(beach => {
                    displaySearchCard(beach.name, beach.imageUrl, beach.description);
                });
            } else if (input.includes('country') || input.includes('countries')) {
                data.beaches.forEach(country => {
                    displaySearchCard(country.name, country.imageUrl, country.description)})

            }else {
                results.innerHTML = 'No matching category found. Try beach or temple.';
            }
        })
        .catch(error => {
            console.error('Failed to load data:', error);
            results.innerHTML = 'Failed to load data.';
        });
}

function displaySearchCard(name, img, desc) {
    const results = document.getElementById('results');
    const dName = document.createElement('h3')
    dName.innerHTML = name
    const image = document.createElement('img')
    image.src = img
    const description = document.createElement('p')
    description.innerHTML = desc

    results.appendChild(dName)
    results.appendChild(image)
    results.appendChild(description)
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}