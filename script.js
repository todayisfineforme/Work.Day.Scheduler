// code to write the rows to the DOM
// rows need to cover one hour each 
// each row needs an input and a button to save the input and display it
// each row needs to save to local storage
// needs to reference local storage 
// rows change state based on if it is in the past, present or future
    //grey for the past 
    //white for present
    //beige for the future

$(document).ready(function(){

    var now = moment();

    var datetime = null;
    
    var date = null;

    var schedule = {
        nine: "",
        ten: "",
        eleven: "",
        twelve: "",
        one: "",
        two: "",
        three: "",
        four: "",
        five: ""
    }

    function update () {
        date = moment(new Date())
        datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    };

    $(document).ready(function(){
        datetime = $('#currentDay')
        update();
        setInterval(update, 1000);
    });











});