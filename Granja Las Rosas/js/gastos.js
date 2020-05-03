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


function testJS(id) {
    console.log("testJS()");
    console.log("id = ", id);
    var date = document.getElementById(id + 'date').innerText,
    description = document.getElementById(id + 'description').innerText,
    cost = document.getElementById(id + 'cost').innerText,
        url = './editarGasto.html?date=' + encodeURIComponent(date)  + '&description=' + encodeURIComponent(description) + '&cost=' + encodeURIComponent(cost);
    document.location.href = url;
}



function loadGastos() {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getExpenses',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // console.log("Gastos");
        // console.log(data);
        var lista = document.getElementById("gastos");
        $.each(data, function(index, gastos) {
            var row = document.createElement("div");
            row.setAttribute('class', 'row');
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col-md-3');
            var dateText = document.createElement("p");
            dateText.setAttribute('class', 'user-label');
            dateText.setAttribute('id', index+'date');
            dateText.innerText = gastos[0].date;

            var costCol = document.createElement("div");
            costCol.setAttribute('class', 'col-md-3');
            var costText = document.createElement("label");
            costText.setAttribute('class', 'user-label');
            costText.setAttribute('id', index+'cost');
            costText.innerText = gastos[0].cost;

            var descriptionCol = document.createElement("div");
            descriptionCol.setAttribute('class', 'col-md-4');
            var descriptionText = document.createElement("label");
            descriptionText.setAttribute('class', 'user-label');
            descriptionText.setAttribute('id', index+'description');
            descriptionText.innerText = gastos[0].description;

            var editCol = document.createElement("a");
            editCol.setAttribute('class', 'btn btn-info btn-lg');
            editCol.setAttribute('id', index);
            editCol.setAttribute("onclick","testJS(id)");
            // editCol.setAttribute('href', './editarGasto.html');
            var editSpan = document.createElement("span");
            editSpan.setAttribute('class', 'glyphicon glyphicon-pencil');

            var removeCol = document.createElement("button");
            removeCol.setAttribute('class', 'btn btn-info btn-lg');
            
            removeCol.setAttribute('id', index);
            removeCol.setAttribute("onclick","removerGasto(id)");
            // removeCol.setAttribute("onclick","removerGasto(description)");
            var removeSpan = document.createElement("span");
            removeSpan.setAttribute('class', 'glyphicon glyphicon-remove');


            

            dateCol.appendChild(dateText);
            row.appendChild(dateCol);

            costCol.appendChild(costText);
            row.appendChild(costCol);

            descriptionCol.appendChild(descriptionText);
            row.appendChild(descriptionCol);

            editCol.appendChild(editSpan);
            row.appendChild(editCol);

            removeCol.appendChild(removeSpan);
            row.appendChild(removeCol);

            lista.appendChild(row);
        })
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  loadGastos()

  function removerGasto(id) {

    var alertconfirm = confirm("¿Estas seguro que deseas borrar este Gasto?");

    if(alertconfirm == true){
        let date = document.getElementById(id + 'date').innerText;
        let cost = document.getElementById(id + 'cost').innerText;
        let description = document.getElementById(id + "description").innerText;

        console.log("removerGasto()" );
        console.log("index: " +  id);
        console.log("date1: " + date);
        console.log("cost1: " +  cost);
        console.log("description1: " +  description);

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

