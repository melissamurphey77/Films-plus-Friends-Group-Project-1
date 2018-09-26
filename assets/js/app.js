
$('#results').on('click', function showMovies(){

    const API_KEY = "b20fd857a48febf56f02e2bba3f75e22"
    //grabs current date at time of call, this helps get rid of un-released movies appearing in search - movies in theatres CAN appear, 
    //but it is sorted by vote count so this will weed some out a bit
    var currentDate = moment().format("YYYY-MM-DD");
    console.log(currentDate)
    //API uses ID's to identify genres instead of string ex: 10402 = Mystery
    var genreID = "";
    //query is set to display rating less or equal to parameter so if pg-13 selected R or NC-17 will not populate. EXCEPTION - NR is technicaly ranked below G, 
    //so although some NR films are equivilent to this query, any film with an unrated version ex: American Pie Unrated will show
    var rating = "";
    //query URL for TMDB - used this DM over OMDB as it has a lot more search parameters
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=vote_count.desc&certification_country=US&certification.lte=" + rating +"&include_adult=false&include_video=false&page=1&primary_release_date.lte=" + currentDate + "&with_genres=" + genreID
    $.ajax({
        //https://www.themoviedb.org/documentation/api
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        console.log(queryURL)
    })
})

