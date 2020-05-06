// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#logout_button').on('click', function () {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/logout',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    success: function (data) {
      // agregar cÃ³digo aqui para poner los datos del todolist en el el html
      // addTodo(data._id, data.description, data.completed)
      console.log("logout hecho")

    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

  localStorage.removeItem('token');
  window.location = './Login.html'
});

function getLogin() {
  const token = localStorage.getItem('token');
    if (!token) {
      window.location = './Login.html';
    }
}
  
function checkingAdmin() {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/dummyAdmin',
    headers: {
      'Content-Type': 'application/json',

    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log("Eres admin");
      // admin = true;
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

getLogin()
checkingAdmin()

var progressCharts = [];

google.charts.load('current', {packages: ['corechart']});
      
function drawChart() {
  for(var ch in progressCharts){
      var completado = document.getElementById(progressCharts[ch]).getAttribute("completado");
      var incompleto = document.getElementById(progressCharts[ch]).getAttribute("incompleto");

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Element');
      data.addColumn('number', 'Percentage');
      data.addRows([
          ['Progreso', completado/100],
          ['Incompleto', incompleto/100]
      ]);
        
      var chart = new google.visualization.PieChart(document.getElementById(progressCharts[ch]));
      chart.draw(data, null);
  }
}

function loadSiembras() {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getSiembras',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // console.log("sembradios");
        // console.log(data);
        var lista = document.getElementById("siembras");
        $.each(data, function(index, siembras) {
          // console.log(siembras[0].season);
          var firstRow = document.createElement("div");
          firstRow.setAttribute('class', 'row');
          firstRow.setAttribute("style", "background:#D0D2D5");

          var seasonCol = document.createElement("div");
          seasonCol.setAttribute('class', 'col-md-12');
          seasonCol.setAttribute('id', 'season');

          var seasonText = document.createElement("h4");
          seasonText.setAttribute('class', 'title-label');
          seasonText.innerText = "Temporada: " +  siembras[0].season;
        

          seasonCol.appendChild(seasonText);

          firstRow.appendChild(seasonCol);
          lista.appendChild(firstRow);

          $.each(siembras, function(index2, siembra) {
            // console.log(siembra);
            var seedRow = document.createElement("div");
            seedRow.setAttribute('class', 'row');
  
            var seedCol = document.createElement("div");
            seedCol.setAttribute('class', 'col-md-12');
            seedCol.setAttribute('id', 'seed');
  
            var seedText = document.createElement("h4");
            seedText.setAttribute('class', 'title-label');
            seedText.innerText = "Semilla: " +  siembra.seed;
  
            seedCol.appendChild(seedText);
  
            seedRow.appendChild(seedCol);
            lista.appendChild(seedRow);

            var datesRow = document.createElement("div");
            datesRow.setAttribute('class', 'row');
  
            var plantingDateCol = document.createElement("div");
            plantingDateCol.setAttribute('class', 'col-md-6');
            plantingDateCol.setAttribute('id', 'planting_date');
  
            var platingDateText = document.createElement("h4");
            platingDateText.setAttribute('class', 'title-label');
            platingDateText.innerText = "Dia de Plantación: " +  siembra.planting_date;
  
            plantingDateCol.appendChild(platingDateText);
  
            datesRow.appendChild(plantingDateCol);

            var harvestDateCol = document.createElement("div");
            harvestDateCol.setAttribute('class', 'col-md-6');
            harvestDateCol.setAttribute('id', 'harvest_date');
  
            var harvestDateText = document.createElement("h4");
            harvestDateText.setAttribute('class', 'title-label');
            harvestDateText.innerText = "Dia de Cosecha: " +  siembra.harvest_date;
  
            harvestDateCol.appendChild(harvestDateText);
  
            datesRow.appendChild(harvestDateCol);

            lista.appendChild(datesRow);

            var progressRow = document.createElement("div");
            var chartId = index + "" + index2  + "chart";
            progressRow.setAttribute("id", chartId);
            progressRow.setAttribute('style', "width: 900px; height: 500px;");
            progressRow.setAttribute('completado', siembra.progress);
            progressRow.setAttribute('incompleto', 100 - siembra.progress);
            
            progressCharts.push(chartId);

            lista.appendChild(progressRow);


            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col-md-12');
            divisionCol.setAttribute('style', 'background:grey');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
          });
        });
        // console.log("progressChartslength");
        // console.log(progressCharts.length);
        google.charts.setOnLoadCallback(drawChart());
        // drawChart();
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  loadSiembras();


  