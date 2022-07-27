searchIcon.addEventListener('click', () => {
    location.hash = "#search=";
  });

  arrowBtn.addEventListener('click', () => {
    location = "";
  });

  seeMoreBtn.addEventListener('click', () => {
    location.hash = '#trends';
  });

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
}

function homePage() {
  genericListMovie.classList.add("inactive");
  movie.classList.remove("container-movie-description");
  movie.style.background = '';
  movie.remove("container-mini-movie");
  similarMovieSection.classList.add("inactive");
}

function searchPage(){
  console.log({ searchMovie });
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  headerMovieHome.classList.remove("movie-list-popu");
  degrade.classList.add("inactive");
  genericListMovie.classList.remove("inactive");
  movie.classList.remove("container-movie-description");
  movie.remove("container-mini-movie");
  similarMovieSection.classList.add("inactive");
}

function movieDetailsPage(){
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  headerMovieHome.classList.remove("movie-list-popu");
  degrade.classList.add("inactive");
  genericListMovie.classList.add("inactive");

}

function categoriesPage() {
  console.log({ searchMovie });
  searchMovieSection.classList.add("inactive")
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  headerMovieHome.classList.remove("movie-list-popu");
  degrade.classList.add("inactive");
  genericListMovie.classList.remove("inactive");
  movie.classList.remove("container-movie-description");
  movie.remove("container-mini-movie");
  similarMovieSection.classList.add("inactive");
}

function trendsPage() {
  console.log({ searchMovie });
  searchMovieSection.classList.add("inactive")
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  headerMovieHome.classList.remove("movie-list-popu");
  degrade.classList.add("inactive");
  genericListMovie.classList.remove("inactive");
  movie.classList.remove("container-movie-description");
  movie.remove("container-mini-movie");
  similarMovieSection.classList.add("inactive");
}