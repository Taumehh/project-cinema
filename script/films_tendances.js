const apiKey = '4640d01a';
const tendances = ["tt26446278", "tt22022452", "tt27490099", "tt15239678", "tt30795948"];
let currentPage = 0;

async function fetchTrendingMovies() {
    try {
        // Limitez le nombre de films affichés par page (par ex., 2 films à chaque fois)
        const moviesPerPage = 2;
        const startIndex = currentPage * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;

        // Sélectionnez une tranche des IDs tendance
        const currentMovies = tendances.slice(startIndex, endIndex);

        if (currentMovies.length === 0) {
            console.warn("Aucun film supplémentaire à charger !");
            return;
        }

        // Effectuez des requêtes pour chaque film
        const promises = currentMovies.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(res => res.json())
        );
        const movies = await Promise.all(promises);

        // Affichez uniquement les films valides
        const validMovies = movies.filter(movie => movie.Response === "True");
        displayMovies(validMovies);

        // Incrémentez la page courante
        currentPage++;
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}

function displayMovies(movies) {
    const container = document.querySelector('#trend-movies');
    movies.forEach(movie => {
        container.innerHTML += `
            <div class="film-card">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "img/default-poster.jpg"}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
            </div>`;
    });
}

// Gestion du bouton "Charger plus"
document.querySelector('#load-more').addEventListener('click', fetchTrendingMovies);

// Charger les films au démarrage
fetchTrendingMovies();
