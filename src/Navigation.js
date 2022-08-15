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

function trendsPage(){
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  searchMovieSection.classList.add("inactive")
  categorisTrendSection.classList.add("inactive");
  genericListMovie.classList.remove("inactive")
}

function searchPage(){
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  genericListMovie.classList.remove("inactive")
} 

function movieDetailsPage(){
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  movie.classList.remove("inactive")
  similarMovieSection.classList.remove("inactive")
}


