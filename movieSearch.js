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

async function handleSearch(e){
    e.preventDefault();
    const searchQuery = document.getElementById("name");
    const query = searchQuery.value;
    
    const movieDetails = await fetchMovieDetails(query);
    console.log(movieDetails)

}

window.addEventListener("load", ( ) => {
    const btn = document.getElementById('search');
    btn.addEventListener("click", handleSearch);
})