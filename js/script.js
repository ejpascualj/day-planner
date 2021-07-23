// Function to initialize
function initialize() {
  // gets current time and date from Moment.js library and sets it to currentDay element
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  // Calls updateHour function
  updateHour();

  // Interval to call updateHour function every 60 minutes and update the classes of each element.
  setInterval(updateHour, 60000);

  // For each element where class="time-block", selects the id attribute and loads data saved in localStorage
  $(".time-block").each(function () {
    let id = $(this).attr("id");
    $("#" + id + " textarea").val(localStorage.getItem(id));
  });

  // Event listener for saveBtn that saves textarea content in localStorage
  $(".saveBtn").on("click", function (event) {
    let id = $(this).parent().attr("id");
    localStorage.setItem(id, $("#" + id + " textarea").val());
  });
}

// Updates Hour function
function updateHour() {
  // Select all elements where class='time-block' and assigns class based on current time.
  $(".time-block").each(function () {
    // Get hour from the id of each block
    let blockHour = parseInt($(this).attr("id").replace("hour-", ""));

    // Get current hour from the current time in Moment.js
    let currentHour = parseInt(moment().format("H"));

    // remove class from previous executions of this function
    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).removeClass("future");

    // Conditional statement adding class depending on the current time
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

// call initialize
$(initialize);