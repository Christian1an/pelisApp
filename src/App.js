const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
  });

//create movie
function createNewMovie(container, value){
    container.innerHTML = "";

    value.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
          location.hash = '#movie=' + movie.id;
        });

        const movieImg = document.createElement("IMG");
        movieImg.classList.add("movie-small-image");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`);
        movieContainer.appendChild(movieImg)
        movieByCategory.appendChild(movieContainer)
    });
}  
function createMovieOfHome(movies, container){
    container.innerHTML = " ";
    movies.forEach(movie => {
        const movieContainer = document.createElement("DIV")
        movieContainer.classList.add("contenedor-movie-small")
        movieContainer.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        })

        const movieImg = document.createElement("IMG");
        movieImg.classList.add("movie-small-image");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`);

        const movieTittlePosterPath = document.createElement("P");
        movieTittlePosterPath.classList.add("small-image-name");
        movieTittlePosterPath.textContent = movie.title;

        const movieTittlePosterDate = document.createElement("P");
        movieTittlePosterDate.classList.add("small-image-date");
        movieTittlePosterDate.textContent = movie.release_date;


        movieContainer.append(movieImg, movieTittlePosterPath, movieTittlePosterDate);
        container.appendChild(movieContainer);
    });
}
//create new category
function createCategory(section, container) {
    container.innerHTML = " "
    section.forEach(category => {
        const categoryContainer = document.createElement("P");
        categoryContainer.classList.add("categori");
        categoryContainer.textContent = category.name;
        categoryContainer.setAttribute("id", category.id)
        categoryContainer.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`
        })

        container.appendChild(categoryContainer);
    });
} 
//home slider header
async function postHeaderHome() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    let contador = 0;
    let movie = movies[contador];
    const moviePostHeaderHome = document.querySelector(".movie-list-popu");
    moviePostHeaderHome.innerHTML = " "
    moviePostHeaderHome.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movies[contador].backdrop_path})`;

    const moviePost = document.querySelector("#headerMovie");

    contentMovieHome(movie)

    const sliderHome = setInterval(sliderTimer, 10000);

    function sliderTimer() {
        contador += 1 
        if(contador != 20) {
            removeDestMovieHome();
            movie = movies[contador];   
            contentMovieHome(movie);
        }else{
            clearInterval(myStop())
        }
    }

    const myStop = () => {
        clearInterval(sliderHome);
    }

    
    function contentMovieHome (movie) {
        moviePostHeaderHome.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`;

        const movieDestHeaderHome = document.createElement("div");
        movieDestHeaderHome.classList.add("movie-degraded");
        const tituloMovieHomePost = document.createElement("H2");
        const destMovieHomePost = document.createElement("P");
        tituloMovieHomePost.textContent = movie.title;
        destMovieHomePost.textContent = movie.overview;
        destMovieHomePost.classList.add("dest-home")

        moviePost.appendChild(movieDestHeaderHome)
        movieDestHeaderHome.appendChild(tituloMovieHomePost);
        movieDestHeaderHome.appendChild(destMovieHomePost);
    }

    const removeDestMovieHome = () => {
        const removeMovie = document.querySelector(".movie-degraded"); 
        removeMovie.remove(); 
    }

}

//Popular movie preview
async function getTrendsPreview () {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector("#moviePopular--list")
    createMovieOfHome(movies, trendingPreviewMoviesContainer)
}

// Category movie list 
async function getTrendsCategory() {
    const { data } = await api('genre/movie/list');
    const category = data.genres;

    const categoryPreviewContainer = document.querySelector("#categoryContainer");
    createCategory(category, categoryPreviewContainer);
}

//search movie by category 
async function getCategoryMovieList(id, name){
    const { data } = await api('discover/movie', {
        params: {
          with_genres: id,
        },
      });
      const movies = data.results;
    const categoryContainer = document.querySelector("#categoryTitleSearch");
    categoryContainer.textContent = name;
    const movieByCategory = document.querySelector('#movieByCategory');

    createNewMovie(movieByCategory, movies)

}

//search movie 
async function getSearchMovieQuery(query){
    
    const { data } = await api('search/movie', {
        params: {
          query
        },
      });
      const movies = data.results;
    const movieByCategory = document.querySelector('#movieByCategory');
    createNewMovie(movieByCategory, movies)
}

async function getMoreTrendsMovie() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    const categoryContainer = document.querySelector("#categoryTitleSearch");
    categoryContainer.textContent = "Trends";
    const movieByCategory = document.querySelector('#movieByCategory');

    createNewMovie(movieByCategory, movies)
}

async function movieById(id) {
    const { data: movie } = await api(`movie/${id}`);
    movieHeader.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path})`;
    
    moviePostHeader.innerHTML = " ";
    const movieImg = document.createElement("IMG");
    movieImg.classList.add("movie-small-search");
    movieImg.classList.add("movie-mini-post");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`);
    moviePostHeader.appendChild(movieImg);

    moviePostDescription.classList.add("movie-description-post")
     moviePostDescription.textContent = movie.overview;
    createTitle.textContent = movie.title;
    createDest.textContent = movie.vote_average;

    const category = movie.genres;
    createCategory(category, containerCategoyMovie);
    getRecomendations(id);
}
async function getRecomendations(id) {
    const { data: movie} = await api(`movie/${id}/recommendations`);
    const movies = movie.results
    const similarMovieContainer = document.querySelector("#similarMovieContainer")
    createMovieOfHome(movies, similarMovieContainer)
}