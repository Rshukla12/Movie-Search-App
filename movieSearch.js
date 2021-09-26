const API_KEY = "be86dd68"

function fetchMovieDetails(movieName){
    return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`)
        .then( ( res ) => {
            return res.json();
        })
        .catch( ( err) => {
            console.log(err);
        });
}

function displayMovie(movieDetails){
    const container = document.getElementById("movie")

    container.innerHTML = null;

    const title = document.createElement('h1');
    const releaseDate = document.createElement('h3');
    const description = document.createElement('p');

    title.textContent = movieDetails.Title;
    releaseDate.textContent = movieDetails.Released;
    description.textContent = movieDetails.Plot;

    container.append(title, releaseDate, description);
}


function handleSearch(e){
    e.preventDefault();
    const searchQuery = document.getElementById("name");
    const query = searchQuery.value;
    
    fetchMovieDetails(query)
    .then( ( movieDetails ) => {
        console.log(movieDetails);
        displayMovie(movieDetails);
    })
    .catch( (err) => {
        console.log(err);
    })

}

window.addEventListener("load", ( ) => {
    const btn = document.getElementById('search');
    btn.addEventListener("click", handleSearch);
})