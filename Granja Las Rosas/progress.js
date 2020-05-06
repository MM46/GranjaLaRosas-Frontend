google.charts.load('current', {packages: ['corechart']});
          google.charts.setOnLoadCallback(drawChart);
      
function drawChart() {
    var completado = document.getElementById("myPieChart").getAttribute("completado");
    var incompleto = document.getElementById("myPieChart").getAttribute("incompleto");

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');
    data.addRows([
        ['Progreso', completado/100],
        ['Incompleto', incompleto/100]
    ]);
      
    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
    chart.draw(data, null);
}