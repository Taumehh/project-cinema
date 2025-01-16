let currentPage = 1;
let query = '';
let totalPages = 0;

const params = new URLSearchParams(window.location.search);
query = params.get('query') || ''; // Récupérer la requête de l'URL
document.getElementById('searchInput').value = query; // Afficher la requête dans le champ de recherche

document.getElementById('searchInput').addEventListener('input', function() {
    query = this.value;
    currentPage = 1;
    searchMovies();
});

document.getElementById('load-more-btn').addEventListener('click', function() {
    currentPage++;
    searchMovies();
});

async function searchMovies() {
    if (!query) return;

    const apiKey = '4640d01a';
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${currentPage}`);
    const data = await response.json();

    if (data.Response === "True") {
        if (currentPage === 1) {
            document.getElementById('results-container').innerHTML = ''; 
        }
        displayResults(data.Search);
        totalPages = Math.ceil(data.totalResults / 10);
        document.getElementById('load-more-btn').style.display = currentPage < totalPages ? 'block' : 'none';
    } else {
        console.error("Erreur lors de la récupération des films :", data.Error);
    }
}

const allowedTypes = ['movie', 'series'];

function displayResults(movies) {
    const container = document.getElementById('results-container');

    const filteredMovies = movies.filter(movie => {
        return allowedTypes.includes(movie.Type);
    });

    if (filteredMovies.length === 0) {
        container.innerHTML = `<p>Aucun film ou série trouvé, ou tous les résultats ont été exclus.</p>`;
        return;
    }

    filteredMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('film-card');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
        `;
        container.appendChild(movieElement);
    });
}

searchMovies();
