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

function loadEmpleados() {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployees',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log("usuarios");
        console.log(data);
        var lista = document.getElementById("usuarios");
        $.each(data, function(index, employees) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');

            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col-md-6');
            usernameCol.setAttribute('id', 'username');

            var usernameText = document.createElement("h4");
            usernameText.setAttribute('class', 'title-label');
            usernameText.innerText = "Nombre de usuario:"

            var usernameText2 = document.createElement("label");
            usernameText2.setAttribute('class', 'user-label');
            usernameText2.innerText = employees.username;
          
            var statusCol = document.createElement("div");
            statusCol.setAttribute('class', 'col-md-6');
            statusCol.setAttribute('id', 'status');

            var statusText = document.createElement("h4");
            statusText.setAttribute('class', 'title-label');
            statusText.innerText = "Estatus de Empleado:"

            var statusText2 = document.createElement("label");
            statusText2.setAttribute('class', 'user-label');


            if(employees.active){
              statusText2.innerText = "Activo";
              statusText2.setAttribute('style', 'color:green');
            }else{
              statusText2.innerText = "Inactivo"
              statusText2.setAttribute('style', 'color:red');
            }

            usernameCol.appendChild(usernameText);
            usernameCol.appendChild(usernameText2);
            
            statusCol.appendChild(statusText);
            statusCol.appendChild(statusText2);

            firstRow.appendChild(usernameCol);
            firstRow.appendChild(statusCol);
            
            lista.appendChild(firstRow);

            var secondRow = document.createElement("div");
            secondRow.setAttribute('class', 'row');

            var birthdateCol = document.createElement("div");
            birthdateCol.setAttribute('class', 'col-md-6');
            birthdateCol.setAttribute('id', 'birthdate');

            var birthdateText = document.createElement("h4");
            birthdateText.setAttribute('class', 'title-label');
            birthdateText.innerText = "Fecha de Nacimiento:"

            var birthdateText2 = document.createElement("label");
            birthdateText2.setAttribute('class', 'user-label');
            birthdateText2.innerText = employees.birth_date;
          
            var hiredateCol = document.createElement("div");
            hiredateCol.setAttribute('class', 'col-md-6');
            hiredateCol.setAttribute('id', 'hiredate');

            var hiredateText = document.createElement("h4");
            hiredateText.setAttribute('class', 'title-label');
            hiredateText.innerText = "Fecha de Contratación:"

            var hiredateText2 = document.createElement("label");
            hiredateText2.setAttribute('class', 'user-label');
            hiredateText2.innerText = employees.hire_date;

            birthdateCol.appendChild(birthdateText);
            birthdateCol.appendChild(birthdateText2);
            
            hiredateCol.appendChild(hiredateText);
            hiredateCol.appendChild(hiredateText2);

            secondRow.appendChild(birthdateCol);
            secondRow.appendChild(hiredateCol);
            
            lista.appendChild(secondRow);

            var thirdRow = document.createElement("div");
            thirdRow.setAttribute('class', 'row');

            var salaryCol = document.createElement("div");
            salaryCol.setAttribute('class', 'col-md-12');
            salaryCol.setAttribute('id', 'salary');

            var salaryText = document.createElement("h3");
            salaryText.setAttribute('class', 'title-label');
            salaryText.innerText = "Salario:"

            salaryCol.appendChild(salaryText);

            thirdRow.appendChild(salaryCol);
            
            lista.appendChild(thirdRow);

            var fourthRow = document.createElement("div");
            fourthRow.setAttribute('class', 'row');

            var amountCol = document.createElement("div");
            amountCol.setAttribute('class', 'col-md-6');
            amountCol.setAttribute('id', 'amount');

            var amountText = document.createElement("h4");
            amountText.setAttribute('class', 'title-label');
            amountText.innerText = "Cantidad:"
          
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col-md-6');
            dateCol.setAttribute('id', 'date');

            var dateText = document.createElement("h4");
            dateText.setAttribute('class', 'title-label');
            dateText.innerText = "Fecha de Pago:"

            amountCol.appendChild(amountText);
            dateCol.appendChild(dateText);

            fourthRow.appendChild(amountCol);
            fourthRow.appendChild(dateCol);
            lista.appendChild(fourthRow);

            $.each(employees.salary, function(index, salarios) {
              var amountText2 = document.createElement("label");
              amountText2.setAttribute('class', 'user-label');
              amountText2.innerText = salarios.amount;
        
              amountCol.appendChild(amountText2);

              var dateText2 = document.createElement("label");
              dateText2.setAttribute('class', 'user-label');
              dateText2.innerText = salarios.date;
        
              dateCol.appendChild(dateText2);
            });

            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');


            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col-md-12');
            divisionCol.setAttribute('style', 'background:grey');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
            
        })
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  loadEmpleados()