/*
Feladat:
    1.
        - Form submit eseményre szedd ki az input mezőkben lévő értékeket
        - Ha a keresőszó üres, dobj fel alert dobozt "Keresőszó kitöltése kötelező" felirattal
        - Ha van keresőszó, akkor encodeURI() beépített function-nel alakítsd át URL kompatibilis formára
        - Küldj AJAX kérést GET methoddal a 
          http://www.omdbapi.com/?s={keresőszó}&y={évszám}&apiKey=9606ae0f URL-re
        - A válaszként kapott filmeket rendereld ki a "movies" id-jú element belsejébe,
           az alábbi template alapján:


           <li>
              <div class="poster-wrap">
                <a>
                  <img src="{Borítókép (Poster)}" class="movie-poster" />
                </a>
              </div>
              <p data-imdbid="{Egyedi azonosító (imdbID)}" class="single-movie-btn">
                <span class="movie-title">
                  {Cím (Title)}
                </span>
              </p>
              <span class="movie-year">
                {Évszám (Year)}
              </span>
            </li>
*/


/*
 2.
        - Címre kattintva az adott id-jú film kapcsán küldj ki AJAX kérést GET methoddal a
          http://www.omdbapi.com/?i={Egyedi azonosító (imdbID)}&apiKey=9606ae0f URL-re
        - A szerver válaszát jelenítsd meg a felhasználónak  */

var state = {
  movies: []
}

document.getElementById("search").onsubmit = function (event) {
  event.preventDefault();
  var title = event.target.elements.search.value === "" ? alert("Keresőszó kitöltése kötelező") : encodeURI(event.target.elements.search.value);
  var year = event.target.elements.year.value;
  SearchFetchUsers(`http://www.omdbapi.com/?s=${title}&y=${year}&apiKey=9606ae0f`);

};


async function SearchFetchUsers(url) {
  var urlResponse = await fetch(url);
  if (!urlResponse.ok) {
    alert("Sikertelen csatlakozás!");
    return;
  }

  var MoviePages = await urlResponse.json();
  state.movies = MoviePages.Search;
  renderMovies();
};


function renderMovies() {
  var renderListHTML = "";
  for (let movie of state.movies) {
    renderListHTML += `
            <li>
              <div class="poster-wrap">
                <a>
                  <img src="${movie.Poster}" class="movie-poster" />
                </a>
              </div>
              <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
                <span class="movie-title">
                  ${movie.Title}
                </span>
              </p>
              <span class="movie-year">
                ${movie.Year}
              </span>
            </li>
            `;
  }

  document.getElementById("movies").innerHTML = renderListHTML;

  var MOvieTitles = document.querySelectorAll(".single-movie-btn")

  for (var movietitle of MOvieTitles) {
    movietitle.onclick = function (event) {

      var imdbID = event.target.parentElement.dataset.imdbid;
      fetch(`http://www.omdbapi.com/?i=${imdbID}&apiKey=9606ae0f`)
        .then(response => response.json())

        .then(imdbData => document.getElementById("movie-description").innerHTML = `
            <h1>${imdbData.Title}</h1>
            <p>${imdbData.Plot}</p>
            `
        );

    };

  }

}



