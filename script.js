const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const popularMoviesButton = document.getElementById('popular-movies-button'); // adicione o botão de filmes populares

const apiKey = 'bf48292768beea4e78cc070fc994f55c';
const baseUrl = 'https://api.themoviedb.org/3';

// função para buscar filmes com base na palavra-chave
async function searchMovies(query) {
    try {
        const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`);
        const data = await response.json();

        // limpar a lista de filmes
        movieList.innerHTML = '';

        // exibir os resultados
        data.results.forEach((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
            `;
            movieList.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

// função para buscar filmes populares
async function searchPopularMovies() {
    try {
        const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`);
        const data = await response.json();

        // limpar a lista de filmes
        movieList.innerHTML = '';

        // exibir os filmes populares
        data.results.forEach((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
            `;
            movieList.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
    }
}

// evento de clique no botão de pesquisa
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        searchMovies(searchTerm);
    }
});

// evento de pressionar Enter na caixa de pesquisa
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchMovies(searchTerm);
        }
    }
});

// evento de clique no botão "Filmes Populares"
popularMoviesButton.addEventListener('click', () => {
    searchPopularMovies();
});
