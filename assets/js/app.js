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
var movieCount = 0
var name;
var email;
var message;
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


$('.navbar').hide()
var getStartedBtn = $("<button>");

getStartedBtn.attr("id", "getStartedBtn");
getStartedBtn.attr("type", "submit");
getStartedBtn.attr("class", "btn btn-primary");
getStartedBtn.text("Get Started!");

getStartedBtn.appendTo("#container");

$("#getStartedBtn").on("click", function () {
    $('#accessCodeDiv').hide()
    $('#header').hide()
    $('.navbar').show()
  //Steps to hide/clear the landing page and run makeSearchForm
    $("#container").empty();
    $("#footer").hide();
    makeSearchForm();

  //Function to generate the Form that gathers information needed to process the API call
function makeSearchForm() {
  //Create the Form to which all form fields will be appended
  var searchForm = $("<form>");

      searchForm.attr("id", "searchForm");
      searchForm.attr("class", "form-horizontal");

  //Generate the Name Field
  var nameDiv = $("<div>");
      nameDiv.attr("class", "form-group row justify-content-around");

  var nameLabel = $("<label>");
      nameLabel.attr("class", "col-sm-2 col-form-label labels");
      nameLabel.attr("for", "nameField");
      nameLabel.text("Name: ");

  var nameField = $("<input>");

      nameField.attr("type", "text");
      nameField.attr("id", "nameField");
      nameField.attr("class", "form-control col-sm-10");

      nameDiv.append(nameLabel);
      nameDiv.append(nameField);

  //Generate the Email Field
  var emailDiv = $("<div>");
      emailDiv.attr("class", "form-group row justify-content-around");

  var emailLabel = $("<label>");
      emailLabel.attr("class", "col-sm-2 col-form-label labels");
      emailLabel.attr("for", "emailField");
      emailLabel.text("Email: ");

  var emailField = $("<input>");

      emailField.attr("type", "email");
      emailField.attr("id", "emailField");
      emailField.attr("class", "form-control col-sm-10");

      emailDiv.append(emailLabel);
      emailDiv.append(emailField);

  //Generate the Ratings Checkboxes
  var ratingsDiv = $("<div>");
      ratingsDiv.attr("class", "form-group row justify-content-around");

  var ratingsLabel = $("<label>");
      ratingsLabel.attr("class", "col-sm-2 col-form-label labels");
      ratingsLabel.attr("for","ratingsGroup");
      ratingsLabel.text("Ratings: ");

  var ratingsGroup = $("<div>");
      ratingsGroup.attr("id", "ratingsGroup");
      ratingsGroup.attr("class", "form-check-inline col-sm-10");

      for (var j=0; j < ratings.length; j++) {
  
      var ratingsCheck = $("<input>");
      var ratingsText = $('<p>')
      ratingsCheck.attr("type", "checkbox");
      ratingsCheck.attr("class", "form-check-input");
      ratingsCheck.attr("id", "ratingsCheck" + ratings[j]);
      ratingsCheck.attr("name", "ratingsCheck" + ratings[j]);
      ratingsCheck.attr("value", ratings[j]);
      
      ratingsText.attr("class", "form-check-label labels");
      ratingsText.text(ratings[j]);

      ratingsCheck.appendTo(ratingsGroup);
      ratingsGroup.append(ratingsText)
      
      };

      ratingsDiv.append(ratingsLabel);
      ratingsDiv.append(ratingsGroup);

  //Generate the Genres Dropdown List
  var genresDiv = $("<div>");
      genresDiv.attr("class", "form-group row justify-content-around");

  var genresLabel = $("<label>");
      genresLabel.attr("class", "col-sm-2 col-form-label labels");
      genresLabel.attr("for", "genresDropdown");
      genresLabel.text("Genre: ");

  var genresDropdown = $("<select>");
      genresDropdown.attr("id", "genresDropdown");
      genresDropdown.attr("class", "form-control col-sm-10");

      for (var i = 0; i < genres.length; i++) {
      
      genresOption = $("<option>");
      genresOption.attr("value", genres[i].name);
      genresOption.attr("id", genres[i].id);
      genresOption.text(genres[i].name);

      genresDropdown.append(genresOption);

      };

      genresDiv.append(genresLabel);
      genresDiv.append(genresDropdown);

  //Generate the Submit button
  var searchSubmitBtn = $("<button>");

  searchSubmitBtn.attr("id", "results");
  searchSubmitBtn.attr("type", "submit");
  searchSubmitBtn.attr("class", "btn btn-primary");
  searchSubmitBtn.text("Submit");


  //Connect the form components
  nameDiv.appendTo(searchForm);
  emailDiv.appendTo(searchForm);
  ratingsDiv.appendTo(searchForm);
  genresDiv.appendTo(searchForm);
  searchSubmitBtn.appendTo(searchForm);
  
  //Append the form and button to the HTML
  searchForm.appendTo("#container");
  

  var selectedGenre = $("#genresDropdown option:selected").attr("id");

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
  var pageNum = Math.floor(Math.random()*10 + 1)
  var genreID = $("#genresDropdown option:selected").attr("id")
  //query is set to display rating less or equal to parameter so if pg-13 selected R or NC-17 will not populate. EXCEPTION - NR is technicaly ranked below G, 
  //so although some NR films are equivilent to this query, any film with an unrated version ex: American Pie Unrated will show
  var ratingArr = [];
  $('form input:checked').each(function(i){
    ratingArr[i] = $(this).val();
  });
    if(ratingArr.length>1){
      var rating = ratingArr.join('|')
      console.log("Multiple ratings: "+rating)
    } else {
      var rating = ratingArr[0]
      console.log("only 1 rating: "+rating)
    }
  //query URL for TMDB - used this DM over OMDB as it has a lot more search parameters
  var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=vote_count.desc&certification_country=US&certification=" + rating +"&include_adult=false&include_video=false&page="+ pageNum +"&primary_release_date.lte=" + currentDate + "&with_genres=" + genreID
  $.ajax({
      //https://www.themoviedb.org/documentation/api
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(queryURL)
      tmdbArr = []
      for (i=0; i<20; i++){
        tmdbArr.push(response.results[i])
      }
      console.log(tmdbArr)

      //Div to house all images that is linked to output in HTML
      var imgDiv = $('<div>').attr('id', "imgDiv")
      $('#movieDisplay').append(imgDiv)
      //creates access code that users will query
      var genKey = makeId()
      function shuffle(tmdbArr) {
        var currentIndex = tmdbArr.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = tmdbArr[currentIndex];
          tmdbArr[currentIndex] = tmdbArr[randomIndex];
          tmdbArr[randomIndex] = temporaryValue;
        }
        return tmdbArr;
      }
      var newBtn = $('<button type="submit">')
      newBtn.text("Confirm")
      newBtn.attr('id', "pushSelection")
      newBtn.attr("class", "btn btn-primary");
      $('#movieDisplay').append(newBtn)
      var deleteMovie = $('<button type="submit">')
      deleteMovie.text("Swap out a movie?")
      deleteMovie.attr('id', "deleteMovie")
      deleteMovie.attr("class", "btn btn-primary")
      $('#movieDisplay').append(deleteMovie)
      var movieForm = $('<div id="addMovie" class="input-group input-group-sm mb-3 float-right w-25 p-4 col-2">')
      var movieInput = $('<input id="movieSearch" class="form-control" placeholder="Search for a movie!">')
      var movieInputGroup = $('<div class="input-group-append">')
      var addMovie = $('<button id="movieSearchSubmit" class="btn btn-primary px-3" type="submit"><i class="fas fa-search"></i>')
      $(movieForm).append(movieInput)
      $(movieInputGroup).append(addMovie)
      $(movieForm).append(movieInputGroup)
      $('.searchBar').append(movieForm)
      $('#addMovie').hide()
      
      //for loop to create 5 posters and place them on page
      for (var i=0;i<5; i++){
          shuffle(tmdbArr)
          //varible for poster url
          var posterURL = "https://image.tmdb.org/t/p/w500" + tmdbArr[i].poster_path
          //gets poster img based on URL
          var poster = $('<img>').attr('src', posterURL).addClass('w-75 position-relative')
          //variable to house div for image
          var posterDiv = $('<div>').addClass('posterDiv m-0 p-4')
          //variable to house movie title
          var movieTitle = tmdbArr[i].title
          //ads ID for styling and data for pushing up to firebase
          $(poster).attr('id', "poster").attr('data-title', movieTitle)
          //stores URL in data in addition to SRC
          $(poster).attr('data-img', posterURL)
          //links poster to posterDIv
          $(posterDiv).append(poster)
          //links posterDiv to imgDiv created above
          $(imgDiv).append(posterDiv)
          //pushes the new data up to firebase as it is gen
          //Exception - will need to modify to allow user to manually add items in
          tmdbArr.splice(i, 1)
          var deleteBtn = $(`<button data-title="${movieTitle}" data-img="${posterURL}" class="btn btn-primary deleteBtn"><i class="far fa-trash-alt"></i></button>`)
          $(posterDiv).append(deleteBtn)
          $('.deleteBtn').hide()
          movieCount++
        }
        console.log(movieCount)
      $('#deleteMovie').on('click', function(){
        $('.deleteBtn').show()
        $('#deleteMovie').hide()
        $('.deleteBtn').on('click', function() {
          var titleDel = $(this).attr('data-title')
          var posterDel = $(this).attr('data-img')
          console.log(titleDel, posterDel)
          $(this).closest('div').remove()
          movieCount--
          console.log(movieCount)
          if (movieCount<5){
            $('#addMovie').show()
          }
        })
        $('#movieSearchSubmit').on('click', function(){
          var keyword = $('#movieSearch').val().trim().replace(/\s/g, '+')
          var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&query=" + keyword + "&page=1&include_adult=true"
          $.ajax({
            //https://www.themoviedb.org/documentation/api
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(queryURL)
            console.log(response)
            if (response.total_results === 0||undefined){
              $('#movieSearch').remove()
              var movieInput = $('<input id="movieSearch" class="form-control" placeholder="Search for a movie!">')
              $('#addMovie').prepend(movieInput)
              $('.modal-text').text("We aren't finding what your looking for, please check spelling and try again.")
              $(".modal").modal();
              console.log("modal should have fired")
            } else {
            //dropdown menu shows movie title + year
            $('#movieSearch').remove()
            var movieInput = $('<select id="movieSearch" class="custom-select"><option selected>Choose Your Movie</option>')
            $('#addMovie').prepend(movieInput)
            for(i=0, j=1, m=response.results.length;i<m, j<m+1;i++, j++){
              var newOption = $(`<option value="${j}">`)
              var movieName = response.results[i].title
              var movieRelease = response.results[i].release_date
              var movieYear = moment(movieRelease, 'YYYY-MM-DD').format('YYYY')
              var movieText = `${movieName} (${movieYear})`
              var moviePoster = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path
              $(newOption).text(movieText).attr('data-img', moviePoster).attr('data-title', movieName).attr('id', "customMovie")
              $('#movieSearch').append(newOption)
            }
          }
              //dropdown item on click creates new div on page and adds 1 to movie count
              $('select').change(function(){
                console.log('appended')
                  //varible for poster url
                  var posterURL = $("#movieSearch option:selected").attr('data-img')
                  console.log($("#movieSearch option:selected").attr('data-img'))
                  //gets poster img based on URL
                  var poster = $('<img>').attr('src', posterURL).addClass('w-75 position-relative')
                  //variable to house div for image
                  var posterDiv = $('<div>').addClass('posterDiv m-0 p-4')
                  //variable to house movie title
                  var movieTitle = $("#movieSearch option:selected").attr('data-title')
                  //ads ID for styling and data for pushing up to firebase
                  $(poster).attr('id', "poster").attr('data-title', movieTitle)
                  //stores URL in data in addition to SRC
                  $(poster).attr('data-img', posterURL)
                  //links poster to posterDIv
                  $(posterDiv).append(poster)
                  //links posterDiv to imgDiv created above
                  $('#imgDiv').append(posterDiv)
                  //pushes the new data up to firebase as it is gen
                  //Exception - will need to modify to allow user to manually add items in
                  var customDeleteBtn = $(`<button data-title="${movieTitle}" data-img="${posterURL}" class="btn btn-primary customDeleteBtn"><i class="far fa-trash-alt"></i></button>`)
                  $(posterDiv).append(customDeleteBtn)
                  movieCount++
                  console.log(movieCount)
                  $('#movieSearch').remove()
                  var movieInput = $('<input id="movieSearch" class="form-control" placeholder="Search for a movie!">')
                  $('#addMovie').prepend(movieInput)
                  $('#addMovie').hide()
                  if (movieCount<5){
                    $('#addMovie').show()
                  }
                  //this function kept running as many times as the class was on the page 
                  //which would run the movieCount var down causing major issues
                  //figured out it was here that was causing but even then took me a few hours 
                  //trying different functions until .unbind() did the trick
                  //gooooooood lord
                  $('.customDeleteBtn').unbind().click(function() {
                    var titleDel = $(this).attr('data-title')
                    var posterDel = $(this).attr('data-img')
                    console.log(titleDel, posterDel)
                    $(this).closest('div').remove()
                    movieCount--
                    console.log(movieCount)
                    if (movieCount<5){
                      $('#addMovie').show()
                    }
                  })

              })
          })
        })
      })
      console.log(genKey)
      database.ref(genKey).child('Attendees').set({
        "Host": email,
      })
      database.ref(genKey).child('Host').set({
        "Host Name": name,
      })
      //creates button that will submit results and trigger firebase call
      $("#pushSelection").on("click", function() {
          movieDBTitle = []
          movieDBPoster = []
          movieDBPush = []
          $('img[data-title]').each(function(){
            movieDBTitle.push($(this).data('title'))
          })
          $('img[data-img]').each(function(){
            movieDBPoster.push($(this).data('img'))
          })
          for(i=0;i<movieDBPoster.length;i++){
            var movieTitle = movieDBTitle[i]
            var posterURL = movieDBPoster[i]
            var movieObj = {movieTitle, posterURL}
            movieDBPush.push(movieObj)
          }
          console.log(movieDBPush)
          console.log(movieDBTitle)
          console.log(movieDBPoster)
          for(i=0;i<movieCount;i++) {
          database.ref(genKey+'/Movies').child('Movie_'+i).set({
            "Title": movieDBPush[i].movieTitle,
            "Poster": movieDBPush[i].posterURL,
            "Vote_Count": 0
          })
          }
          database.ref(genKey).child('Feature Count').set({
            'Feature Count': movieCount
          })
          console.log(genKey)
          $('#movieDisplay').hide()
        inviationForm();
    var addFriendCount = 0;

      $("#addFriendBtn").on("click", function(){
        addFriendCount++;
        var additionalEmail = $("<input>");
        additionalEmail.attr("type", "email");
        additionalEmail.attr("id", `friendEmail_${addFriendCount}`);
        additionalEmail.attr("class", "form-control col-sm-8 offset-sm-1 addedFriend");
        $("#friendDiv").append(additionalEmail);

      });

        function inviationForm() {
    
          var inviteForm = $("<form>");
          inviteForm.attr("id", "inviteForm");
          inviteForm.attr("class", "form-horizontal");
    
          //Generate Email input for inviting friends
          var friendDiv = $("<div>");
          friendDiv.attr("class", "form-group row justify-content-center");
          friendDiv.attr("id", "friendDiv");
    
          var friendLabel = $("<label>");
          friendLabel.attr("class", "col-sm-2 col-form-label labels");
          friendLabel.attr("for", "friendEmail");
          friendLabel.text("Friends: ");
          
          
          friendDiv.append(friendLabel);
          //for (i=1; i<5; i++) {
            var friendEmail = $("<input>");
            friendEmail.attr("type", "email");
            friendEmail.attr("id", `friendEmail_0`);
            friendEmail.attr("class", "form-control col-sm-8");
            friendEmail.attr("placeholder", "ex: yourfriend@filmplusfriends.com");
            friendDiv.append(friendEmail);
          //}
    
          friendDiv.appendTo(inviteForm);

          //Add Friend Button
          var addFriendDiv = $("<div>");
          addFriendDiv.attr("id", "addFriendBtn");
          addFriendDiv.attr("class", "col-sm-1");
          

          var addFriend = $("<i>");
          addFriend.attr("class", "fas fa-plus-circle btn");
          addFriendDiv.append(addFriend);
          friendDiv.append(addFriendDiv);

          //Message area
          var messageDiv = $("<div>");
          messageDiv.attr("class", "form-group row justify-content-center");

          var messageLabel = $("<label>");
          messageLabel.attr("class", "col-sm-2 col-form-label labels");
          messageLabel.attr("for", "messageBox");
          messageLabel.text("Details: ");

          var messageBox = $("<textarea>");
          messageBox.attr("class", "form-control col-sm-9");
          messageBox.attr("id", "messageBox");
          messageBox.attr("rows", "8");
          messageBox.attr("placeholder", "Don't forget to include when and where your movie night will happen! Maybe, offer details of what your friends should bring!");
          
          messageDiv.append(messageLabel);
          messageDiv.append(messageBox);

          messageDiv.appendTo(inviteForm);
          
          //Submit Btn for Sending the Invites
          var sendInviteBtn = $("<button>");
    
          sendInviteBtn.attr("id", "sendInviteBtn");
          sendInviteBtn.attr("class", "btn btn-primary");
          sendInviteBtn.attr("type", "submit");
          sendInviteBtn.text("Send");
          sendInviteBtn.appendTo(inviteForm);
    
          inviteForm.appendTo("#emailDisplay");


          $('#sendInviteBtn').on('click', function(){
            event.preventDefault()

            message = $("#messageBox").val().trim();

            for (var k = 0; k <= addFriendCount; k++) {
              var currentEmail = $("#friendEmail_" + k ).val().trim();
              database.ref(genKey).child('Attendees').update({
                [`Guest_${k}`]: currentEmail
              });

              var emailAPIData = {
                service_id: 'default_service',
                template_id: 'sendsurvey',
                user_id: 'user_f8xmQlMBlmM86ckD62Lis',
                template_params: {
                    'email': currentEmail,
                    'name': name,
                    'message': message,
                    'accesscode': genKey
                }
            };
             
            $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                type: 'POST',
                data: JSON.stringify(emailAPIData),
                contentType: 'application/json',
                async: false
            }).done(function() {
              $('.modal-text').text("Your email has been sent!")
              $(".modal").modal();
            }).fail(function(error) {
              $('.modal-title').text("Reload the page and try again.")
              $('.modal-text').text('Oops... ' + JSON.stringify(error))
              $(".modal").modal();
            });

            };//end for loop
           
            document.location.reload();
          });
          
          
         

        };
    
      });
    })
    
  })

