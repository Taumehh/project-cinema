const apiKey = '4640d01a';
const tendances = ["tt26446278", "tt22022452", "tt27490099", "tt15239678", "tt30795948"];
let currentPage = 0;

async function fetchTrendingMovies() {
    const apiKey = '4640d01a';
    const tendances = ["tt26446278", "tt22022452", "tt27490099", "tt15239678", "tt30795948"];

    try {
        const promises = tendances.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(response => response.json())
    try {
        const moviesPerPage = 2;
        const startIndex = currentPage * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;

        const currentMovies = tendances.slice(startIndex, endIndex);

        if (currentMovies.length === 0) {
            console.warn("Aucun film supplémentaire à charger !");
            return;
        }

        const promises = currentMovies.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(res => res.json())
        );

        const movies = await Promise.all(promises);

        const validMovies = movies.filter(movie => movie.Response === "True");

        const shuffledMovies = shuffleArray(validMovies);
        displayMovies(validMovies);

        // Afficher les films tendance
        displayMovies(shuffledMovies, '#trend-movies');
        currentPage++;
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}
}

async function fetchRandomMovies() {
    const apiKey = '4640d01a';
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=2024&page=${page}`);
    const data = await response.json();

    if (data.Response === "True") {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=2024&page=${page}`);
        const data = await response.json();
    
        if (data.Response === "True") {
            const shuffledMovies = shuffleArray(data.Search);
            displayMovies(shuffledMovies);
        } 
    } else {
        console.error("Erreur lors de la récupération des films :", data.Error);
    }
}

function displayMovies(movies, containerId) {
    const container = document.querySelector(containerId);

    if (!container) {
        console.error(`Conteneur "${containerId}" introuvable.`);
        return;
    }

function displayMovies(movies) {
    const container = document.querySelector('#trend-movies');
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('film-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "img/default-poster.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
        `;
        container.appendChild(movieCard);
    });
}

let isRandomMoviesDisplayed = false;

document.querySelector('#load-more').addEventListener('click', () => {
    if (!isRandomMoviesDisplayed) {
        isRandomMoviesDisplayed = true;

        const container = document.querySelector('.container');

        // Ajouter dynamiquement la section pour les films aléatoires
        const randomSection = document.createElement('div');
        randomSection.innerHTML = `
            <h2>Films aléatoires</h2>
            <div class="film-grid" id="random-movies"></div>
        `;
        container.appendChild(randomSection);

        // Charger les films aléatoires
        fetchRandomMovies();
    }
});
document.querySelector('#load-more').addEventListener('click', fetchTrendingMovies);

// Charger les films tendance au démarrage
fetchTrendingMovies();
