document.getElementById('btnBuscar').addEventListener('click', buscarPais);

document.getElementById('inputSearch').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    buscarPais();
  }
});

function buscarPais() {
  const query = document.getElementById('inputSearch').value.trim();
  const url = `https://restcountries.com/v3.1/name/${query}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se encontraron banderas');
      }
      return response.json();
    })
    .then(data => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';

      data.forEach(country => {
        const countryCard = `
          <div class="col">
            <div class="card">
              <img src="${country.flags.svg}" class="card-img-top" alt="Flag of ${country.name.common}">
              <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'No tiene'}</p>
                <p class="card-text">Población: ${country.population}</p>
              </div>
            </div>
          </div>
        `;
        resultsContainer.innerHTML += countryCard;
      });
    })
    .catch(error => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
    });
}