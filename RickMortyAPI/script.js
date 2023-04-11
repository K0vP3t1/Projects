// 
let state = []
let selectedPage = 1;

//window.onload = renderCharacters;


document.getElementById("episodes").onclick = function(){
  selectedPage = 1;
  fetchEpisodes(`https://rickandmortyapi.com/api/episode?page=${selectedPage}`);
  
}


document.getElementById("characters").onclick = function () {

  selectedPage = 1;
    fetchCaharcters(`https://rickandmortyapi.com/api/character/?page=${selectedPage}`)
   
   

}

document.getElementById("locations").onclick = function(){
  selectedPage = 1;
  fetchLocations(`https://rickandmortyapi.com/api/location?page=${selectedPage}`)
}


function fetchEpisodes(url){
  fetch(url)
  .then((res) => (res.ok ? res.json() : alert("eeror")))
  .then((content) =>{
    state = content.results
      renderEpisodes();
  })
}

function fetchLocations(url){
  fetch(url)
  .then((res) => (res.ok ? res.json() : alert("error")))
  .then((content) =>{
    state = content.results
      renderLocations();
  })
}

function fetchCaharcters(url) {
    fetch(url)
        .then((res) => (res.ok ? res.json() : alert("error")))
        .then((content) => {

            state = content.results
             renderCharacters();
        })

}
//col-12 col-md-6 col-lg-4 col-xl-3
function renderCharacters() {
    let renderHTML = `<div class="row row-cols-1 row-cols-md-6 g-4">`;
    for (i = 0; i < state.length; i++) {
        renderHTML += `
        
        <div class="col"> 
        <div class="card h-100">
         <img class="card-img-top" src="${state[i].image}" alt="${state[i].name}">
        <div class="card-body">
          <h5 class="card-title">${state[i].name}</h5>
          <ul>
          <li>${state[i].gender}</li>
          <li>${state[i].origin.name}</li>
          <li>${state[i].origin.species}</li>
          <li class="${state[i].status === "Alive" ? "text-success" : "text-danger"} ">${state[i].status}</li>
      </ul>
      
          
        </div>
      </div>
      </div>
      
      
      
        `
        var btnlist = `
        </div>
         <nav class="mt-2">
        <ul class="pagination" style="flex-wrap: wrap; justify-content: center;">
       
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="1">1</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="2">2</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="3">3</span>
        </li>
    
        </ul>
    </nav>`
    }

   

    document.getElementById("app-container").innerHTML = renderHTML +btnlist;

    document.querySelectorAll(".page-link")
    .forEach((element)=>{
        element.onclick =function(event){
            selectedPage = Number(event.target.dataset.page); 
            fetchCaharcters(`https://rickandmortyapi.com/api/character/?page=${selectedPage}`) ;
    
        }
    })


};

function renderLocations(){
  let renderLocationsHtml = `
  <table class="table table-striped mx-3 p-3">
  <thead>
      <tr class="table-dark bg-dark">
        <th>#ID</th>
        <th>Dimension</th>
        <th>Type</th>
        <th>Name</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
  `
for(i = 0; i < state.length; i++){
  renderLocationsHtml += `
  
      <tr>
      <td>${state[i].id}</td>
      <td>${state[i].dimension}</td>
      <td>${state[i].type}</td>
      <td>${state[i].name}</td>
      <td>${state[i].created}</td>
      </tr>
    
  `
  var btnlist = `
        </div>
         <nav class="mt-2">
        <ul class="pagination" style="flex-wrap: wrap; justify-content: center;">
       
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="1">1</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="2">2</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="3">3</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="4">4</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="5">5</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="6">6</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="7">7</span>
        </li>
    
        </ul>
    </nav>`
}


document.getElementById("app-container").innerHTML= renderLocationsHtml + `
</tbody>
</table>
` + btnlist;

 
document.querySelectorAll(".page-link")
.forEach((element) =>
{
  element.onclick = function(event){
    selectedPage = Number(event.target.dataset.page);
    fetchLocations(`https://rickandmortyapi.com/api/location?page=${selectedPage}`)
  }
})

};


function renderEpisodes(){
  let renderEpisodesHTML = `<div class="row row-cols-1 row-cols-md-6 g-4">`;
 
  for(i = 0; i < state.length ; i++){
   
    renderEpisodesHTML += `
    
        
    <div class="col"> 
    <div class="card h-100">
      <div class="card-body">
      <h5 class="card-title">${state[i].name}</h5>
      <ul>
      <li>${state[i].air_date}</li>
      <li>${state[i].episode}</li>
      <li>${state[i].created}</li>
     
  </ul>
  
      
    </div>
  </div>
  </div>
    `
    var btnlist = `
        </div>
         <nav class="mt-2">
        <ul class="pagination" style="flex-wrap: wrap; justify-content: center;">
       
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="1">1</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="2">2</span>
        </li>
        <li
          style="cursor: pointer"
          class="page-item ">
        <span class="page-link" data-page="3">3</span>
        </li>
    
        </ul>
    </nav>`

  }

  document.getElementById("app-container").innerHTML = renderEpisodesHTML +btnlist;

  document.querySelectorAll(".page-link")
  .forEach((element) =>
  {
    element.onclick = function(event){
      selectedPage = Number(event.target.dataset.page);
      fetchEpisodes(`https://rickandmortyapi.com/api/episode?page=${selectedPage}`);  
    }
  })


}

