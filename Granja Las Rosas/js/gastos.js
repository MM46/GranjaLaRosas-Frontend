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

$('#addGasto_button').on('click', function () {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/addExpense',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      success: function (data) {
        // agregar cÃ³digo aqui para poner los datos del todolist en el el html
        // addTodo(data._id, data.description, data.completed)
        console.log("gasto añadido")
  
      },
      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  
    localStorage.removeItem('token');
    window.location = './Login.html'
  });

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
        console.log("Gastos");
        console.log(data);
        var lista = document.getElementById("gastos");
        $.each(data, function(index, gastos) {
            var row = document.createElement("div");
            row.setAttribute('class', 'row');
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col-md-3');
            var dateText = document.createElement("label");
            dateText.setAttribute('class', 'user-label');
            dateText.innerText = gastos[0].date;

            var costCol = document.createElement("div");
            costCol.setAttribute('class', 'col-md-3');
            var costText = document.createElement("label");
            costText.setAttribute('class', 'user-label');
            costText.innerText = gastos[0].cost;

            var descriptionCol = document.createElement("div");
            descriptionCol.setAttribute('class', 'col-md-6');
            var descriptionText = document.createElement("label");
            descriptionText.setAttribute('class', 'user-label');
            descriptionText.innerText = gastos[0].description;

            dateCol.appendChild(dateText);
            row.appendChild(dateCol);

            costCol.appendChild(costText);
            row.appendChild(costCol);

            descriptionCol.appendChild(descriptionText);
            row.appendChild(descriptionCol);

            lista.appendChild(row);
        })
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  loadGastos()