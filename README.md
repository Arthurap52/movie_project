# Catálogo de Filmes

Este é um projeto de catálogo de filmes que permite aos usuários visualizar uma lista de filmes populares e obter detalhes sobre filmes específicos. O projeto utiliza a API do The Movie Database (TMDb) para obter informações sobre os filmes.

## Funcionalidades

- Visualização de lista de filmes populares.
- Busca por filmes com base em palavras-chave.
- Detalhes completos sobre um filme, incluindo título, ano de lançamento, gêneros, diretores e uma sinopse do mesmo.

## Como Usar

Siga estas etapas para configurar e executar o projeto em seu ambiente local:

1. **Clonar o repositório:**

- git clone https://github.com/Arthurap52/movie_project.git

2. **Configurar a Chave da API do TMDb:**

- Você precisará de uma chave de API válida do The Movie Database (TMDb) para este projeto. Vá para [TMDb API](https://www.themoviedb.org/settings/api) para obter uma chave.
- Abra o arquivo `index.js` e `movie.js` e substitua `const apiKey = 'sua-chave-da-api';` pelo valor da sua chave de API.

3. **Executar o Projeto:**

- Abra `index.html` em seu navegador para acessar a página inicial do catálogo de filmes.
- Clique no botão "Filmes Populares" para ver uma lista de filmes populares.
- Use a caixa de pesquisa para procurar filmes com base em palavras-chave.
- Clique em um cartão de filme para ver os detalhes completos do filme na página de detalhes.

## Estrutura de Arquivos

- `index.html`: Página inicial que exibe a lista de filmes e permite a busca por filmes.
- `movie.html`: Página de detalhes do filme que exibe informações detalhadas sobre um filme específico.
- `styles.css`: Arquivo de estilo CSS para estilizar as páginas.
- `index.js` e `movie.js`: Arquivos JavaScript que controlam o comportamento e a interação das páginas.
- `icon.png`: Ícone do site exibido na guia do navegador.

## Requisitos

- Navegador da web moderno (recomendado: Google Chrome, Mozilla Firefox).

## Licença

Este projeto está sob a [Licença MIT](LICENSE).


