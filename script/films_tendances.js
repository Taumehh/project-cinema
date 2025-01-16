// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function fetchTrendingMovies(page = 1) {
    const apiKey = '4640d01a';
    // Filtre par année 2024
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=2024&page=${page}`);
    const data = await response.json();

    if (data.Response === "True") {
        // Mélange les résultats avant de les afficher
        const shuffledMovies = shuffleArray(data.Search);
        displayMovies(shuffledMovies);
    } else {
        console.error("Erreur lors de la récupération des films :", data.Error);
    }
}

function displayMovies(movies) {
    const container = document.querySelector('#trend-movies');
    movies.forEach((movie, index) => {
        setTimeout(() => {
            container.innerHTML += `
                <div class="film-card">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
                </div>`;
        },);
    });
}

let currentPage = 1;

document.querySelector('#load-more').addEventListener('click', () => {
    currentPage++;
    fetchTrendingMovies(currentPage);
});

// Charge les films aléatoires au démarrage
fetchTrendingMovies();
