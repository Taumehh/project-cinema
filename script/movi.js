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

function formatDate(date) {
    if (!date || date === "N/A") return "Non spécifiée";
    const [month, day, year] = date.split('/');
    return `${day}/${month}/${year}`;
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
    const formattedReleaseDate = formatDate(movie.DVD);

    document.querySelector('header h1').textContent = movie.Title;
    document.querySelector('main img').src = movie.Poster;
    document.querySelector('main img').alt = movie.Title;

    document.querySelector('#genre').textContent = `Genre : ${translatedGenre}`;
    document.querySelector('#actors').textContent = `Acteurs : ${movie.Actors || "Non spécifiés"}`;
    document.querySelector('#ratings').textContent = `Notes : ${movie.imdbRating || "Non spécifiées"}`;
    document.querySelector('#release-date').textContent = `Date de sortie DVD : ${formattedReleaseDate}`;
    document.querySelector('#plot').textContent = `Résumé : ${translatedPlot}`;

    // Ajouter des animations
    document.querySelector('header h1').classList.add('fade-in');
    document.querySelector('main img').classList.add('fade-in');
    document.querySelector('#plot').classList.add('fade-in');
    document.querySelector('#genre').classList.add('fade-in');
    document.querySelector('#actors').classList.add('fade-in');
    document.querySelector('#ratings').classList.add('fade-in');
    document.querySelector('#release-date').classList.add('fade-in');
}

const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');

if (imdbID) {
    fetchMovieDetails(imdbID);
} else {
    console.error("Aucun ID IMDb spécifié dans l'URL.");
}
