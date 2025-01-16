const translations = {
    genres: {
        Action: 'Action',
        Comedy: 'Comédie',
        Drama: 'Drame',
        Horror: 'Horreur',
        Romance: 'Romance',
        "Sci-Fi": 'Science-fiction',
        Thriller: 'Thriller',
        Adventure: 'Aventure',
        Animation: 'Animation',
        Biography: 'Biographie',
        Crime: 'Crime',
        Documentary: 'Documentaire',
        Family: 'Famille',
        Fantasy: 'Fantaisie',
        History: 'Histoire',
        Music: 'Musique',
        Mystery: 'Mystère',
        War: 'Guerre',
        Western: 'Western',
    },
    terms: {
        "N/A": 'Non disponible',
    }
};

function translateGenre(genre) {
    return genre
        .split(', ')
        .map(g => translations.genres[g] || g)
        .join(', ');
}

function translateText(text) {
    return translations.terms[text] || text;
}

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
    const translatedGenre = translateGenre(movie.Genre);
    const translatedPlot = translateText(movie.Plot);

    document.querySelector('header h1').textContent = movie.Title;
    document.querySelector('main img').src = movie.Poster;
    document.querySelector('main img').alt = movie.Title;
    document.querySelector('main p').textContent = `Genre : ${translatedGenre}`;
    document.querySelector('aside p').textContent = `Résumé : ${translatedPlot}`;

    // Ajouter une classe pour déclencher les animations
    document.querySelector('header h1').classList.add('fade-in');
    document.querySelector('main img').classList.add('fade-in');
    document.querySelector('aside p').classList.add('fade-in');
}

const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');

if (imdbID) {
    fetchMovieDetails(imdbID);
} else {
    console.error("Aucun ID IMDb spécifié dans l'URL.");
}
