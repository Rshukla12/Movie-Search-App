const API_KEY = "be86dd68";
let query = "";

function fetchMovieDetails(movieName){
    return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}&type=movie&page=1`)
        .then( ( res ) => {
            return res.json()
        })
        .catch( ( err) => {
            console.log(err);
        });
}

function displayMovie(movieDetails){
    const container = document.getElementById("movie");
    container.innerHTML = null;

    const movie = document.createElement('div');
    const info = document.createElement('div');
    const header = document.createElement('div');
    
    movie.id = "movie-container";
    header.id = "movie-header";
    info.id = "movie-info";

    const poster = document.createElement('img');
    const title = document.createElement('h1');
    const releaseYear = document.createElement('h1');
    const description = document.createElement('p');
    const rating = document.createElement('h4');
    const genre = document.createElement('p');
    const director = document.createElement('p');
    const actors  = document.createElement('p');
    
    poster.src = movieDetails.Poster
    title.textContent = movieDetails.Title;
    releaseYear.textContent = movieDetails.Year;
    description.textContent = movieDetails.Plot;
    genre.textContent = "Genres - " + movieDetails.Genre;
    director.textContent = "Director - " + movieDetails.Director;
    actors.textContent = "Actors - " + movieDetails.Actors;
    rating.textContent = "IMDB Rating - " + movieDetails.imdbRating; 

    header.append( title, releaseYear )
    info.append( header, description, genre, actors, director, rating)
    movie.append( poster, info );
    container.append(movie);
}

function displayNotFound(){    
    const container = document.getElementById("movie")
    container.innerHTML = null;

    const img = document.createElement('img');
    img.src = './not-found-404.png';

    container.append(img);
}

function validateInput(text){
    if ( !text || text.length < 3 ){
        return false;
    }
    return true;
}

function setSpinner(isLoading){
    const spinner = document.getElementById("spinner");
    if ( isLoading ){
        spinner.className = "visible";
    } else {
        spinner.className = "hidden";
    }
}


async function handleSearch(e){
    try {
        e.preventDefault();
        setSpinner(true);
        const searchQuery = document.getElementById("name");
        const query = searchQuery.value;
        
        if ( !validateInput(query) ){
            alert('Please enter the exact movie name')
            return;
        }

        const movieResult = await fetchMovieDetails(query);
        if ( movieResult.Title && movieResult.Title.toLowerCase() == query.toLowerCase()){
            displayMovie(movieResult);
        } else {
            console.log(movieResult)
            displayNotFound();
        }
        
        setSpinner(false);

        searchQuery.value = "";
    } catch(err) {
        console.log(err);
    }
}

window.addEventListener("load", ( ) => {
    const btn = document.getElementById('search');
    btn.addEventListener("click", handleSearch);
})