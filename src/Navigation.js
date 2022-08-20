window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
  
  searchIcon.addEventListener('click', () => {
    location.hash = "#search=" + searchInput.value;
  });

  arrowBtn.addEventListener('click', () => {
    history.back()
  });

  seeMoreBtn.addEventListener('click', () => {
    location.hash = '#trends';
  });

  logoTitle.addEventListener('click', () => {
    location.hash = "";
  });


function navigator() {
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  }else {
    homePage();
  }
}

function homePage() {
  arrowBtn.classList.add("inactive")
  seeMoreBtn.classList.remove("inactive")
  searchMovieSection.classList.remove("inactive")
  headerMovieHome.classList.remove("inactive");
  trendMovieSection.classList.remove("inactive");
  categorisTrendSection.classList.remove("inactive");
  genericListMovie.classList.add("inactive");
  movie.classList.add("inactive");
  similarMovieSection.classList.add("inactive");

  getTrendsPreview()
  postHeaderHome()
  getTrendsCategory()
}

function trendsPage(){
  arrowBtn.classList.remove("inactive")
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  searchMovieSection.classList.add("inactive")
  categorisTrendSection.classList.add("inactive");
  genericListMovie.classList.remove("inactive")
  arrowBtn.classList.remove("inactive")
  
  getMoreTrendsMovie()
}

function searchPage(){
  arrowBtn.classList.remove("inactive")
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  genericListMovie.classList.remove("inactive");
  categorySearchTitle.classList.add("inactive")

  const [ ,query] = location.hash.split("=")
  console.log(query)

  getSearchMovieQuery(query)
} 

function movieDetailsPage(){
  arrowBtn.classList.remove("inactive")
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  movie.classList.remove("inactive");
  similarMovieSection.classList.remove("inactive");
  genericListMovie.classList.add("inactive");
  seeMoreBtn.classList.add("inactive")

  const[ , movieId] = location.hash.split("=")

  movieById(movieId)
}

function categoriesPage() {
  arrowBtn.classList.remove("inactive")
  headerMovieHome.classList.add("inactive");
  trendMovieSection.classList.add("inactive");
  categorisTrendSection.classList.add("inactive");
  genericListMovie.classList.remove("inactive");
  categorySearchTitle.classList.remove("inactive")
  movie.classList.add("inactive");
  similarMovieSection.classList.add("inactive");


  const[ , categoryDate] = location.hash.split("=")
  const[categoryId, nombreCategory] = categoryDate.split("-")
  
  getCategoryMovieList(categoryId, nombreCategory)
}

