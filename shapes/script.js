
let state = {
  circle: 0,
  square: 0,
  rectangle: 0,
};




document.getElementById("shapes").onsubmit = function (event) {
  event.preventDefault();
  let currElement = event.target.elements.selectedShape.value;
  let increment =   event.target.elements.action[0].checked  ;

  if(increment){

    switch (currElement) {
      case "circle":
        state.circle += 1;
        break;
      case "square":
        state.square += 1;
        break;
      case "rectangle":
        state.rectangle += 1;
    }
    
  }

  else{
    switch (currElement) {
      case "circle":
        state.circle -= 1;
        break;
      case "square":
        state.square -= 1;
        break;
      case "rectangle":
        state.rectangle -= 1;
    }

  }
 render();
  
}



function render(){
document.getElementById("bodies"). innerHTML = `
<div id="sh-circle" class="center d-inline-block">${state.circle}</div>
      <div id="sh-square" class="center d-inline-block">${state.square}</div>
      <div id="sh-rectangle" class="center d-inline-block">${state.rectangle}</div>`

}

