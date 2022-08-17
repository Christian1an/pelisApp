const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
  });
  
//home slider header
async function postHeaderHome() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    let contador = 0;
    let movie = movies[contador];

    const moviePostHeaderHome = document.querySelector(".movie-list-popu");
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
        const hola = document.querySelector(".movie-degraded"); 
        hola.remove(); 
    }

}

//Popular movie preview
async function getTrendsPreview () {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector("#moviePopular--list")

        const movieContainer = document.createElement("DIV")
        movieContainer.classList.add("contenedor-movie-small")

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
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });

}

// Category movie list 
async function getTrendsCategory() {
    const { data } = await api('genre/movie/list');
    const category = data.genres;

    category.forEach(category => {
        const categoryPreviewContainer = document.querySelector("#categoryContainer")

        const categoryContainer = document.createElement("P");
        categoryContainer.classList.add("categori");
        categoryContainer.textContent = category.name;
        categoryContainer.setAttribute("id", category.id)
        categoryContainer.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`
        })

        categoryPreviewContainer.appendChild(categoryContainer);
    });
}

async function getCategoryMovieList(id, name){
    const { data } = await api('discover/movie', {
        params: {
          with_genres: id,
        },
      });
      const movies = data.results;
      console.log(movies)
    const categoryContainer = document.querySelector("#categoryContainerTittle");
    const movieByCategory = document.querySelector('#movieByCategory');
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = name;
    categoryTitle.classList.add("categori-tittle");
    categoryContainer.appendChild(categoryTitle);


    movies.forEach(movie => {
        const movieImg = document.createElement("IMG");
        movieImg.classList.add("movie-small-image");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`);
        movieByCategory.appendChild(movieImg)
    });

}

