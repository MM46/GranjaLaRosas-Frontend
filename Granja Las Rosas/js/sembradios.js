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

function editarSeason(id) {

  var season = document.getElementById(id + 'season').innerText,
  seed = document.getElementById(id + 'seed').innerText,
  planting_date = document.getElementById(id + 'planting_date').innerText,
  harvest_date = document.getElementById(id + 'harvest_date').innerText,
  progress = document.getElementById(id + 'progress').innerText,
      url = './editarSeason.html?season=' + encodeURIComponent(season)  + '&seed=' + encodeURIComponent(seed) + '&planting_date=' + encodeURIComponent(planting_date) + '&harvest_date=' + encodeURIComponent(harvest_date) + '&progress=' + encodeURIComponent(progress);
  document.location.href = url;
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
        console.log(data);
        var lista = document.getElementById("siembras");
        $.each(data, function(index, siembras) {

          $.each(siembras, function(index2, siembra) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');
            
            var seasonCol = document.createElement("div");
            seasonCol.setAttribute('class', 'col-md-10');
  
            var seasonText = document.createElement("h4");
            seasonText.setAttribute('class', 'title-label');
            seasonText.setAttribute('style', 'color:white');
            seasonText.innerText = "Temporada: ";
  
            var seasonText2 = document.createElement("h4");
            seasonText2.setAttribute('id', index + "season");
            seasonText2.setAttribute('style',"display: none");
            seasonText2.innerText = siembras[0].season;
            seasonText.innerText += seasonText2.innerText;
          
            var editCol = document.createElement("a");
            editCol.setAttribute('class', 'btn btn-info btn-lg');
            editCol.setAttribute('style',"display: block;");
            editCol.setAttribute('id', index);
            editCol.setAttribute("onclick","editarSeason(id)");
            var editSpan = document.createElement("span");
            editSpan.setAttribute('class', 'glyphicon glyphicon-pencil');
            
            seasonCol.appendChild(seasonText2);
            seasonCol.appendChild(seasonText);
            editCol.appendChild(editSpan);
  
            firstRow.appendChild(seasonCol);
            lista.appendChild(firstRow);
            firstRow.appendChild(editCol);


            // console.log(siembra);
            var row = document.createElement("div");
            row.setAttribute('class', 'row');
  
            var col = document.createElement("div");
            col.setAttribute('class', 'col-md-6');
  
            var seedText = document.createElement("h4");
            seedText.setAttribute('class', 'title-label');
            seedText.innerText = "Siembra: ";

            var seedText2 = document.createElement("h4");
            seedText2.setAttribute('class', 'title-label');
            seedText2.setAttribute('style',"display: none");
            seedText2.setAttribute('id', index + "seed");
            seedText2.innerText =  siembra.seed;

            seedText.innerText += seedText2.innerText

  
            var plantingDateText = document.createElement("h4");
            plantingDateText.setAttribute('class', 'title-label');
            plantingDateText.innerText = "Dia de Plantación: ";

            var plantingDateText2 = document.createElement("h4");
            plantingDateText2.setAttribute('class', 'title-label');
            plantingDateText2.setAttribute('style',"display: none");
            plantingDateText2.setAttribute('id', index + "planting_date");
            plantingDateText2.innerText =  siembra.planting_date;

            plantingDateText.innerText += plantingDateText2.innerText
  
            var harvestDateText = document.createElement("h4");
            harvestDateText.setAttribute('class', 'title-label');
            harvestDateText.innerText = "Dia de Cosecha: ";

            var harvestDateText2 = document.createElement("h4");
            harvestDateText2.setAttribute('class', 'title-label');
            harvestDateText2.setAttribute('style',"display: none");
            harvestDateText2.setAttribute('id', index + "harvest_date");
            harvestDateText2.innerText =  siembra.harvest_date;

            harvestDateText.innerText += harvestDateText2.innerText
  
  
            col.appendChild(seedText);
            col.appendChild(plantingDateText);
            col.appendChild(harvestDateText);

            col.appendChild(seedText2);
            col.appendChild(plantingDateText2);
            col.appendChild(harvestDateText2);
            row.appendChild(col);
            lista.appendChild(row);
            // season=2020invierno&seed=maiz&planting_date=2020-05-09&harvest_date=2020-05-03&progress=50
            // season=2020primavera&seed=frijol&planting_date=2020-05-02&harvest_date=2020-05-09&progress=50
            

            var col2 = document.createElement("div");
            col2.setAttribute('class', 'col-md-6');


            var progressCol = document.createElement("div");
            var chartId = index + "" + index2  + "chart";
            progressCol.setAttribute('id', chartId);
            progressCol.setAttribute('style', "width: 450px; height: 250px;");
            progressCol.setAttribute('completado', siembra.progress);
            progressCol.setAttribute('incompleto', 100 - siembra.progress);

            var progressText = document.createElement("h4");
            progressText.setAttribute('class', 'title-label');
            progressText.setAttribute('id', index + "progress");
            progressText.setAttribute('style',"display: none");
            progressText.innerText =  siembra.progress;
            
            progressCharts.push(chartId);

            col2.appendChild(progressCol);
            row.appendChild(col2);
            row.appendChild(progressText);
            lista.appendChild(row);
          });
        });
        google.charts.setOnLoadCallback(drawChart());
            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col-md-12');
            divisionCol.setAttribute('style', 'background:grey');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);

      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  loadSiembras();


  