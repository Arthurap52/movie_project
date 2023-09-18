document.addEventListener('DOMContentLoaded', async function () {
    
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = 'bf48292768beea4e78cc070fc994f55c';

    // Função para buscar detalhes do filme por ID na API 
    async function fetchMovieDetails(movieId) {
        try {
            const apiUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
            const response = await fetch(apiUrl);
            
            const data = await response.json();
            console.log('Detalhes do filme:', data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
            throw error;
        }
    }

    // Função para preencher os detalhes do filme na página de detalhes
    function fillMovieDetails(movie) {
        const movieDetailsContainer = document.getElementById('movie-details');
        
        // Verifique se 'movie.credits' está definido antes de acessar a propriedade 'crew'
        const directors = movie.credits && movie.credits.crew ? movie.credits.crew.filter((crew) => crew.job === 'Director').map((director) => director.name).join(', ') : 'N/A';

        // Preencha os detalhes do filme na página de detalhes
        movieDetailsContainer.innerHTML = `
            <div id="movie-details">
            <div class="movie-image">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p><strong>Ano de Lançamento:</strong> ${movie.release_date.split('-')[0]}</p>
                <p><strong>Gêneros:</strong></p>
                <ul>
                    ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
                </ul>
                <p><strong>Diretores:</strong></p>
                <ul>
                    ${directors}
                </ul>
                <p><strong>Sinopse:</strong> ${movie.overview}</p>
                <button id="watch-button">Assistir</button>
            </div
        `;
        console.log('Detalhes do filme preenchidos:', movie);
    }


    // Função para obter o ID do filme a partir da URL
    function getMovieIdFromURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('id');
    }

    // Obtenha o ID do filme da URL e busque os detalhes do filme
    const movieId = getMovieIdFromURL();
    if (movieId) {
        fetchMovieDetails(movieId)
            .then((movieDetails) => {
                fillMovieDetails(movieDetails);
            })
            .catch((error) => {
                console.error('Erro ao buscar ou preencher detalhes do filme:', error);
            });
    } else {
        console.error('ID do filme não encontrado na URL.');
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

                // Redireciona o usuário para a página de detalhes com detalhes do filme como parâmetros
                window.location.href = `movie.html?id=${movieId}`;
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme:', error);
            }
        }
    });
});
