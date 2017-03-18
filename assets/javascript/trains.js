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


    //variables
    var train = "";
    var destination = "";
    var trainTime = "";
    var Frequency = 0;
    var arrival = "";
    var minutes = 0;



    var currentTime = moment().format('HH:mm');


    // Adding a train
    function submitForm() {
        $("#addTrain").on("click", function(event) {
            event.preventDefault();

            //data stored in variables
            trainName = $("#name").val().trim();
            trainDestination = $("#des").val().trim();
            trainTime = $("#firstTrain").val().trim();
            trainFrequency = parseInt($("#fre").val().trim());


            var newTrain = {
                trainName: trainName,
                trainDestination: trainDestination,
                trainTime: trainTime,
                trainFrequency: trainFrequency
            };

            database.ref().push(newTrain);

            console.log(newTrain.trainName);
            console.log(newTrain.trainDestination);
            console.log(newTrain.trainTime);
            console.log(newTrain.trainFrequency);

            //Empty fields
            $("#name").val("");
            $("#des").val("");
            $("#firstTrain").val("");
            $("#fre").val("");

        });
    }



    //end click



    //Display child --added train with function
    function trainTable() {
        database.ref().on("child_added", function(snapshot) {
            console.log(snapshot.val());


            trainName = snapshot.val().trainName;
            trainDestination = snapshot.val().trainDestination;
            trainTime = snapshot.val().trainTime;
            trainFrequency = snapshot.val().trainFrequency;
            console.log(trainName, trainDestination, trainTime, trainFrequency);


            //Time
            
            var nextTrain = moment(trainTime, "HH:mm").subtract(1, "years");
            var difference = moment().diff(moment(nextTrain), "minutes");
            var remaining = difference % trainFrequency;
            var minutes = trainFrequency - remaining;
            // arival time
            var arrival = moment().add(minutes, "minutes");


            $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(arrival).format("HH:mm") + "</td><td>" + minutes + "</td></tr>");
        });

    }



    //what the page is actually for
    $(document).ready(function() {
        submitForm();
        trainTable();
        console.log("Time: " + currentTime);
    });