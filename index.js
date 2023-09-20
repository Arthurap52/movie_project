document.addEventListener('DOMContentLoaded', async function () {
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

                // Adicionar o atributo data-id com o ID do filme
                movieCard.setAttribute('data-id', movie.id);

                movieCard.innerHTML = `
                <a href="movie.html?id=${movie.id}">
                    <div class="movie-image">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="{movie.title}">
                    </div>
                    <div class="movie-info">
                        <h2>${movie.title}</h2>
                    </div>
                </a>
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
                
                // Adicionar o atributo data-id com o ID do filme
                movieCard.setAttribute('data-id', movie.id);

                // Conteúdo do cartão de filme
                movieCard.innerHTML = `
                    <a href="movie.html?id=${movie.id}">
                        <div class="movie-image">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        </div>
                        <div class="movie-info">
                            <h2>${movie.title}</h2>
                        </div>
                    </a>
                `;
                movieList.appendChild(movieCard);

            });
        } catch (error) {
            console.error('Erro ao buscar filmes populares:', error);
        }
        
    }

    // Verifique se estamos na página index.html antes de adicionar o ouvinte de evento
    if (document.getElementById('search-button')) {
        const searchButton = document.getElementById('search-button');

        // Adicione o ouvinte de evento de clique para o botão de busca
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== '') {
                searchMovies(searchTerm);
            }
        });
    }
    
    // verifique se estamos na página index.html antes de adicionar o ouvinte de evento
    if (document.getElementById('search-input')) {
        const searchInput = document.getElementById('search-input');

        // evento de pressionar Enter na caixa de pesquisa
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm !== '') {
                    searchMovies(searchTerm);
                }
            }
        });
    }

    // verifique se estamos na página index.html antes de adicionar o ouvinte de evento
    if (document.getElementById('popular-movies-button')) {
        const popularMoviesButton = document.getElementById('popular-movies-button');

        // evento de clique no botão "Filmes Populares"
        popularMoviesButton.addEventListener('click', () => {
            searchPopularMovies();
        });
        await searchPopularMovies();
    }

    // Selecione todos os elementos com a classe "movie-card"
    const movieCards = document.querySelectorAll('.movie-card');

    // Adicione um ouvinte de evento de clique a cada cartão de filme
    movieCards.forEach((card) => {
        card.addEventListener('click', () => {
            // Redirecione para a página desejada quando o cartão for clicado
            window.location.href = 'movie.html'; // Substitua com a URL desejada
        });
    });
});
