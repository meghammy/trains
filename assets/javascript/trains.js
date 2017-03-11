
$(document).ready(function() {


  
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLfsYt2e5OJO10PdQIj61uI-s5N-7QMy4",
    authDomain: "trains-78ef9.firebaseapp.com",
    databaseURL: "https://trains-78ef9.firebaseio.com",
    storageBucket: "trains-78ef9.appspot.com",
    messagingSenderId: "257336825888"
  };

firebase.initializeApp(config);

var database = firebase.database();

var baselineDateString = "12-12-12"

var firstArrivalDateString = "11-12-12"

var baselineDate = moment(new Date(baselineDateString));



var currentTime = moment().format('LT');


$("#time").html("Current Time: " + currentTime);
console.log(currentTime);

//variables
var train = "";
var destination = "";
var firstTrain = "";
var Frequency = 0;
var arrival = "";
var minutes = 0;


//Current Time 
/*var currentTime = moment().format("hh:mm A");
    $("#time").html("Current Time: " + currentTime);*/

// Adding a train
$("#addTrain").on("click", function() {

    //data stored in variables
    var trainName = $("#name").val().trim();
    var trainDestination = $("#des").val().trim();
    var trainTime = $("#firstTrain").val().trim();
    var trainFrequency = parseInt($("#fre").val().trim());
    
    console.log("This is trainTime: " + trainTime);$("#addTrain").on("click", function() {
  


database.ref("train").push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainTime: trainTime,
    trainFrequency: trainFrequency,
    dateAdded: firebase.database.ServeValue.TIMESTAMP

    
});

    

    return false;

});

//Display child --added train
database.ref("train").on("child_added", function(snaps) {



    var trainName = snap.val().train;
    var trainDestination = snap.val().destination;
    var trainTime = snap.val().trainTime;
    var trainFrequency = snap.val().trainFrequency;
    console.log(trainName, trainDestination, trainTime, trainFrequency);

   
    //Time
    var current = moment().format('Ll');

    var trainTime = moment(trainTime, "HH:mm").subtract(1, "years");

    var difference = moment().diff(moment(trainTime), "minutes");

    var remaining = difference % trainFrequency;

    var minutes = trainFrequency - remaining;

    // arival time

    var arrival = moment().add(minutes, "minutes")

// append table
    $("#trainData").append(
        "<tr><td>" + snap.val().trainName + 
        "</td><td>" + snap.val().trainDestination + 
        "</td><td>" + snap.val().trainFrequency +
        "</td><td>" + moment(arrival).format("HH:mm") + 
        "</td><td>" + minutes + "</td></tr>");
        });
    });

function updatetrainTime(){

    $("#train-table").empty();
    $("#train-table").append(
        "<tr><th>Train Name"+
        "</th><th>Destination"+
        "</th<th>Frequency (min)"+
        "</th><th>Next Arrival"+
        "</th><th>Minutes Away"+ "</th></tr>")

database.ref("train").once("value", function(snap){
    //storing properties
    var trainName = childSnap.val().trainName;
    var trainDestination = childSnap.val().trainDestination;
    var trainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().trainTime;

    (console.log(trainName, trainDestination, trainTime, trainFrequency));
})

    // Moment for calculations        

    // Time calculations
 



    $("#train-table").append(
        "<tr><th>Train Name"+
        "</th><th>Destination"+
        "</th<th>Frequency (min)"+
        "</th><th>Next Arrival"+
        "</th><th>Minutes Away"+ "</th></tr>")

};

function startUpdateTimer(){

    setInterval(updatetrainTime, 60000);
}






startUpdateTimer();





});





   


