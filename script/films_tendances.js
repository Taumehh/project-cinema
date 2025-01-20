function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function fetchTrendingMovies() {
    const apiKey = '4640d01a';
    const tendances = ["tt26446278", "tt22022452", "tt27490099", "tt15239678", "tt30795948"];
    // const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&y=2024&p=${currentPage}`);
    // const data = await response.json();

    try {
        // Effectuer une requête pour chaque imdbID et attendre toutes les réponses
        const promises = tendances.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(response => response.json())
        );

        // Récupérer les données des films
        const movies = await Promise.all(promises);

        // Vérifiez si les films sont valides (Response === "True")
        const validMovies = movies.filter(movie => movie.Response === "True");

        // Mélanger les films
        const shuffledMovies = shuffleArray(validMovies);

        // Afficher les films
        displayMovies(shuffledMovies);
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}

function displayMovies(movies) {
    const container = document.querySelector('#trend-movies');
    container.innerHTML = ""; // Nettoyer le conteneur avant d'ajouter les nouveaux films
    movies.forEach(movie => {
        container.innerHTML += `
            <div class="film-card">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "img/default-poster.jpg"}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
            </div>`;
    });
}

// let currentPage = 1;

// document.querySelector('#load-more').addEventListener('click', () => {
//     currentPage++;
//     fetchTrendingMovies(currentPage);
// });

// Charger les films au démarrage
fetchTrendingMovies();
