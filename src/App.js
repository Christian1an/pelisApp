
const API_MOVIE =`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`

async function getTrendsPreview () {
    const res = await fetch(API_MOVIE);
    const data = await res.json();
    const movies = await data.results;

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

async function postHeaderHome() {
    const res = await fetch(API_MOVIE);
    const data = await res.json();
    let movies = await data.results;
    let constador = 0;
    let movie = movies[constador];

    const moviePostHeaderHome = document.querySelector(".movie-list-popu");
    moviePostHeaderHome.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movies[constador].backdrop_path})`;

    const moviePost = document.querySelector("#headerMovie");

    contentMovieHome(movie)

    setInterval(() => {
        constador += 1 
        removeDestMovieHome()
        movie = movies[constador];   
        contentMovieHome (movie)
    },10000)

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
getTrendsPreview()
postHeaderHome()

// moviePostHeaderHome.animate([
            
// ],{

// })