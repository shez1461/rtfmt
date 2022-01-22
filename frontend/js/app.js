//
// app.js
//


// Console output
console.log('%c Welcome to Flood Monitoring console', 'font-size: 36px; font-weight: bold');
let log = console.log;
let table = console.table;
let info = console.info;
let warn = console.warn;
let error = console.error;


// GET method: Fetch JSON data using AJAX(jQuery) Stations
function getStations(data, param) {
  const getStationsUri = 'http://environment.data.gov.uk/flood-monitoring/id/stations?_limit=100';
  $.ajax({
    type : 'GET',
    url : getStationsUri,
    crossDomain: true,
    async: true,
    cache: true,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(data) {
      var items = data.items;
      for (var i in items) {
        var id = data.items[i]['@id'];
        var stationReference = data.items[i]['stationReference'];
        var catchmentName = data.items[i]['catchmentName'];
        var riverName = data.items[i]['riverName'];
      }
      getStationDetails(data, id, stationReference, catchmentName, riverName);
    },
    error: function(response) {
      handleErrorData(response);
    }
  });
};


// GET Station Details on Success- HTTP 200 response
function getStationDetails(data) {
  const stations = data.items;
  var options = $("#selectStation");

  $.each(stations, function() {
    if ((this.stationReference == null) || (this.stationReference == undefined) ||
      (this.catchmentName == null) || (this.catchmentName == undefined) ||
      (this.stationReference == '') || (this.catchmentName == '')) {
        options.append($("<option />").val('N/A').text('N/A'));
    } else {
      options.append($("<option />").val(this.stationReference).text(this.catchmentName));
    }
  });
  toastr.success('GET - Success!');
  toastr.clear();
}


// Success query handler - HTTP 200 response
function handleSuccessData(data) {
  toastr.success('GET - Success!');
  toastr.clear();
}


// Error query handler - HTTP response status code/text
function handleErrorData(response) {
  var statusCode = response.status,
      statusText = response.statusText;

  if ((statusCode === 0) || (statusCode <= 300)) {
    error('Error:', statusCode, statusText);
    toastr.error(statusText, statusCode);
    toastr.clear();
  }
  else if (statusCode >= 400) {
    error('Error:', statusCode, statusText);
    toastr.error(statusText, statusCode);
    toastr.clear();
  }
  else if (statusCode <= 500) {
    warn('Error:', statusCode, statusText);
    toastr.warning(statusText, statusCode);
    toastr.clear();
  }
}


// Dark/Light Theme - Stored & Retrieved using localStorage 
function toggleTheme() {
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem('theme');
  // Check current theme and set theme from current theme stored
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
    else {
      toggleSwitch.checked = false;
    }
  }
  // Change theme along with chart background
  // Set localStore + change logo + chart options
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); // localStore - dark
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); // localStore - light
    }    
  }
  // By default set to light theme
  toggleSwitch.addEventListener('change', switchTheme, false);
}


// Events are fired when the page has loaded
window.onload = function() {
  // Hide when loaded
  $('#divTable').hide();
  $('#tableHeader').hide();
  $('#extractData').hide();
  $('#displayMyChart').hide();
  toggleTheme();
  getStations();
  renderMyChart();
};


// Button functions
$(function() {
  // Select/option Dropdown list click event
  $('#selectStation').change(function(data) {
    // Show fields
    $('#divTable').show();
    $('#tableHeader').show();
    $('#extractData').show();
    $('#displayMyChart').show();

    // Empty table before fetching
    $('#time').empty();
    $('#readings').empty();

    var value = $(this).val();
    var counter = 0;
    var num = 1;
    var countStr = num.toString();
    var timeStamp = [];
    var reading = [];
    //const currentDate = new Date().toISOString();
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString();
    const getReadingsUrl = 'http://environment.data.gov.uk/flood-monitoring/id/stations/'+value+
    '/readings?';
    var param = 'since='+yesterday;

    $.ajax({
      type : 'GET',
      url : getReadingsUrl,
      crossDomain: true,
      async: true,
      cache: true,
      dataType: 'json',
      contentType: 'application/json',
      data: param,
      success: function(data) {
        var items = data.items;
        for (var i in items) {
          var id = data.items[i]['@id'];
          var measure = data.items[i]['measure'];
          var readings = data.items[i]['value'];
          var dateTime = data.items[i]['dateTime'];
          var num = 1;

          //log('\nMeasurement in mASD', '\nReadings: '+value, '\nDateTime: '+dateTime);

          // Empty before appending
          $('#stationName').empty();

          // Display Station ID & Time
          $('#stationName').html('<th>'+value+'</th>');
          $('#time').append('<td id="time'+countStr+'">'+dateTime+'</td></br>');
          $('#readings').append('<td id="readings'+countStr+'">'+readings+'</td></br>');
          $('#extractData tbody').append(`<tr>${$('#time').append(dateTime+'\n')}</tr></br>`);
          $('#extractData tbody').append(`<tr>${$('#readings').append(readings+'\n')}</tr></br>`);

          countStr++;
          timeStamp.push(dateTime);
          reading.push(readings);
          counter += i;
        }
        //log(timeStamp, reading, value);

        // Initiate chart function & send params
        renderMyChart(timeStamp, reading, value);
        handleSuccessData(data);
      },
      error: function(response) {
        handleErrorData(response);
      }
    });
  });


  // Search/Find Range Button click event
  $('#search').on('click', function() {
    // Native JS Scroll down to end of page
    /*
    var scrollingElement = (document.scrollingElement || document.body)
    function scrollSmoothToBottom() {
      $(scrollingElement).animate({
        scrollTop: document.body.scrollHeight
      }, 200);
    }
    */
    //getStationRange();
    //scrollSmoothToBottom();
  });

  // Back to Top button
  var btn = $('#button');
  $(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '200');
  });
});

// Render MyChart canvas from Chart.js
function renderMyChart(timeStamp, reading, value) {
  // Destroy exiting Chart Instance to reuse <canvas> element
  let chartStatus = Chart.getChart('myChart');
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  const ctx = $('#myChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeStamp, // Time - x axis
      datasets: [{
        label: value,
        data: reading, // Readings in mASD- y axis
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}