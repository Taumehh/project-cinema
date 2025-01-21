const apiKey = '4640d01a';
let currentPage = 1; // Page actuelle
let currentQuery = ""; // Requête actuelle

// Fonction pour effectuer une recherche
async function searchMovies(page = 1) {
    const queryInput = document.getElementById('search-input');
    const query = queryInput.value.trim() || currentQuery;

    if (!query) {
        alert("Veuillez entrer un mot-clé de recherche.");
        return;
    }

    // Met à jour la requête actuelle
    currentQuery = query;

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${encodeURIComponent(query)}&page=${page}`);
        const data = await response.json();

        if (data.Response === "True") {
            displaySearchResults(data.Search);
            toggleLoadMoreButton(data.totalResults, page);
        } else {
            alert("Aucun résultat trouvé !");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}

// Fonction pour afficher les résultats de recherche
function displaySearchResults(movies) {
    const container = document.getElementById('search-results');

    movies.forEach(movie => {
        container.innerHTML += `
            <div class="film-card">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "img/default-poster.jpg"}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
            </div>`;
    });
}

// Fonction pour afficher/masquer le bouton "Charger plus"
function toggleLoadMoreButton(totalResults, page) {
    const loadMoreButton = document.getElementById('load-more');
    const maxPages = Math.ceil(totalResults / 10); // OMDB retourne 10 résultats par page

    if (page < maxPages) {
        loadMoreButton.style.display = "block";
    } else {
        loadMoreButton.style.display = "none";
    }
}

// Gestion du clic sur "Charger plus"
document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    searchMovies(currentPage);
});

// Détecte si une requête est passée dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('query');
if (queryParam) {
    document.getElementById('search-input').value = queryParam;
    searchMovies();
}
