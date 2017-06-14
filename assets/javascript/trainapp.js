//Testing script link with an alert.
//alert("Hi, alert from trainapp.js");
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDBzja5fYkZL73H1No2FRI8E7XvMBeXAow",
    authDomain: "the-mad-typist.firebaseapp.com",
    databaseURL: "https://the-mad-typist.firebaseio.com",
    projectId: "the-mad-typist",
    storageBucket: "the-mad-typist.appspot.com",
    messagingSenderId: "1002549456948"
  };

firebase.initializeApp(config);

var database = firebase.database();
// click button value and counter set up //
var initialValue = 25;
var clickCounter = initialValue;

$("#click-button").on("click",function() {
  clickCounter--;
  if (clickCounter === 0) {
    alert("Sorry, but we are out of seats");
    clickCounter = initialValue;
  }
  database.ref().set({
    clickCount: clickCounter
  });
  console.log(clickCounter);
});
// restart button...
$("#restart-button").on("click", function() {
  clickCounter = initialValue;
  console.log(clickCounter);
  $("#click-value").html(clickCounter);

});

// Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDestination = $("#destination-input").val().trim();
  var trnStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trnRate = $("#rate-input").val().trim();
  var trnSeat = $("#seat-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrn = {
    name: trnName,
    destination: trnRole,
    start: trnStart,
    rate: trnRate,
    seat: trnSeat
  };

  // Uploads employee data to the database
  database.ref().push(newTrn);

  // Logs everything to console
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.start);
  console.log(newTrn.rate);
  console.log(newTrn.seat);

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
  $("#seat-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnRole = childSnapshot.val().destination;
  var trnStart = childSnapshot.val().start;
  var trnRate = childSnapshot.val().rate;
  var trnSeat = childSnapshot.val().seat;

  // Employee Info
  console.log(trnName);
  console.log(trnRole);
  console.log(trnStart);
  console.log(trnRate);
  console.log(trnSeat);

  // Prettify the employee start

  var trnStartPretty = moment.unix(trnStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trnMonths = moment().diff(moment.unix(trnStart, "X"), "months");
  console.log(trnMonths);

  // Train bill
  var trnBilled = trnMonths * trnRate;
  console.log(trnBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnStartPretty + "</td><td>" + trnMonths + "</td><td>" + trnRate + "</td><td>" + trnBilled + "</td></tr>");
});


$('#train-table').html