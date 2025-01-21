const apiKey = '4640d01a';
let currentPage = 1;
let currentQuery = "";
let typingTimer;
const typingDelay = 300;

async function searchMovies(page = 1) {
    const query = currentQuery;

    if (!query) {
        clearResults();
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${encodeURIComponent(query)}&page=${page}`);
        const data = await response.json();

        if (data.Response === "True" && data.Search && data.Search.length > 0) {
            if (page === 1) clearResults();
            displaySearchResults(data.Search);
            toggleLoadMoreButton(data.totalResults, page);
        } else {
            if (page === 1) clearResults();
            alert("Aucun résultat trouvé !");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        alert("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
    }
}

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

function toggleLoadMoreButton(totalResults, page) {
    const loadMoreButton = document.getElementById('load-more');
    const maxPages = Math.ceil(totalResults / 10);

    if (page < maxPages) {
        loadMoreButton.style.display = "block";
    } else {
        loadMoreButton.style.display = "none";
    }
}

function clearResults() {
    document.getElementById('search-results').innerHTML = "";
    document.getElementById('load-more').style.display = "none";
}

document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    searchMovies(currentPage);
});

document.getElementById('search-input').addEventListener('input', (e) => {
    clearTimeout(typingTimer);
    currentQuery = e.target.value.trim();

    if (currentQuery) {
        typingTimer = setTimeout(() => {
            currentPage = 1;
            searchMovies();
        }, typingDelay);
    } else {
        clearResults();
    }
});

const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('query');
if (queryParam) {
    document.getElementById('search-input').value = queryParam;
    currentQuery = queryParam;
    searchMovies();
}
