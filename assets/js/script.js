const workingHours = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];
var now = dayjs();
var currentDate = now.format('dddd, MMMM Do');
var currentTime = now.format('hA');
var idCurrentTime;
var container = $('.container');

// render current date in header
$('#currentDay').text(currentDate);

// idCurrentTime variable is used to add color-coding in textarea
$.each(workingHours, function(i, hours) {
    if (String(hours) === String(currentTime)){
        idCurrentTime = i;
    }
}) 

// render table with working hours. Each element has unique id to simplify access of the elements and content
$.each(workingHours, function (i, hours) {
    container.append('<div class="row time-block" id='+hours+'></div>');
    let row = $('div#'+hours);
    row.append('<div class="hour text-center col-1 col-sm-1" id=t'+i+'></div>');
    $('div#t'+i).text(hours);
    row.append('<textarea class="description col-10 col-sm-10" id=d'+i+'></textarea>');
    row.append('<button class="saveBtn col-1 col-sm-1" id='+i+'></button');
    $('button.saveBtn#'+i).text('🖪');
    // event listener for save button, and save to localStorage on click
    $('button.saveBtn#'+i).on('click', function(e){
      let index = e.currentTarget.id;
      let eventText = $('textarea#d'+index).val();
        var temp = JSON.parse(localStorage.getItem('schedule'));
        if (temp === null) {
            temp = [];
        }
        temp[i] = eventText;
        localStorage.setItem('schedule',JSON.stringify(temp));
        $("div#notification-area").slideDown().delay(2000).slideUp();
    })
    // add classes for color-coding to indicate whether it is in the past, present, or future
    if (i < idCurrentTime) {
        $('textarea#d'+i).addClass('past');
    } else if (i === idCurrentTime) {
        $('textarea#d'+i).addClass('present');
    } else if (i > idCurrentTime) {
        $('textarea#d'+i).addClass('future');
    }
}) 

// Render schedule records from local storage if exist
$(document).ready(function() {
    let storedSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (storedSchedule === null) {
        return;
    }
    $.each(storedSchedule, function(i, event) {
        $('textarea#d'+i).val(event);
    })
})
