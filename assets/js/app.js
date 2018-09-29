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
  searchSubmitBtn.attr("class", "btn btn-primary");
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
  var rating = $("form input:checked").val();
  //query URL for TMDB - used this DM over OMDB as it has a lot more search parameters
  var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=vote_count.desc&certification_country=US&certification.lte=" + rating +"&include_adult=false&include_video=false&page="+ pageNum +"&primary_release_date.lte=" + currentDate + "&with_genres=" + genreID
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
      //for loop to create 5 posters and place them on page
      for (var i=0;i<4; i++){
          shuffle(tmdbArr)
          //varible for poster url
          var posterURL = "https://image.tmdb.org/t/p/w500" + tmdbArr[i].poster_path
          //gets poster img based on URL
          var poster = $('<img>').attr('src', posterURL).addClass('w-25 p-2')
          //variable to house movie title
          var movieTitle = tmdbArr[i].title
          //ads ID for styling and data for pushing up to firebase
          $(poster).attr('id', "poster").attr('data', movieTitle)
          //stores URL in data in addition to SRC
          $(poster).attr('data-img', posterURL)
          //links poster to imgDiv created above
          $(imgDiv).append(poster)
          //pushes the new data up to firebase as it is gen
          //Exception - will need to modify to allow user to manually add items in
          database.ref(genKey+'/Movies').child('Movie_'+i).set({
                  "Title": movieTitle,
                  "Poster": posterURL,
                  "Vote_Count": 0
              })
          tmdbArr.splice(i, 1)
      }
      database.ref(genKey).child('Attendees').set({
        "Host": email,
      })
      database.ref(genKey).child('Host').set({
        "Host Name": name,
      })
      //creates button that will submit results and trigger firebase call
      var newBtn = $('<button type="submit">')
      newBtn.text("Confirm")
      newBtn.attr('id', "pushSelection")
      newBtn.attr("class", "btn btn-primary");
      $('#movieDisplay').append(newBtn)
      $("#pushSelection").on("click", function() {
        $('#movieDisplay').hide()
        inviationForm();
    
    
        function inviationForm() {
    
          var inviteForm = $("<form>");
          inviteForm.attr("id", "inviteForm");
    
          //Generate Email input for inviting friends
          var friendDiv = $("<div>");
          friendDiv.attr("class", "form-group");
    
          var friendLabel = $("<label>");
          friendLabel.attr("class", "label");
          friendLabel.attr("for", "friendEmail");
          friendLabel.text("Friends Emails: ");
          friendDiv.append(friendLabel);
          for (i=1; i<5; i++) {
            var friendEmail = $("<input>");
            friendEmail.attr("type", "email");
            friendEmail.attr("id", `friendEmail_${i}`);
            friendEmail.attr("class", "form-control m-4");
            friendDiv.append(friendEmail);
          }
    
          friendDiv.appendTo(inviteForm);
    
          //Message area
          
          
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
            var email_1 = $('#friendEmail_1').val().trim()
            var email_2 = $('#friendEmail_2').val().trim()
            var email_3 = $('#friendEmail_3').val().trim()
            var email_4 = $('#friendEmail_4').val().trim()
            database.ref(genKey).child('Attendees').update({
              "Guest_1": email_1,
              "Guest_2": email_2,
              "Guest_3": email_3,
              "Guest_4": email_4
            })
            document.location.reload();
          })
        };
    
      });
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

  $('#accessCodeBtn').on('click', function(){
    var accessCode = $('#accessCode').val().trim()
    console.log(accessCode)
    database.ref(accessCode).on('value', function snapshotToArray(snapshot) {
      var returnArr = [];
      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
  
          returnArr.push(item);
      });
      $('#header, #container, #footer, #accessCodeDiv').hide()
      $('.navbar').show()
      var votingDiv = $('#votingDisplay')
      votingDiv.append('<div>')
      votingDiv.append('<h1>').addClass('text-center titleText p-4 m-4').text('Select Feature, then cast your vote')
      votingDiv.append('<br>')
      var moviePosterArr = [returnArr[2].Movie_0.Poster, returnArr[2].Movie_1.Poster, returnArr[2].Movie_2.Poster, returnArr[2].Movie_3.Poster]
      var movieNameArr = [returnArr[2].Movie_0.Title, returnArr[2].Movie_1.Title, returnArr[2].Movie_2.Title, returnArr[2].Movie_3.Title]
      for (i=0; i<4; i++) {
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
            setTimeout(function(){
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
                
                var voteCountArr = [queryArr[0].Vote_Count, queryArr[1].Vote_Count, queryArr[2].Vote_Count, queryArr[3].Vote_Count];
                var movieNumArr = [queryArr[0].key, queryArr[1].key, queryArr[2].key, queryArr[3].key];
                var emailArr = [];
                console.log(emailArr)
                database.ref(accessCode + '/Attendees').on('value', function snapshotToArray(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                      var item = childSnapshot.val();
                      item.key = childSnapshot.key;
              
                      emailArr.push(item);
                  });
                })
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
                console.log(emailCount.length)
                //if total votes equals ammount of emails submitted - fire email
                if(totalVotes === emailCount.length){
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
                  })
                  //send data via email with saved poster URL and title
                  //database.ref(accessCode).remove()
                }
              }
              document.location.reload()
            }, 10000)
          } else {
            alert("Please make a selection before proceeding")
            //will replace this with Modal, but looks OK for now
          }
          
        })
      })
    });
  })
