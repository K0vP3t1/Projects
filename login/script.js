/*
    Login url: https://reqres.in/api/login
    Body:
    {
      email: "eve.holt@reqres.in",
      password: "ok"
    }

    Users url: https://reqres.in/api/users
*/
let state = {
  users: [],
  isLoggedIn: false , 
  isLoginPending: false

}


window.onload = renderFormStatus();

function renderFormStatus(){
if(state.isLoggedIn){
  document.getElementById("form-container").innerHTML = "";
  return;
}
document.getElementById("form-container").innerHTML = `
<div class="col-12" >
<div class="card p-3">
  <h1>Bejelentkezés</h1>
  <form id="login" class="p-3">
    <label class="w-100">
      Email:
      <input type="text" name="email" class="form-control" ${state.isLoginPending ? "disabled" :""} />
    </label>
    <label class="w-100">
      Jelszó:
      <input type="password" name="password" class="form-control"  ${state.isLoginPending ? "disabled" :""}/>
    </label>
    <button type="submit" class="btn btn-primary">Küldés</button>
    <div id="message" class="float-right mt-2">${state.isLoginPending ? "Folyamatban" :""}
    </div>
  </form>
</div>
</div>

`

}



document.getElementById("login").onsubmit = function (event) {
  event.preventDefault();

    let email = event.target.elements.email.value;
  let password = event.target.elements.password.value;
   let body = JSON.stringify({
    email: email,
    password: password
  });
  
  let options = {
    method: 'POST',
    headers: {
      'Content-Type':
        'application/json;charset=utf-8'
    },
    body: body
  };
  state.isLoginPending = true;
  renderFormStatus();



  fetch("https://reqres.in/api/login", options)
    .then(function (response) {
      if (!response.ok) {
        return Promise.reject("Nem megfelelő jelszó vagy felhasználónév")
      };
        return response.json();
      
    })
    .then(function (response) {
      state.isLoggedIn = true;
      state.isLoginPending = false;
      renderFormStatus();
      return fetch("https://reqres.in/api/users")
    })
    .then(function (response) {
      if (!response.ok) {
        return Promise.reject("Users Error")
      };
      return response.json()
    })
    .then(function (users) {

    
      state.users = users.data;
      RenderUsers();


      //console.log(state);

    })
    .catch(function (error) {
      
      state.isLoginPending = false;
      renderFormStatus();
      alert(error);
      
    })


}

// render function

function RenderUsers() {

  let UserTableHeader = `

<thead>
  <tr class="bg-dark text-light">
    <th>#</th>
    <th>First</th>
    <th>Last</th>
    <th>E-mail</th>
  </tr>

</thead>

<tbody>
`;

  let UserTable = `<table class="table table-striped"> ${UserTableHeader}`;
  for (let user of state.users) {
    UserTable += `<tr>
  <td><img src="${user.avatar}" alt="404 not found" title="${user.email}" border=3 height=30 width=30></img></td>
  <td>${user.first_name}</td>
  <td>${user.last_name}</td>
  <td>${user.email}</td>
</tr>`
  }

  UserTable += `</tbody>
</table>` ;
  document.getElementById("user-list-container").innerHTML = UserTable;

}
