async function fetchTrendingMovies(page = 1) {
    const apiKey = '4640d01a';
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=2024&page=${page}`);
    const data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        console.error("Erreur lors de la récupération des films :", data.Error);
    }
}

function displayMovies(movies) {
    const container = document.querySelector('#trend-movies');
    movies.forEach(movie => {
        container.innerHTML += `
            <div class="film-card">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <a href="movie.html?imdbID=${movie.imdbID}">En savoir plus</a>
            </div>`;
    });
}

let currentPage = 1;

document.querySelector('#load-more').addEventListener('click', () => {
    currentPage++;
    fetchTrendingMovies(currentPage);
});

// Charger les premiers films
fetchTrendingMovies();
