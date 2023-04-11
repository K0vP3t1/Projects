// State
let elemek = [
  {
    id: 1,
    imageURL: "./images/accountant.jpeg",
    title: "Accountant",
  },
  {
    id: 2,
    imageURL: "./images/photographer.jpeg",
    title: "Photographer",
  },
  {
    id: 3,
    imageURL: "./images/football.jpeg",
    title: "Football player",
  },
  {
    id: 4,
    imageURL: "./images/delivery.jpeg",
    title: "Delivery Guy",
  },
  {
    id: 5,
    imageURL: "./images/ux.jpeg",
    title: "UX Designer",
  },
  {
    id: 6,
    imageURL: "./images/businessman.jpeg",
    title: "Businessman",
  },
  {
    id: 7,
    imageURL: "./images/boss.jpeg",
    title: "Boss",
  },
];

function arrayRotate(arr, count) {
  const ret = arr.slice();
  count -= ret.length * Math.floor(count / ret.length);
  ret.push.apply(ret, ret.splice(0, count));
  return ret;
}

window.onload = render();





function render(){

const renderHtmlStart = `
<div class="d-flex" style="min-height: 260px">
<div class="m-auto">
    <button id="prevButton" class="btn btn-primary">&lt;</button>
</div>

<div class="center w-100">
  <div id="elemek-kontener" class="card-group w-100">
`
const renderHtmlEnd = `
</div>
</div>


<div class="m-auto">
  <button id="nextButton" class="btn btn-primary">&gt;</button>
</div>
</div>`

let renderHtmlBody = renderHtmlStart ;

for(i = 0; i < 3 ; i++){
  renderHtmlBody += `
  <div class="card px-2 col-sm-6">
  <img src="${elemek[i].imageURL}" class="card-img-top" />
  <div class="card-body p-0">
  <h5 class="card-title"><b>#${elemek[i].id}</b></h5>
  <p class="card-text fs-6">${elemek[i].title}</p>
  </div>
</div>
  `
}

document.getElementById("gallery-app").innerHTML = renderHtmlBody + renderHtmlEnd;


document.getElementById("nextButton").onclick = gotToNextPics;
document.getElementById("prevButton").onclick = gotToPrevPics;

};


function gotToNextPics(){
  const container = document.getElementById("elemek-kontener");
  container.classList.add("to-left");
  container.ontransitionend = () => {
  elemek = arrayRotate(elemek, 3);
  render();
  const container = document.getElementById("elemek-kontener");
  container.offsetHeight;
  container.classList.add("from-right");
  container.ontransitionend = () => {
    container.classList.remove("from-right");
  }
  }
};

function gotToPrevPics(){
  const container = document.getElementById("elemek-kontener");
 
container.classList.add("to-right");
  container.ontransitionend = () => {
   
    elemek = arrayRotate(elemek, -3);
    render();
    
    const container = document.getElementById("elemek-kontener");

    container.offsetHeight;

    container.classList.add("from-left");
    container.ontransitionend = () => {
   
      container.classList.remove("from-left");

    };
  };
}