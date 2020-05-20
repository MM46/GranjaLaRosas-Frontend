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
// checkingAdmin()


function editarGasto(id) {
    console.log("id = ", id);
    var date = document.getElementById(id + 'date').innerText,
    description = document.getElementById(id + 'description').innerText,
    cost = document.getElementById(id + 'cost').innerText,
        url = './editarGasto.html?date=' + encodeURIComponent(date)  + '&description=' + encodeURIComponent(description) + '&cost=' + encodeURIComponent(cost);
    document.location.href = url;
}

function removerGasto(id) {

  var alertconfirm = confirm("¿Estas seguro que deseas borrar este Gasto?");

  if(alertconfirm == true){
      let date = document.getElementById(id + 'date').innerText;
      let cost = document.getElementById(id + 'cost').innerText;
      let description = document.getElementById(id + "description").innerText;

      json_to_send = {
        "date": date,
        "description": description,
        "cost": cost
      };
    
      json_to_send = JSON.stringify(json_to_send);
    
      $.ajax({
        url: 'https://granjalasrosasback.web.app/removeExpense',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        method: 'PATCH',
        dataType: 'text',
        data: json_to_send,
        success: function (data) {
          alert("Gasto eliminado");
          window.location = './gastos.html'

        },
        error: function (error_msg) {
          alert((error_msg['responseText']));
        }
      });
  }
}


