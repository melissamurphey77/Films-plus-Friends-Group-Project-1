
$('#results').on('click', function showMovies(){
    event.preventDefault();
    //removes html from container that will house new data on this page
    $('#container').empty()
    const API_KEY = "b20fd857a48febf56f02e2bba3f75e22"
    //grabs current date at time of call, this helps get rid of un-released movies appearing in search - movies in theatres CAN appear, 
    //but it is sorted by vote count so this will weed some out a bit
    var currentDate = moment().format("YYYY-MM-DD");
    console.log(currentDate)
    //API uses ID's to identify genres instead of string ex: 10402 = Mystery
    var genreID = $('#genre').val().trim();
    //query is set to display rating less or equal to parameter so if pg-13 selected R or NC-17 will not populate. EXCEPTION - NR is technicaly ranked below G, 
    //so although some NR films are equivilent to this query, any film with an unrated version ex: American Pie Unrated will show
    var rating = $('#rating').val().trim();
    //query URL for TMDB - used this DM over OMDB as it has a lot more search parameters
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=vote_count.desc&certification_country=US&certification.lte=" + rating +"&include_adult=false&include_video=false&page=1&primary_release_date.lte=" + currentDate + "&with_genres=" + genreID
    $.ajax({
        //https://www.themoviedb.org/documentation/api
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //Div to house all images that is linked to output in HTML
        var imgDiv = $('<div>').attr('id', "imgDiv")
        $('#container').append(imgDiv)
        //for loop to create 5 posters and place them on page
        for (var i=0;i<5; i++){
            //gets poster img based on URL
            var poster = $('<img>').attr('src', "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path)
            //ads ID for styling and data for pushing up to firebase
            $(poster).attr('id', "poster").attr('data', response.results[i].title)
            //stores URL in data in addition to SRC
            $(poster).attr('data-img', "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path)
            //links poster to imgDiv created above
            $(imgDiv).append(poster)
        }
        //creates button that will submit results and trigger firebase call
        var newBtn = $('<button class="btn text-center" type="submit">')
        $(newBtn).text("Confirm")
        $(newBtn).attr('id', "pushSelection")
        $('#container').append(newBtn)
        console.log(response)
        console.log(queryURL)
    })
})

