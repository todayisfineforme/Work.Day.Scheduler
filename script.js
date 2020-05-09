$(document).ready(function(){

    //GLOBAL VARIABLES
    var now = moment();

    var datetime = null;
    
    var date = null;
    
    // fetches the local storage for the schedule
    var schedule = JSON.parse(localStorage.getItem("schedule"));

    //FUNCTIONS
    //separated out a block of functions to run on page load, 1 sec interval for upload function ensures that page stays up to date by the second
    $(document).ready(function(){
        datetime = $('#currentDay');
        checkForSchedule();
        insertSchedule();
        update();
        setInterval(update, 1000);
    });

    //ensures that if there is no local storage, that the object will be created and stored in local storage
    function checkForSchedule(){
        if ( schedule == null) {
            schedule = {
                nineAM: "",
                tenAM: "",
                elevenAM: "",
                twelvePM: "",
                onePM: "",
                twoPM: "",
                threePM: "",
                fourPM: "",
                fivePM: ""
            };
            localStorage.setItem("schedule", JSON.stringify(schedule));
        } else {
            schedule = JSON.parse(localStorage.getItem("schedule"));
        }
    }

    //writes the saved text from local storage into the text area
    function insertSchedule(){
        $('textarea').each(function(){
            var textBox = $(this);
            var boxId = textBox[0].id ;
            $(this).html(schedule[boxId]);
        })
    };

    //grouped these functions so that they would both run under a single setInterval statement 
    function update(){
        displayTime();
        blockState();
    }

    //displays new moment each time it is called
    function displayTime () {
        date = moment(new Date())
        datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    };

    //checks moment and sets class of textarea to reflect if it is past, present or future
    function blockState(){
        $('textarea').each(function( index,element ){
            var dataHour = (parseInt(this.dataset.hour));
            if (now.hour() === dataHour){
                $(this).removeClass("past present future").addClass("present");
            }else if (now.hour() > dataHour){
                $(this).removeClass("past present future").addClass("past");
            }else{
                $(this).removeClass("past present future").addClass("future");
            };
        });
    }

    //EVENT LISTENERS
    //event listener on the save buttons that selectively saves whatever string is in the sibling textarea
    $('.saveBtn').on('click', function(){
        var textObject = $(this).parent().find("textarea");
        var textValue = textObject[0].value;
        var idValue = textObject[0].id;
        schedule[idValue] = textValue;
        localStorage.setItem("schedule", JSON.stringify(schedule)); 
    });
});