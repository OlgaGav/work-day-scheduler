var now = dayjs();
var currentDate = now.format('dddd, MMMM Do');
var dateStamp = now.format('MM-DD-YY');
var currentTime = now.format('hA');
var idCurrentTime;
var storedSchedule;
$('#currentDay').text(currentDate);

const workingHours = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];

$.each(workingHours, function(i, hours) {
    if (String(hours) === String(currentTime)){
        idCurrentTime = i;
    }
}) 

var container = $('.container');

$.each(workingHours, function (i, hours) {
    container.append('<div class="row time-block" id='+hours+'></div>');
    let row = $('div#'+hours);
    row.append('<div class="hour text-center col-1" id=t'+i+'></div>');
    $('div#t'+i).text(hours);
    row.append('<textarea class="description col-10" id=d'+i+'></textarea>');
    row.append('<button class="saveBtn col-1" id='+i+'></button');
    $('button.saveBtn#'+i).text('🖪');
    $('button.saveBtn#'+i).on('click', function(e){
      let index = e.currentTarget.id;
      let eventText = $('textarea#d'+index).val();
        var temp = JSON.parse(localStorage.getItem('schedule'));
        if (temp === null) {
            temp = [];
        }
        temp[i] = eventText;
        localStorage.setItem('schedule',JSON.stringify(temp));
    })

    if (i < idCurrentTime) {
        $('textarea#d'+i).addClass('past');
    } else if (i === idCurrentTime) {
        $('textarea#d'+i).addClass('present');
    } else if (i > idCurrentTime) {
        $('textarea#d'+i).addClass('future');
    }
}) 

// ToDo: render schedule from local storage
$(document).ready(function() {
    storedSchedule = JSON.parse(localStorage.getItem('schedule'))
    console.log("storedSchedule", storedSchedule);
    if (storedSchedule === null) {
        return;
    }
    $.each(storedSchedule, function(i, event) {
        console.log("i:", i);
        console.log("event", event);
        $('textarea#d'+i).val(event);
    })
})
