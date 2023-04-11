const container = document.getElementById("drag-and-drop-app");

let state = {
  elements: {
    "first": {
      id: "first",
      x: container.offsetLeft,
      y: container.offsetTop,
    },
    "second": {
      id: "second",
      x: container.offsetLeft + 20,
      y: container.offsetTop + 150,
    },

    "third": {
      id: "third",
      x: container.offsetLeft + 40,
      y: container.offsetTop + 300,
    }

  },
  draggedId: ""

};


window.onload = render;

function render() {

  let boxesHTML = "";
  for (let element of Object.values(state.elements)) {
    boxesHTML += `
  <div
   class="box ${state.draggedId === element.id ? "grabbed" : "not-grabbed"}"
   style=" position: absolute; top: ${element.y}px; left: ${element.x}px; "
  onmousedown="boxDragStart(window.event)"
  onmouseup="boxDragEnd(window.event)"
  onmousemove="boxMouseMove(window.event)"
  data-unique-id="${element.id}"
   >
  <div class="card-body">
    <h5 class="card-title display-4 text-center">#${element.id}</h5>

  </div>
</div>
  `;
  }


  document.getElementById("drag-and-drop-app").innerHTML = boxesHTML;



}

function boxDragStart(event) {
  const box = event.target.closest(".box");
  state.draggedId = box.dataset.uniqueId;
  render();
}
function boxDragEnd() {
  state.draggedId = null;
  render();
}

function boxMouseMove(event) {
  if (!state.draggedId) {
    return;
  }
  const box = event.target.closest(".box");
  if (!box) {
    return;
  }
  state.elements[state.draggedId].x = document.documentElement.scrollLeft + event.clientX - box.offsetWidth / 2;
  state.elements[state.draggedId].y = document.documentElement.scrollTop + event.clientY - box.offsetHeight / 2;
  render();


}



