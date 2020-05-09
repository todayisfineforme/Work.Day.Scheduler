$(document).ready(function(){

    var now = moment();

    var datetime = null;
    
    var date = null;

    var schedule = JSON.parse(localStorage.getItem("schedule"));

    $(document).ready(function(){
        datetime = $('#currentDay');
        checkForSchedule();
        insertSchedule();
        update();
        setInterval(update, 1000);
    });

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

    function insertSchedule(){
        $('textarea').each(function(){
            var textBox = $(this);
            var boxId = textBox[0].id ;
            $(this).html(schedule[boxId]);
        })
    };

    function update(){
        displayTime();
        blockState();
    }

    function displayTime () {
        date = moment(new Date())
        datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    };

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

    $('.saveBtn').on('click', function(){
        var textObject = $(this).parent().find("textarea");
        var textValue = textObject[0].value;
        var idValue = textObject[0].id;
        schedule[idValue] = textValue;
        localStorage.setItem("schedule", JSON.stringify(schedule)); 
    });
});