function loadGastos() {

  let fromDate = $('#from').val();
  let toDate = $('#to').val();

  let fromYear = fromDate.substring(0, 4);  
  let fromMonth = fromDate.substring(5, 7); 
  let fromDay = fromDate.substring(8, 10);

  let toYear = toDate.substring(0, 4);  
  let toMonth = toDate.substring(5, 7); 
  let toDay = toDate.substring(8, 10);

  let from = fromYear + fromMonth + fromDay;
  let to = toYear + toMonth + toDay;

  // console.log("from: " + parseInt(from) + " to: " + to);

  json_to_send = {
    "from": parseInt(from),
    "to": parseInt(to)
  };

  json_to_send = JSON.stringify(json_to_send);
  console.log(json_to_send);
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getConceptsReport',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        // console.log("Gastos");
        console.log(data);
        var lista = document.getElementById("gastos");

        var divisionRow = document.createElement("div");
        divisionRow.setAttribute('class', 'user-label');
        var divisionCol = document.createElement("div");
        divisionCol.setAttribute('class', 'user-label');
        var divisionText = document.createElement("p");
        divisionText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        divisionText.innerText = "";

        divisionCol.appendChild(divisionText);
        divisionRow.appendChild(divisionCol);
        lista.appendChild(divisionRow);
        
        var row = document.createElement("div");
        row.setAttribute('class', 'row');
        var dateCol = document.createElement("div");
        dateCol.setAttribute('class', 'col red');
        var dateText = document.createElement("p");
        dateText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        dateText.innerText = "Fecha";

        dateCol.appendChild(dateText);
        row.appendChild(dateCol);
        lista.appendChild(row);

        var costCol = document.createElement("div");
        costCol.setAttribute('class', 'col red');
        var costText = document.createElement("p");
        costText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        costText.innerText = "Costo";

        costCol.appendChild(costText);
        row.appendChild(costCol);
        lista.appendChild(row);

        var earningCol = document.createElement("div");
        earningCol.setAttribute('class', 'col red');
        var earningText = document.createElement("p");
        earningText.setAttribute('class', 'user-label');
        earningText.innerText = "Ganancias";

        earningCol.appendChild(earningText);
        row.appendChild(earningCol);
        lista.appendChild(row);


        var descriptionCol = document.createElement("div");
        descriptionCol.setAttribute('class', 'col red');
        var descriptionText = document.createElement("p");
        descriptionText.setAttribute('class', 'user-label');
        descriptionText.innerText = "Descripción";

        descriptionCol.appendChild(descriptionText);
        row.appendChild(descriptionCol);
        lista.appendChild(row);
        

        $.each(data, function(index, gastos) {
            // console.log(gastos.date);

          $.each(gastos, function(index2, gasto) {
            var row2 = document.createElement("div");
            row2.setAttribute('class', 'row');
            var dateCol2 = document.createElement("div");
            dateCol2.setAttribute('class', 'col');
            var dateText2 = document.createElement("p");
            dateText2.setAttribute('class', 'user-label');
            dateText2.setAttribute('id', index+'date');

             let date = gasto.date;
          
             let day = date%100;
             date = parseInt(date/100);
             let month = date%100;
             let year = parseInt(date/100);
          
            date = day +"/"+ month +"/"+ year;

            dateText2.innerText = date;

            dateCol2.appendChild(dateText2);
            row2.appendChild(dateCol2);
            lista.appendChild(row2);

            var costCol2 = document.createElement("div");
            costCol2.setAttribute('class', 'col');
            var costText2 = document.createElement("p");
            costText2.setAttribute('class', 'user-label');
            costText2.setAttribute('id', index+'cost');
            costText2.innerText = "$ " + gasto.cost;

            costCol2.appendChild(costText2);
            row2.appendChild(costCol2);
            lista.appendChild(row2);

            var earningCol2 = document.createElement("div");
            earningCol2.setAttribute('class', 'col');
            var earningText2 = document.createElement("p");
            earningText2.setAttribute('class', 'user-label');
            earningText2.setAttribute('id', index+'earning');
            if(gasto.earning){
              earningText2.innerText = "$ " + gasto.earning + ".00";
            }else{
              earningText2.innerText = "$ 0.00" ;
            }

            earningCol2.appendChild(earningText2);
            row2.appendChild(earningCol2);
            lista.appendChild(row2);


            var descriptionCol2 = document.createElement("div");
            descriptionCol2.setAttribute('class', 'col');
            var descriptionText2 = document.createElement("p");
            descriptionText2.setAttribute('class', 'user-label');
            descriptionText2.setAttribute('id', index+'description');
            descriptionText2.innerText = gasto.description;

            descriptionCol2.appendChild(descriptionText2);
            row2.appendChild(descriptionCol2);
            lista.appendChild(row2);

           });

        //     var costCol = document.createElement("div");
        //     costCol.setAttribute('class', 'col-md-3');
        //     var costText = document.createElement("label");
        //     costText.setAttribute('class', 'user-label');
        //     costText.setAttribute('id', index+'cost');
        //     costText.innerText = gastos[0].cost;

        //     var descriptionCol = document.createElement("div");
        //     descriptionCol.setAttribute('class', 'col-md-4');
        //     var descriptionText = document.createElement("label");
        //     descriptionText.setAttribute('class', 'user-label');
        //     descriptionText.setAttribute('id', index+'description');
        //     descriptionText.innerText = gastos[0].description;

        //     var editCol = document.createElement("a");
        //     editCol.setAttribute('class', "btn btn-outline-info");
        //     editCol.setAttribute('id', index);
        //     editCol.setAttribute("onclick","editarGasto(id)");
        //     var editSpan = document.createElement("span");
        //     editSpan.setAttribute('class', 'fa fa-pencil');

        //     var removeCol = document.createElement("button");
        //     removeCol.setAttribute('class', 'btn btn-outline-danger');
            
        //     removeCol.setAttribute('id', index);
        //     removeCol.setAttribute("onclick","removerGasto(id)");
        //     var removeSpan = document.createElement("span");
        //     removeSpan.setAttribute('class', 'fa fa-remove');
        //     // removeSpan.setAttribute('style', 'background:red');


            

            // dateCol.appendChild(dateText);
            // dateRow.appendChild(dateCol);

        //     costCol.appendChild(costText);
        //     row.appendChild(costCol);

        //     descriptionCol.appendChild(descriptionText);
        //     row.appendChild(descriptionCol);

        //     editCol.appendChild(editSpan);
        //     row.appendChild(editCol);

        //     removeCol.appendChild(removeSpan);
        //     row.appendChild(removeCol);

            // lista.appendChild(dateRow);
        })
        var loading = document.getElementById("loading");
        var info = document.getElementById("info");
        var loading = document.getElementById("loading");
        // if (loading.style.display == "block") {
          loading.style.display = "block";
        //   info.style.display = "block";
        // }
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  // loadGastos()


