



let state = {
  products: [
    {
      id: uuidv4(),
      name: "Teszt termek 1",
      price: 2500,
      inStock: true

    },

    {
      id: uuidv4(),
      name: "Teszt termek 2",
      price: 3500,
      inStock: true

    },
    {
      id: uuidv4(),
      name: "Teszt termek 3",
      price: 5500,
      inStock: false

    }
  ],
  editedID : ""
};

function renderEditProducts(){
  if(state.editedID === ""){
    document.getElementById("edit-product").innerHTML = "";
    return; // a többi dolog ne fusson végig
  }
  var foundProduct;
  for(var product of state.products){
    if(product.id === state.editedID){
      foundProduct = product;
      break;
          }
    
  }


let ediFormHTML = `
<form id="edited-product" class="p-5">
<label class="w-100">
  Név:
  <input class="form-control" type="text" name="name" value="${foundProduct.name}">
</label>
<label class="w-100">
  Ár:
  <input class="form-control" type="number" name="price" value="${foundProduct.price}">
</label>
<label class="w-100">
  Van készleten?
  <input class="form-control" type="checkbox" name="isInStock" ${foundProduct.inStock ? "checked" : ""}>
</label>
<button class="btn btn-primary" type="submit">Küldés</button>
</form>
`;
document.getElementById("edit-product").innerHTML = ediFormHTML;

document.getElementById("edited-product").onsubmit = function(event) {
event.preventDefault();
let newname = event.target.elements.name.value;
let newPrice  = Number(event.target.elements.price.value);
let  newInStock = event.target.elements.isInStock.checked;

var foundIndex
for(var i = 0 ; i < state.products.length ; i++){
  if (state.products[i].id === state.editedID) {
    foundIndex = i;
    break;
}}
state.products[foundIndex]={name:newname , price: newPrice, inStock :newInStock, id: state.editedID};
state.editedID = "";
renderProducts(); // újra írjuk az egész lsitát
renderEditProducts(); // eltűntetjük a formot



}

}



function renderProducts() {

  var productListTemplate = "";

  let productListHead = `

      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>inStock</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>`  ;
  productListTemplate = `<table class="table table-striped">${productListHead}`;

  
  for (let product of state.products) {

    productListTemplate = productListTemplate + `
          <tbody>
            <tr class= " ${product.inStock ? "" : "bg-danger"} " >
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.inStock}</td>
              <td><button class="btn btn-secondary delete-product" data-productid="${product.id}">Delete</button></td>
               <td><button class="btn btn-warning edit-product" data-productid="${product.id}">Edit</button></td>
            </tr>
          </tbody>
        
    `;

   


  }
  productListTemplate = productListTemplate + `</table>`;
  document.getElementById("product-list-component").innerHTML = productListTemplate;

for(var editBtn of document.querySelectorAll(".edit-product")){

editBtn.onclick = function(event){
  var id = event.target.dataset.productid ; 
  state.editedID = id ; 
  renderEditProducts();

}

}


  //action
  for (var deleteBtn of document.querySelectorAll(".delete-product")) {

    deleteBtn.onclick = function(event) {
   
      var id = event.target.dataset.productid;
      var foundIndex;
      for (i = 0; i < state.products.length; i++) {
        if (state.products[i].id === id) {
          foundIndex = i;
          break; // futásidőben megtaláljuk az indexet akkor ezzel megtrjük a ciklust

        }
      }
      console.log(foundIndex);

         //state change
state.products.splice(foundIndex,1);

         //render
         renderProducts()
    }

  }

};




window.onload = renderProducts;


// action , state cange, render . -> a tömbhöz a submit eseményre hozzá kell fűzni a user által beírt  adatokat 

var formSubmit = document.getElementById("create-product");
// action
formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  let newname = event.target.elements.name.value;
  let newPrice = Number(event.target.elements.price.value);
  let newInStock = event.target.elements.isInStock.checked;
  let newId = uuidv4();


  //sate change
  state.products.push({ name: newname, price: newPrice, inStock: newInStock, id: newId });
  //render
  renderProducts();


}, false)

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};