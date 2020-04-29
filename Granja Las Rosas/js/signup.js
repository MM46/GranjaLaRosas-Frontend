var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

function getToken() {
  console.log("hola token granja")
  console.log(token)
}

getToken()
