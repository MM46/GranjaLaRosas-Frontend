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

function loadNominas() {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getPayCycles',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log("nominas");
        console.log(data);
        var lista = document.getElementById("nominas");
        $.each(data, function(index, nominas) {
            var row = document.createElement("div");
            row.setAttribute('class', 'row');
            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col-md-3');
            var usernameText = document.createElement("label");
            usernameText.setAttribute('class', 'user-label');
            usernameText.innerText = "Fecha : " + nominas.period_start;

            // var nameCol = document.createElement("div");
            // nameCol.setAttribute('class', 'col-md-3');
            // var nameText = document.createElement("label");
            // nameText.setAttribute('class', 'user-label');
            // nameText.innerText = employees.name;

            // var lastnameCol = document.createElement("div");
            // lastnameCol.setAttribute('class', 'col-md-6');
            // var lastnameText = document.createElement("label");
            // lastnameText.setAttribute('class', 'user-label');
            // lastnameText.innerText = employees.lastname1 + " " + employees.lastname2;

            usernameCol.appendChild(usernameText);
            row.appendChild(usernameCol);

            // nameCol.appendChild(nameText);
            // row.appendChild(nameCol);

            // lastnameCol.appendChild(lastnameText);
            // row.appendChild(lastnameCol);

            lista.appendChild(row);

        })
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  loadNominas()