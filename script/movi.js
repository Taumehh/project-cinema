async function fetchMovieDetails(imdbID) {
    const apiKey = '4640d01a';
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovieDetails(data);
        } else {
            console.error("Erreur lors de la récupération des détails du film :", data.Error);
            showError("Impossible de charger les détails du film.");
        }
    } catch (error) {
        console.error("Erreur réseau ou autre problème :", error);
        showError("Un problème est survenu lors de la récupération des données.");
    }
}

function displayMovieDetails(movie) {
    document.querySelector('header h1').textContent = movie.Title || "Titre inconnu";

    const posterElement = document.querySelector('main img');
    if (movie.Poster && movie.Poster !== "N/A") {
        posterElement.src = movie.Poster;
        posterElement.alt = movie.Title || "Affiche du film";
    } else {
        posterElement.src = "img/placeholder.jpg";
        posterElement.alt = "Affiche indisponible";
    }

    document.querySelector('main p').textContent = movie.Genre || "Genre inconnu";

    document.querySelector('aside p').textContent = movie.Plot || "Résumé indisponible.";
}

function showError(message) {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');

if (imdbID) {
    fetchMovieDetails(imdbID);
} else {
    console.error("Aucun ID IMDb spécifié dans l'URL.");
    showError("Aucun ID IMDb spécifié. Impossible d'afficher les détails du film.");
}
