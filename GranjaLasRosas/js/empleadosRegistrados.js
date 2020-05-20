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

function editarSalario(id) {
  alert("editarSalario");

  // var username = document.getElementById(id + 'username').innerText;
  // var date = document.getElementById(id + 'date').innerText;
  // var salary = document.getElementById(id + 'salary').innerText;

  // // alert("username: " + document.getElementById(id + 'username').innerText + " date: " + date + " salary: " + salary);
  // var url = './agregarSalario.html?username=' + encodeURIComponent(username)  + '&date=' + encodeURIComponent(date) + '&salary=' + encodeURIComponent(salary);
  // document.location.href = url;
}

function agregarSalario(id) {
    var username = document.getElementById(id + 'username').innerText;
    // var date = document.getElementById(id + 'date').innerText;
    // var salary = document.getElementById(id + 'salary').innerText;

    // alert("username: " + document.getElementById(id + 'username').innerText + " date: " + date + " salary: " + salary);
    var url = './agregarSalario.html?username=' + encodeURIComponent(username);
    document.location.href = url;
}

function loadEmpleados() {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getAllEmployees',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        var lista = document.getElementById("usuarios");
        $.each(data, function(index, employees) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');

            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col');
            usernameCol.setAttribute('id', 'username');

            var usernameText = document.createElement("h4");
            usernameText.setAttribute('class', 'title-label');
            usernameText.innerText = "Nombre de usuario:"

            var usernameText2 = document.createElement("label");
            usernameText2.setAttribute('class', 'user-label');
            usernameText2.innerText = employees.username;
          
            var statusCol = document.createElement("div");
            statusCol.setAttribute('class', 'col');
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
            birthdateCol.setAttribute('class', 'col');
            birthdateCol.setAttribute('id', 'birthdate');

            var birthdateText = document.createElement("h4");
            birthdateText.setAttribute('class', 'title-label');
            birthdateText.innerText = "Fecha de Nacimiento:"

            var birthdateText2 = document.createElement("label");
            birthdateText2.setAttribute('class', 'user-label');
            birthdateText2.innerText = employees.birth_date;
          
            var hiredateCol = document.createElement("div");
            hiredateCol.setAttribute('class', 'col');
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
            salaryCol.setAttribute('class', 'col');
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
            amountCol.setAttribute('class', 'col');
            amountCol.setAttribute('id', 'amount');

            var amountText = document.createElement("h4");
            amountText.setAttribute('class', 'title-label');
            amountText.innerText = "Cantidad:"
          
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col');
            dateCol.setAttribute('id', 'date');

            var dateText = document.createElement("h4");
            dateText.setAttribute('class', 'title-label');
            dateText.innerText = "Fecha de Pago:"

            // var editButton = document.createElement("button");
            // editButton.setAttribute('class', 'btn btn-info btn-lg');

            amountCol.appendChild(amountText);
            dateCol.appendChild(dateText);

            fourthRow.appendChild(amountCol);
            fourthRow.appendChild(dateCol);
            // fourthRow.appendChild(editButton);
            lista.appendChild(fourthRow);


            $.each(employees.salary, function(index, salarios) {
              var row = document.createElement("div");
              row.setAttribute('class', 'row');

              var col1 = document.createElement("div");
              col1.setAttribute('class', 'col');

              var amountText2 = document.createElement("label");
              amountText2.setAttribute('class', 'user-label');
              amountText2.innerText = "$ " + salarios.amount + ".00"; 

              col1.appendChild(amountText2);
              row.appendChild(col1);
        
              var col2 = document.createElement("div");
              col2.setAttribute('class', 'col');

              var dateText2 = document.createElement("label");
              dateText2.setAttribute('class', 'user-label');
              dateText2.innerText = salarios.date;

              col2.appendChild(dateText2);
              row.appendChild(col2);

              lista.appendChild(row);

            });

            var fifthRow = document.createElement("div");
            fifthRow.setAttribute('class', 'row');

            var addSalaryCol = document.createElement("div");
            addSalaryCol.setAttribute('class', 'col');

            var addSalaryButton = document.createElement("button");
            addSalaryButton.setAttribute('class', 'button yellow')
            addSalaryButton.setAttribute("id",employees.username);
            addSalaryButton.innerText = "Agregar Salario"
            addSalaryButton.setAttribute("onclick","agregarSalario(id)");
            usernameText2.setAttribute("id", employees.username+ "username");

            addSalaryCol.appendChild(addSalaryButton);
            fifthRow.appendChild(addSalaryCol);
            
            lista.appendChild(fifthRow);

            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col');
            divisionCol.setAttribute('style', 'opacity: 50%; background:grey; height: 5px');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
            
        })
        var loading = document.getElementById("loading");
        var info = document.getElementById("info");
        var loading = document.getElementById("loading");
        if (loading.style.display === "block") {
          loading.style.display = "none";
          info.style.display = "block";
        }
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  // loadEmpleados();

  function loadEmpleadosByNameInitial() {
    let initial = document.getElementById("searchEmployee").value;
    var lista = document.getElementById("usuarios");
    // lista.innerHTML = "";
    console.log(initial);

    json_to_send = {
      "initial": initial
    };
  
    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByNameInitial',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        console.log(data);
        $.each(data, function(index, employees) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');

            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col');
            usernameCol.setAttribute('id', 'username');

            var usernameText = document.createElement("h4");
            usernameText.setAttribute('class', 'title-label');
            usernameText.innerText = "Nombre de usuario:"

            var usernameText2 = document.createElement("label");
            usernameText2.setAttribute('class', 'user-label');
            usernameText2.innerText = employees.username;
          
            var statusCol = document.createElement("div");
            statusCol.setAttribute('class', 'col');
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
            birthdateCol.setAttribute('class', 'col');
            birthdateCol.setAttribute('id', 'birthdate');

            var birthdateText = document.createElement("h4");
            birthdateText.setAttribute('class', 'title-label');
            birthdateText.innerText = "Fecha de Nacimiento:"

            var birthdateText2 = document.createElement("label");
            birthdateText2.setAttribute('class', 'user-label');
            birthdateText2.innerText = employees.birth_date;
          
            var hiredateCol = document.createElement("div");
            hiredateCol.setAttribute('class', 'col');
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
            salaryCol.setAttribute('class', 'col');
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
            amountCol.setAttribute('class', 'col');
            amountCol.setAttribute('id', 'amount');

            var amountText = document.createElement("h4");
            amountText.setAttribute('class', 'title-label');
            amountText.innerText = "Cantidad:"
          
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col');
            dateCol.setAttribute('id', 'date');

            var dateText = document.createElement("h4");
            dateText.setAttribute('class', 'title-label');
            dateText.innerText = "Fecha de Pago:"

            // var editButton = document.createElement("button");
            // editButton.setAttribute('class', 'btn btn-info btn-lg');

            amountCol.appendChild(amountText);
            dateCol.appendChild(dateText);

            fourthRow.appendChild(amountCol);
            fourthRow.appendChild(dateCol);
            // fourthRow.appendChild(editButton);
            lista.appendChild(fourthRow);


            $.each(employees.salary, function(index, salarios) {
              var row = document.createElement("div");
              row.setAttribute('class', 'row');

              var col1 = document.createElement("div");
              col1.setAttribute('class', 'col');

              var amountText2 = document.createElement("label");
              amountText2.setAttribute('class', 'user-label');
              amountText2.innerText = "$ " + salarios.amount + ".00"; 

              col1.appendChild(amountText2);
              row.appendChild(col1);
        
              var col2 = document.createElement("div");
              col2.setAttribute('class', 'col');

              var dateText2 = document.createElement("label");
              dateText2.setAttribute('class', 'user-label');
              dateText2.innerText = salarios.date;

              col2.appendChild(dateText2);
              row.appendChild(col2);

              lista.appendChild(row);

            });

            var fifthRow = document.createElement("div");
            fifthRow.setAttribute('class', 'row');

            var addSalaryCol = document.createElement("div");
            addSalaryCol.setAttribute('class', 'col');

            var addSalaryButton = document.createElement("button");
            addSalaryButton.setAttribute('class', 'button yellow')
            addSalaryButton.setAttribute("id",employees.username);
            addSalaryButton.innerText = "Agregar Salario"
            addSalaryButton.setAttribute("onclick","agregarSalario(id)");
            usernameText2.setAttribute("id", employees.username+ "username");

            addSalaryCol.appendChild(addSalaryButton);
            fifthRow.appendChild(addSalaryCol);
            
            lista.appendChild(fifthRow);


            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col');
            divisionCol.setAttribute('style', 'opacity: 50%; background:grey; height: 5px');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
            
        })
        // var loading = document.getElementById("loading");
        // var info = document.getElementById("info");
        // var loading = document.getElementById("loading");
        // if (loading.style.display === "block") {
        //   loading.style.display = "none";
        //   info.style.display = "block";
        // }
        if(lista.childElementCount == 0){
         loadEmpleadosByLastNameInitial();
        }
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  function loadEmpleadosByLastNameInitial() {
    // var lista = document.getElementById("usuarios");
    // lista.innerHTML = "";
    var lista = document.getElementById("usuarios");
    let initial = document.getElementById("searchEmployee").value;

    json_to_send = {
      "initial": initial
    };
  
    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByLastNameInitial',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        // document.getElementById("usuarios").innerHTML = "";
        // var lista = document.getElementById("usuarios");
        // document.getElementById("usuarios").innerHTML = "";
        $.each(data, function(index, employees) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');

            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col');
            usernameCol.setAttribute('id', 'username');

            var usernameText = document.createElement("h4");
            usernameText.setAttribute('class', 'title-label');
            usernameText.innerText = "Nombre de usuario:"

            var usernameText2 = document.createElement("label");
            usernameText2.setAttribute('class', 'user-label');
            usernameText2.innerText = employees.username;
          
            var statusCol = document.createElement("div");
            statusCol.setAttribute('class', 'col');
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
            birthdateCol.setAttribute('class', 'col');
            birthdateCol.setAttribute('id', 'birthdate');

            var birthdateText = document.createElement("h4");
            birthdateText.setAttribute('class', 'title-label');
            birthdateText.innerText = "Fecha de Nacimiento:"

            var birthdateText2 = document.createElement("label");
            birthdateText2.setAttribute('class', 'user-label');
            birthdateText2.innerText = employees.birth_date;
          
            var hiredateCol = document.createElement("div");
            hiredateCol.setAttribute('class', 'col');
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
            salaryCol.setAttribute('class', 'col');
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
            amountCol.setAttribute('class', 'col');
            amountCol.setAttribute('id', 'amount');

            var amountText = document.createElement("h4");
            amountText.setAttribute('class', 'title-label');
            amountText.innerText = "Cantidad:"
          
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col');
            dateCol.setAttribute('id', 'date');

            var dateText = document.createElement("h4");
            dateText.setAttribute('class', 'title-label');
            dateText.innerText = "Fecha de Pago:"

            // var editButton = document.createElement("button");
            // editButton.setAttribute('class', 'btn btn-info btn-lg');

            amountCol.appendChild(amountText);
            dateCol.appendChild(dateText);

            fourthRow.appendChild(amountCol);
            fourthRow.appendChild(dateCol);
            // fourthRow.appendChild(editButton);
            lista.appendChild(fourthRow);


            $.each(employees.salary, function(index, salarios) {
              var row = document.createElement("div");
              row.setAttribute('class', 'row');

              var col1 = document.createElement("div");
              col1.setAttribute('class', 'col');

              var amountText2 = document.createElement("label");
              amountText2.setAttribute('class', 'user-label');
              amountText2.innerText = "$ " + salarios.amount + ".00"; 

              col1.appendChild(amountText2);
              row.appendChild(col1);
        
              var col2 = document.createElement("div");
              col2.setAttribute('class', 'col');

              var dateText2 = document.createElement("label");
              dateText2.setAttribute('class', 'user-label');
              dateText2.innerText = salarios.date;

              col2.appendChild(dateText2);
              row.appendChild(col2);

              lista.appendChild(row);

            });

            var fifthRow = document.createElement("div");
            fifthRow.setAttribute('class', 'row');

            var addSalaryCol = document.createElement("div");
            addSalaryCol.setAttribute('class', 'col');

            var addSalaryButton = document.createElement("button");
            addSalaryButton.setAttribute('class', 'button yellow')
            addSalaryButton.setAttribute("id",employees.username);
            addSalaryButton.innerText = "Agregar Salario"
            addSalaryButton.setAttribute("onclick","agregarSalario(id)");
            usernameText2.setAttribute("id", employees.username+ "username");

            addSalaryCol.appendChild(addSalaryButton);
            fifthRow.appendChild(addSalaryCol);
            
            lista.appendChild(fifthRow);


            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col');
            divisionCol.setAttribute('style', 'opacity: 50%; background:grey; height: 5px');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
            
        })
        // console.log("num = " + lista.childElementCount);

        // var loading = document.getElementById("loading");
        // var info = document.getElementById("info");
        // var loading = document.getElementById("loading");
        // if (loading.style.display === "block") {
        //   loading.style.display = "none";
        //   info.style.display = "block";
        // }
        // if(lista.childElementCount == 0){
        //   loadEmpleadosByName();
        //  }
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  function loadEmpleadosByName() {
    // var lista = document.getElementById("usuarios");
    // lista.innerHTML = "";
    var lista = document.getElementById("usuarios");
    let name = document.getElementById("searchEmployee").value;

    json_to_send = {
      "name": name
    };
  
    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByName',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        // document.getElementById("usuarios").innerHTML = "";
        // var lista = document.getElementById("usuarios");
        // document.getElementById("usuarios").innerHTML = "";
        $.each(data, function(index, employees) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');

            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col');
            usernameCol.setAttribute('id', 'username');

            var usernameText = document.createElement("h4");
            usernameText.setAttribute('class', 'title-label');
            usernameText.innerText = "Nombre de usuario:"

            var usernameText2 = document.createElement("label");
            usernameText2.setAttribute('class', 'user-label');
            usernameText2.innerText = employees.username;
          
            var statusCol = document.createElement("div");
            statusCol.setAttribute('class', 'col');
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
            birthdateCol.setAttribute('class', 'col');
            birthdateCol.setAttribute('id', 'birthdate');

            var birthdateText = document.createElement("h4");
            birthdateText.setAttribute('class', 'title-label');
            birthdateText.innerText = "Fecha de Nacimiento:"

            var birthdateText2 = document.createElement("label");
            birthdateText2.setAttribute('class', 'user-label');
            birthdateText2.innerText = employees.birth_date;
          
            var hiredateCol = document.createElement("div");
            hiredateCol.setAttribute('class', 'col');
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
            salaryCol.setAttribute('class', 'col');
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
            amountCol.setAttribute('class', 'col');
            amountCol.setAttribute('id', 'amount');

            var amountText = document.createElement("h4");
            amountText.setAttribute('class', 'title-label');
            amountText.innerText = "Cantidad:"
          
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col');
            dateCol.setAttribute('id', 'date');

            var dateText = document.createElement("h4");
            dateText.setAttribute('class', 'title-label');
            dateText.innerText = "Fecha de Pago:"

            // var editButton = document.createElement("button");
            // editButton.setAttribute('class', 'btn btn-info btn-lg');

            amountCol.appendChild(amountText);
            dateCol.appendChild(dateText);

            fourthRow.appendChild(amountCol);
            fourthRow.appendChild(dateCol);
            // fourthRow.appendChild(editButton);
            lista.appendChild(fourthRow);


            $.each(employees.salary, function(index, salarios) {
              var row = document.createElement("div");
              row.setAttribute('class', 'row');

              var col1 = document.createElement("div");
              col1.setAttribute('class', 'col');

              var amountText2 = document.createElement("label");
              amountText2.setAttribute('class', 'user-label');
              amountText2.innerText = "$ " + salarios.amount + ".00"; 

              col1.appendChild(amountText2);
              row.appendChild(col1);
        
              var col2 = document.createElement("div");
              col2.setAttribute('class', 'col');

              var dateText2 = document.createElement("label");
              dateText2.setAttribute('class', 'user-label');
              dateText2.innerText = salarios.date;

              col2.appendChild(dateText2);
              row.appendChild(col2);

              lista.appendChild(row);

            });

            var fifthRow = document.createElement("div");
            fifthRow.setAttribute('class', 'row');

            var addSalaryCol = document.createElement("div");
            addSalaryCol.setAttribute('class', 'col');

            var addSalaryButton = document.createElement("button");
            addSalaryButton.setAttribute('class', 'button yellow')
            addSalaryButton.setAttribute("id",employees.username);
            addSalaryButton.innerText = "Agregar Salario"
            addSalaryButton.setAttribute("onclick","agregarSalario(id)");
            usernameText2.setAttribute("id", employees.username+ "username");

            addSalaryCol.appendChild(addSalaryButton);
            fifthRow.appendChild(addSalaryCol);
            
            lista.appendChild(fifthRow);


            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col');
            divisionCol.setAttribute('style', 'opacity: 50%; background:grey; height: 5px');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
            
        })
        // console.log("num = " + lista.childElementCount);

        // var loading = document.getElementById("loading");
        // var info = document.getElementById("info");
        // var loading = document.getElementById("loading");
        // if (loading.style.display === "block") {
        //   loading.style.display = "none";
        //   info.style.display = "block";
        // }
        if(lista.childElementCount == 0){
          // loadEmpleadosByLastName();
         }
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }
  loadEmpleadosByLastName();
  function loadEmpleadosByLastName() {
    // var lista = document.getElementById("usuarios");
    // lista.innerHTML = "";
    var lista = document.getElementById("usuarios");
    let lastname = document.getElementById("searchEmployee").value;

    json_to_send = {
      "lastname": "Guadiana"
    };
  
    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByLastName',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        console.log("send = " + json_to_send);
        console.log("loadEmpleadosByLastName = " + data);
        console.log(data);
        // document.getElementById("usuarios").innerHTML = "";
        // var lista = document.getElementById("usuarios");
        // document.getElementById("usuarios").innerHTML = "";
        $.each(data, function(index, employees) {
            var firstRow = document.createElement("div");
            firstRow.setAttribute('class', 'row');

            var usernameCol = document.createElement("div");
            usernameCol.setAttribute('class', 'col');
            usernameCol.setAttribute('id', 'username');

            var usernameText = document.createElement("h4");
            usernameText.setAttribute('class', 'title-label');
            usernameText.innerText = "Nombre de usuario:"

            var usernameText2 = document.createElement("label");
            usernameText2.setAttribute('class', 'user-label');
            usernameText2.innerText = employees.username;
          
            var statusCol = document.createElement("div");
            statusCol.setAttribute('class', 'col');
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
            birthdateCol.setAttribute('class', 'col');
            birthdateCol.setAttribute('id', 'birthdate');

            var birthdateText = document.createElement("h4");
            birthdateText.setAttribute('class', 'title-label');
            birthdateText.innerText = "Fecha de Nacimiento:"

            var birthdateText2 = document.createElement("label");
            birthdateText2.setAttribute('class', 'user-label');
            birthdateText2.innerText = employees.birth_date;
          
            var hiredateCol = document.createElement("div");
            hiredateCol.setAttribute('class', 'col');
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
            salaryCol.setAttribute('class', 'col');
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
            amountCol.setAttribute('class', 'col');
            amountCol.setAttribute('id', 'amount');

            var amountText = document.createElement("h4");
            amountText.setAttribute('class', 'title-label');
            amountText.innerText = "Cantidad:"
          
            var dateCol = document.createElement("div");
            dateCol.setAttribute('class', 'col');
            dateCol.setAttribute('id', 'date');

            var dateText = document.createElement("h4");
            dateText.setAttribute('class', 'title-label');
            dateText.innerText = "Fecha de Pago:"

            // var editButton = document.createElement("button");
            // editButton.setAttribute('class', 'btn btn-info btn-lg');

            amountCol.appendChild(amountText);
            dateCol.appendChild(dateText);

            fourthRow.appendChild(amountCol);
            fourthRow.appendChild(dateCol);
            // fourthRow.appendChild(editButton);
            lista.appendChild(fourthRow);


            $.each(employees.salary, function(index, salarios) {
              var row = document.createElement("div");
              row.setAttribute('class', 'row');

              var col1 = document.createElement("div");
              col1.setAttribute('class', 'col');

              var amountText2 = document.createElement("label");
              amountText2.setAttribute('class', 'user-label');
              amountText2.innerText = "$ " + salarios.amount + ".00"; 

              col1.appendChild(amountText2);
              row.appendChild(col1);
        
              var col2 = document.createElement("div");
              col2.setAttribute('class', 'col');

              var dateText2 = document.createElement("label");
              dateText2.setAttribute('class', 'user-label');
              dateText2.innerText = salarios.date;

              col2.appendChild(dateText2);
              row.appendChild(col2);

              lista.appendChild(row);

            });

            var fifthRow = document.createElement("div");
            fifthRow.setAttribute('class', 'row');

            var addSalaryCol = document.createElement("div");
            addSalaryCol.setAttribute('class', 'col');

            var addSalaryButton = document.createElement("button");
            addSalaryButton.setAttribute('class', 'button yellow')
            addSalaryButton.setAttribute("id",employees.username);
            addSalaryButton.innerText = "Agregar Salario"
            addSalaryButton.setAttribute("onclick","agregarSalario(id)");
            usernameText2.setAttribute("id", employees.username+ "username");

            addSalaryCol.appendChild(addSalaryButton);
            fifthRow.appendChild(addSalaryCol);
            
            lista.appendChild(fifthRow);


            var divisionRow = document.createElement("div");
            divisionRow.setAttribute('class', 'row');

            var divisionCol = document.createElement("div");
            divisionCol.setAttribute('class', 'col');
            divisionCol.setAttribute('style', 'opacity: 50%; background:grey; height: 5px');

            divisionRow.appendChild(divisionCol);
            
            lista.appendChild(divisionRow);
            
        })
        // console.log("num = " + lista.childElementCount);

        // var loading = document.getElementById("loading");
        // var info = document.getElementById("info");
        // var loading = document.getElementById("loading");
        // if (loading.style.display === "block") {
        //   loading.style.display = "none";
        //   info.style.display = "block";
        // }
        if(lista.childElementCount == 0){
          // loadEmpleadosByNamel();
          console.log("no hay usuarios encontrados");
         }
      },

      error: function (error_msg) {
        console.log("loadEmpleadosByLastNameerror = " + data);
        alert((error_msg['responseText']));
      }
    });
  }
  

  // loadEmpleados();
  // loadEmpleadosByLastNameInitial();
  // loadEmpleadosByNameInitial();

  function loadData() {
    let search = document.getElementById("searchEmployee").value;
    console.log(search.length);
    if(search == []){
      var lista = document.getElementById("usuarios");
      lista.innerHTML = "";
      loadEmpleados();
    } else if(search.length == 1){
      var lista = document.getElementById("usuarios");
      lista.innerHTML = "";
      loadEmpleadosByNameInitial();
      // console.log("num = " + lista.childElementCount);
    }else{
      var lista = document.getElementById("usuarios");
      lista.innerHTML = "";
      loadEmpleadosByName();
    }
  }
  loadEmpleados();