//generates random 5-character user ID - will need to switch to a better system
//but works for now since after survey is done, data is wiped from firebase
function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
})

$('#accessCodeBtn').on('click', function(){
  console.log("ive been clicked")
  var accessCode = $('#accessCode').val().trim()
  console.log(accessCode)
  database.ref(accessCode).once("value")
  .then(function(snapshot) {
    snapshot.exists();  // true
    if (!snapshot.exists()){
      $('.modal-title').text("Not finding anything")
      $('.modal-text').text("Please confirm you have typed out your access code properly. If you don't have one, click Get Started")
      $(".modal").modal();
      $('.close').on('click', function(){
        document.location.reload();
      })
    }
  });

  database.ref(accessCode).on('value', function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    console.log(returnArr)
    $('#header, #container, #footer, #accessCodeDiv').hide()
    $('.navbar').show()
    var votingDiv = $('#votingDisplay')
    votingDiv.append('<div>')
    votingDiv.append('<h1>').addClass('text-center titleText p-4 m-4').text('Select Feature, then cast your vote')
    votingDiv.append('<br>')
    var maxMoviePosterArr = [returnArr[3].Movie_0.Poster, returnArr[3].Movie_1.Poster, returnArr[3].Movie_2.Poster, returnArr[3].Movie_3.Poster, returnArr[3].Movie_4.Poster]
    var maxMovieNameArr = [returnArr[3].Movie_0.Title, returnArr[3].Movie_1.Title, returnArr[3].Movie_2.Title, returnArr[3].Movie_3.Title, returnArr[3].Movie_4.Title]
    var moviePosterArr = []
    var movieNameArr = []
    database.ref(accessCode + '/Feature Count/').child('Feature Count').on('value', function(snapshot){
      featureCount = snapshot.val()
    })
    console.log(featureCount)
    for (i=0; i<featureCount; i++){
      movieNameArr.push(maxMovieNameArr[i])
      moviePosterArr.push(maxMoviePosterArr[i])
    }
    console.log(maxMovieNameArr, maxMoviePosterArr)
    for (i=0; i<featureCount; i++) {
      var votingPoster = $('<img>').attr('src', moviePosterArr[i]).attr('data', `Movie_${i}`).addClass('w-25 p-2 movieImg').attr('id', movieNameArr[i])
      votingDiv.append(votingPoster)
    }
    votingDiv.append('<button id="submitVote" class="btn btn-primary">Register Vote</button>')
    $('.movieImg').on('click', function(){
      $('.movieImg').each(function(){
        $('.movieImg').removeClass('selected')
      })
      $(this).addClass('selected')
      $('#submitVote').on('click', function(){
        event.preventDefault()
        if ($('.movieImg').hasClass('selected')) {
          var userVote = $('.selected').attr('data')
          console.log(userVote)
          database.ref(accessCode + '/Movies/' + userVote).child('Vote_Count').once('value').then(function(childSnapshot) {
            var voteNum = childSnapshot.val()
            votePlus = parseInt(voteNum) + 1
              console.log(votePlus)
            database.ref(accessCode + '/Movies').child(userVote).update({
              "Vote_Count": votePlus
            })
          })
          $('#votingDisplay').hide()
          var animeDiv = $('<div>').addClass('loadingBar')
          var messageDiv = $('<div>').append('<h1>').text("Thank You for voting!")
          messageDiv.append(animeDiv)
          $('#messageDisplay').append(messageDiv)
            checkVotes()
            function checkVotes(){
              //query firebase for votenumber of every movie
              var queryArr = [];
              database.ref(accessCode + '/Movies').on('value', function snapshotToArray(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
            
                    queryArr.push(item);
                });
              })
              
              var voteCountArr = [queryArr[0].Vote_Count, queryArr[1].Vote_Count, queryArr[2].Vote_Count, queryArr[3].Vote_Count, queryArr[4].Vote_Count];
              var movieNumArr = [queryArr[0].key, queryArr[1].key, queryArr[2].key, queryArr[3].key, queryArr[4].key];
              var emailArr = [];
              console.log(emailArr)
              console.log(movieNumArr)
              console.log(voteCountArr)
              database.ref(accessCode + '/Attendees').on('value', function snapshotToArray(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
            
                    emailArr.push(item);
                });
              })
              console.log(emailArr)
              var totalVotes = voteCountArr.reduce(add, 0);
                function add(a, b) {
                  return a + b;
                }
              //sort out movies based on vote count
              console.log(queryArr)
              console.log(movieNumArr)
              console.log(voteCountArr)
              console.log(totalVotes)
              //var emailCount = [emailArr[0], emailArr[1], emailArr[2], emailArr[3], emailArr[4]]
              var emailCount = []
              for (i=0; i<emailArr.length;i++){
                emailCount.push(emailArr[i])
              }
              //removes empty strings from array
              emailCount = emailCount.filter(v=>v!='')
              console.log(emailCount.length)
              console.log(totalVotes)
              //if total votes equals ammount of emails submitted - fire email
                if(totalVotes === emailCount.length -1){
                  //Send email with results
                  var highestVote = Math.max.apply(null, voteCountArr)
                  var winnerPosition = voteCountArr.indexOf(highestVote)
                  var winner = movieNumArr[winnerPosition]
                  console.log(highestVote)
                  console.log(winnerPosition)
                  console.log(winner)
                  database.ref(accessCode + '/Movies/' + winner).once('value', function(snapshot){
                    var winningPoster = snapshot.val().Poster
                    var winningTitle = snapshot.val().Title
                    console.log(winningPoster)
                    console.log(winningTitle)

                    for (var z = 0; z < emailArr.length; z++){
                      var finalEmail = emailArr[z];
                      console.log(emailArr[z])
                      console.log(finalEmail)
                    
                      var resultsAPIData = {
                        service_id: 'default_service',
                        template_id: 'winningmovie',
                        user_id: 'user_f8xmQlMBlmM86ckD62Lis',
                        template_params: {
                          'email': finalEmail,
                          'movietitle': winningPoster,
                          'movieposter': winningTitle
                        }
                      };
                   
                      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                          type: 'POST',
                          data: JSON.stringify(resultsAPIData),
                          contentType: 'application/json',
                          async: false
                      }).done(function() {
                        $('.modal-title').text("And the winner is...")
                        $('.modal-text').text("")
                        $(".modal").modal();
                        $('.close').on('click', function(){
                          document.location.reload();
                        })

                      }).fail(function(error) {
                        $('.modal-title').text("Reload the page and try again.")
                        $('.modal-text').text('Oops... ' + JSON.stringify(error))
                        $(".modal").modal();
                        $('.close').on('click', function(){
                          document.location.reload();
                        })
                      });

                    }//end of for loop
                  })
                  //purge data from firebase after voting ends
                  //ref.child(accessCode).remove();
                } else {
                //replace with moda
                $('.modal-title').text("Right on!")
                $('.modal-text').text("A few more friends still need to vote, keep an eye on your email for the results")
                $(".modal").modal();
                $('.close').on('click', function(){
                  document.location.reload();
                })
              }
            }
        } else {
          $('.modal-title').text("Oops!")
          $('.modal-text').text("Please make a selection before proceeding")
          $(".modal").modal();
          $('.close').on('click', function(){
            document.location.reload();
          })
        }
        
        })
      })
    })
  })
