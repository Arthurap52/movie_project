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
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <h2>${movie.title}</h2>
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
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <h2>${movie.title}</h2>
                    </a>
                `;
                movieList.appendChild(movieCard);

            });
        } catch (error) {
            console.error('Erro ao buscar filmes populares:', error);
        }
        
    }

    // função para buscar detalhes do filme por ID na API 
    async function fetchMovieDetails(movieId) {
        try {
            const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
            const response = await fetch(apiUrl);
            
            const data = await response.json();
            console.log('Detalhes do filme:', data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
            throw error;
        }
    }

    // função para preencher os detalhes do filme na página de detalhes
    function fillMovieDetails(movie) {
        const movieDetailsContainer = document.getElementById('movie-details');
        // preencha os detalhes do filme na página de detalhes
        movieDetailsContainer.innerHTML = `
            
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>Ano: ${movie.release_date.split('-')[0]}</p>
            <p>Gênero: ${movie.genres.map((genre) => genre.name).join(', ')}</p>
            <p>Diretores: ${movie.credits.crew.filter((crew) => crew.job === 'Director').map((director) => director.name).join(', ')}</p>
            <p>Sinopse: ${movie.overview}</p>
            
        `;
        console.log('Detalhes do filme preenchidos:', movie);
    }

    // evento de clique em um cartão de filme
    document.addEventListener('click', async function (event) {
        const target = event.target;

        // verifique se o elemento clicado é um cartão de filme
        if (target.classList.contains('movie-card')) {
            // obtenha o ID do filme clicado usando o atributo data-id
            const movieId = target.getAttribute('data-id');

            try {
                // busca detalhes do filme por ID
                const movieDetails = await fetchMovieDetails(movieId);

                // preenche os detalhes do filme na página de detalhes
                fillMovieDetails(movieDetails);
                console.log('Detalhes do filme preenchidos:', movieDetails);

                // Redireciona o usuário para a página de detalhes
                window.location.href = 'movie.html';
            } catch (error) {
                console.error('Erro ao buscar ou preencher detalhes do filme:', error);
            }
        }
    });

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
});