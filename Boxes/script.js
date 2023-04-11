/*
1. doboz:
Kattintásra adjunk hozzá egy "blur" nevű class attribútumot, majd újabb kattintásra vegyük
le róla azt.
*/

/*

-element js reperzentáció:  var element = document.getElementById("element-one");
-esemény kiválasztása: onclick esemény-en jöjjn létre a változtatás
-funkcionalitás leírása: az elementnek blur class-t kell adnunk. 
*/


var element = document.getElementById("element-one");

// belső állapot: state
var blurOn = false; // bekőtődik a memóriába és a gombnyomásra tudjuk állítgatni.

// action (esemény)
element.onclick = function () {

    blurOn = !blurOn; // state change

    //render - > user számára újra "rajzoljuk" az interface-t
    if (blurOn) {
        element.classList.add("blur");

    }
    else {
        element.classList.remove("blur");

    }


};


/*
2. doboz:
Ha az egérrel fölé megyünk változzon meg a háttérszíne pirosra, ha levesszük róla az egeret
változzon vissza az eredeti színére.
*/


// element js reprezentáció
var element2 = document.getElementById("element-two");

// state
var hoverOn = false

// esemény kiválasztás: :hover js: onmouseover onmouseleave

// funkcionalitás leírása: meg kell változtatnunk a háttérszínt
//action
element2.onmouseover = function () {
    //state change
    hoverOn = true;
    //render
    renderSecondBox();
};


//action
element2.onmouseleave = function () {
    //state change
    hoverOn = false;

    //render
    renderSecondBox();
};
//renderelés
function renderSecondBox() {
    if (hoverOn) {
        element2.style.backgroundColor = "red"

    }
    else {
        element2.style.backgroundColor = "";
    }
}






/*
3. doboz:
Dupla kattintással sorsoljon egy számot 1 és 20 között és módosítsa a kapott számmal a doboz tartalmát. 
*/

// element js reprezentáció :

var element3 = document.getElementById("element-three");

// esemény kiválasztás: dupla klikk : ondbclick

//console.dir(element3);
//state:
var newNumber = 0;

//action

element3.ondblclick = function () {
    //state change
    newNumber = Math.floor(Math.random() * 20) + 1;

    //render
    element3.firstElementChild.innerHTML = newNumber;
};











/*
4. doboz:
Kattintásra tűnjön el, majd egy 1 másodperces várakozás után ismét jelenjen meg.
*/

// element js reprezentációja

var element4 = document.getElementById("element-four");

// esemény meghatározsa: onclick

// funkcionalitás leírása: tűnjön el a div és jelenljen meg újra

//action 
element4.onclick = function () {
    // eltűntetés
    element4.classList.add("hidden");

    // visszagozás settimout-al

    setTimeout(function () {
        element4.classList.remove("hidden")
    }, 1000);


};









/*
5. doboz:
Kattintásra alakítsa kör alakúra az összes dobozt.
*/

// element js reprezentációja:

var element5 = document.getElementById("element-five");
var element6 = document.getElementById("element-six");
var element7 = document.getElementById("element-seven");
var element8 = document.getElementById("element-eight");
var element9 = document.getElementById("element-nine");
var elementek = [
    element,
    element2,
    element3,
    element4,
    element5,
    element6,
    element7,
    element8,
    element9
];

//esemény meghatározása: onclick

// funkcionalitás leírása: kattintása minden box legyen kör alakú és vica-versa

//state

var circleOn = false;
//action
element5.onclick = function () {
    // state change
    circleOn = !circleOn;
    //render
    if (circleOn) {

        for (var elem of elementek) {
            elem.classList.add("box5style");
        }
    }
    else {
        for (var elem of elementek) {
            elem.classList.remove("box5style");
        }
    }

};


/* Tanár megoldása:
var element5 = document.getElementById("element-five");
var circleOn = false ;
//action
element5.onclick = function() {
    // state change
    circleOn = !circleOn;

    var boxes = document.querySelectorAll(".shape");
    //render
if(circleOn){

    for(var elem of boxes){
    elem.classList.add("box5style");}
}
else{
    for(var elem of boxes){
    elem.classList.remove("box5style");}
}

};

*/

/*
6. doboz:
Form submit eseményre módosítsuk a doboz tartalmát az input mezőbe írt értékkel
*/

// az element js reperezntációja
//element6

//esemény meghatározása: submit-elik az formot

// funkcionalitás leírása: a doboz html jét meg kell változtatnunk a beírt értékre

// state: az input adat előtti állapot

// action

/*

saját megoldás: nem jó

document.getElementById("sub").addEventListener("click", function(){
//state change
var inputElement = document.getElementById("inp");

element6.firstElementChild.innerHTML = inputElement.value ;

},false); */

// az element js reperezntációja
//element6

//esemény meghatározása: submit-elik az formot

// funkcionalitás leírása: a doboz html jét meg kell változtatnunk a beírt értékre

// state: az input adat előtti állapot

// action

var form = document.getElementById("box-6");

form.onsubmit = function (event) {
    event.preventDefault();
    element6.firstElementChild.innerHTML = event.target.elements.boxNumber.value;
}



/*
7. doboz:
Keypress eseményre írjuk be a dobozba az adott karaktert, amit leütöttek
*/

//element js reprezenzációja

var box7inp = document.getElementById("box7-input")

// esemény kiválasztása addeventListener onkeypress esemény

// funkcionalitás leírása: meg kell változtatni a box inner html jét az input értékére dinamikusan

//state  input üres / nincs állítgatva

// action

box7inp.addEventListener("keypress", function () {
    element7.firstElementChild.innerHTML = box7inp.value;

}, false);



/*
8. doboz:
Egérmozdítás eseményre írjuk be az egér pozíciójának x és y koordinátáját, 
a következő séma szerint: "X: {x-koordináta}, Y: {y-koordináta}"
*/

//esemény: onmousemove

document.body.onmousemove = function (event) {
    koordinatak(event);
};

function koordinatak(e) {
    var x = e.clientX;
    var y = e.clientY;

    element8.firstElementChild.innerHTML = "X:" + x + "<br>" + "Y:" + y;
};


/*
9. doboz:
Submit eseményre módosítsuk a doboz tartalmát azzal az értékkel ami úgy áll elő, 
hogy végrehajtjuk a select inputban kiválasztott operációt,
a state-en és number inputba beírt értéken.

Az előállt végeredményt tároljuk el új state-ként!

Pl:
  Number input mezőbe írt érték: 5
  Select inputban kiválasztott érték: "mult"
  Aktuális state: 9

  Operáció: 9 * 5
  
  Dobozba és state-be beírandó érték: 45
*/

var formBox9 = document.getElementById("box-9");

//state  - box jelenlegi értéke

// action



formBox9.onsubmit = function (event) {
    event.preventDefault();

    var actState = Number(element9.firstElementChild.innerHTML);
    var operator = event.target.elements.operator.value;
    var operand = event.target.elements.operand.value;
  

    // state change
   switch (operator) {
        case "mult":
            actState = actState * operand;
            break;

        case "div":
            actState = actState / operand;
            break;

        case "add":
            actState = actState + operand;
            break;

        case "sub":
            actState = actState - operand;
            break;

    };

 //render
    element9.firstElementChild.innerHTML = actState;


};

