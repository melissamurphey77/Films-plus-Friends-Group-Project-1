// Initialize Firebase
var config = {
  apiKey: "AIzaSyDqKFoezSoE-C-y0Hh-gavtW13oZ64K_Yg",
  authDomain: "movieswithfriends-1c676.firebaseapp.com",
  databaseURL: "https://movieswithfriends-1c676.firebaseio.com",
  projectId: "movieswithfriends-1c676",
  storageBucket: "movieswithfriends-1c676.appspot.com",
  messagingSenderId: "305686437446"
};
firebase.initializeApp(config);
var database = firebase.database()
//create global variable to house genKey to ref later on
var genKey;
//Global Varriables
var name;
var email;
var ratings = ["G", "PG", "PG-13", "R"];
var selectedRating;
var selectedGenre;
var genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

var getStartedBtn = $("<button>");

getStartedBtn.attr("id", "getStartedBtn");
getStartedBtn.attr("type", "submit");
getStartedBtn.attr("class", "btn btn-primary submitBtn");
getStartedBtn.text("Get Started!");

getStartedBtn.appendTo("#container");

$("#getStartedBtn").on("click", function () {
    //Steps to hide/clear the landing page and run makeSearchForm
    $("#container").empty();
    $("#footer").hide();
    makeSearchForm();

    //Function to generate the Form that gathers information needed to process the API call
function makeSearchForm() {
  //Create the Form to which all form fields will be appended
  var searchForm = $("<form>");

      searchForm.attr("id", "searchForm");

  //Generate the Name Field
  var nameLabel = $("<label>");
      nameLabel.attr("class", "label");
      nameLabel.attr("for", "nameField");
      nameLabel.text("Name: ");

  var nameField = $("<input>");

      nameField.attr("type", "text");
      nameField.attr("id", "nameField");
      nameField.attr("class", "form-control");

  //Generate the Email Field
  var emailLabel = $("<label>");
      emailLabel.attr("class", "label");
      emailLabel.attr("for", "emailField");
      emailLabel.text("Email: ");

  var emailField = $("<input>");

      emailField.attr("type", "email");
      emailField.attr("id", "emailField");
      emailField.attr("class", "form-control");


  //Generate the Ratings Checkboxes
  var ratingsLabel = $("<Label>");
      ratingsLabel.attr("class", "label");
      ratingsLabel.attr("for","ratingsGroup");
      ratingsLabel.text("Ratings: ");

  var ratingsGroup = $("<div>");
      ratingsGroup.attr("id", "ratingsGroup");
      for (var j=0; j < ratings.length; j++) {
  
      var ratingsCheck = $("<input>");
      var ratingsText = $('<p>')
      ratingsCheck.attr("type", "checkbox");
      ratingsCheck.attr("id", "ratingsCheck" + ratings[j]);
      ratingsCheck.attr("name", "ratingsCheck" + ratings[j]);
      ratingsCheck.attr("value", ratings[j]);
      ratingsText.text(ratings[j]);

      ratingsCheck.appendTo(ratingsGroup);
      ratingsGroup.append(ratingsText)
      //ratingsGroup.append("<br>");
      };

  //Generate the Genres Dropdown List
  var genresLabel = $("<label>");
      genresLabel.attr("class", "label");
      genresLabel.attr("for", "genresDropdown");
      genresLabel.text("Genre: ");

  var genresDropdown = $("<select>");
      genresDropdown.attr("id", "genresDropdown");
      genresDropdown.attr("class", "form-control");

      for (var i = 0; i < genres.length; i++) {
      
      genresOption = $("<option>");
      genresOption.attr("value", genres[i].name);
      genresOption.attr("id", genres[i].id);
      genresOption.text(genres[i].name);

      genresDropdown.append(genresOption);

      };

  //Generate the Submit button
  var searchSubmitBtn = $("<button>");

  searchSubmitBtn.attr("id", "results");
  searchSubmitBtn.attr("type", "submit");
  searchSubmitBtn.attr("class", "btn btn-primary submitBtn");
  searchSubmitBtn.text("Submit");


  //Connect the form components
  nameLabel.appendTo(searchForm);
  nameField.appendTo(searchForm);
  emailLabel.appendTo(searchForm);
  emailField.appendTo(searchForm);
  ratingsLabel.appendTo(searchForm);
  ratingsGroup.appendTo(searchForm);
  genresLabel.appendTo(searchForm);
  genresDropdown.appendTo(searchForm);
  
  //Append the form and button to the HTML
  searchForm.appendTo("#container");
  searchSubmitBtn.appendTo("#container");

  var selectedGenre = $("#genresDropdown option:selected").attr("id")

};
$('#results').on('click', function showMovies(){


  event.preventDefault();
  //Assigns the user inputed name to the name varriable
  name = $("#nameField").val().trim();
  //Assigns the user inputed email to the email varriable
  email = $("#emailField").val().trim();




  //event.preventDefault();
  //removes html from container that will house new data on this page
  $('#container').hide()

  const API_KEY = "b20fd857a48febf56f02e2bba3f75e22"
  //grabs current date at time of call, this helps get rid of un-released movies appearing in search - movies in theatres CAN appear, 
  //but it is sorted by vote count so this will weed some out a bit
  var currentDate = moment().format("YYYY-MM-DD");
  console.log(currentDate)
  //API uses ID's to identify genres instead of string ex: 10402 = Mystery

  var genreID = $("#genresDropdown option:selected").attr("id");

  //query is set to display rating less or equal to parameter so if pg-13 selected R or NC-17 will not populate. EXCEPTION - NR is technicaly ranked below G, 
  //so although some NR films are equivilent to this query, any film with an unrated version ex: American Pie Unrated will show
  var rating = $("form input:checked").val();
  //query URL for TMDB - used this DM over OMDB as it has a lot more search parameters
  var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=vote_count.desc&certification_country=US&certification.lte=" + rating +"&include_adult=false&include_video=false&page=1&primary_release_date.lte=" + currentDate + "&with_genres=" + genreID
  $.ajax({
      //https://www.themoviedb.org/documentation/api
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(queryURL)
      //Div to house all images that is linked to output in HTML
      var imgDiv = $('<div>').attr('id', "imgDiv")
      $('#movieDisplay').append(imgDiv)
      //creates access code that users will query
      var genKey = makeId()
      //for loop to create 5 posters and place them on page
      for (var i=1;i<6; i++){
          //varible for poster url
          var posterURL = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path
          //gets poster img based on URL
          var poster = $('<img>').attr('src', posterURL)
          //variable to house movie title
          var movieTitle = response.results[i].title
          //ads ID for styling and data for pushing up to firebase
          $(poster).attr('id', "poster").attr('data', movieTitle)
          //stores URL in data in addition to SRC
          $(poster).attr('data-img', posterURL)
          //links poster to imgDiv created above
          $(imgDiv).append(poster)
          //pushes the new data up to firebase as it is gen
          //Exception - will need to modify to allow user to manually add items in
          database.ref(genKey+'/Movies').child('Movie '+i).set({
                  "Title": movieTitle,
                  "Poster": posterURL
              })
      }
      database.ref(genKey).child('Host').set({
        "Email": email,
        "Name": name
      })
      //creates button that will submit results and trigger firebase call
      var newBtn = $('<button class="btn text-center" type="submit">')
      newBtn.text("Confirm")
      newBtn.attr('id', "pushSelection")
      newBtn.attr("class", "btn btn-primary newBtn");
      $('#movieDisplay').append(newBtn)
    })
  })
});

//generates random 5-character user ID - will need to switch to a better system
//but works for now since after survey is done, data is wiped from firebase
function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
