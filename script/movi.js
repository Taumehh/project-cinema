async function fetchMovieDetails(imdbID) {
    const apiKey = '4640d01a';
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();

    if (data.Response === "True") {
        displayMovieDetails(data);
    } else {
        console.error("Erreur lors de la récupération des détails du film :", data.Error);
    }
}

function displayMovieDetails(movie) {
   
    document.querySelector('header h1').textContent = movie.Title;
    document.querySelector('main img').src = movie.Poster;
    document.querySelector('main img').alt = movie.Title;
    document.querySelector('main p').textContent = movie.Genre;
    document.querySelector('aside p').textContent = movie.Plot;
}

const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');

if (imdbID) {
    fetchMovieDetails(imdbID);
} else {
    console.error("Aucun ID IMDb spécifié dans l'URL.");
}