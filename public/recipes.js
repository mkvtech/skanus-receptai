var links = document.getElementsByClassName('nav-links');

function changeColorToWhite(e) {
    e.target.style.color = e.target.style.color ? null : 'white';
}

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', changeColorToWhite);
}

function search_recipe() {
    var input = document.getElementById('searchbar').value;
    input=input.toLowerCase();
    var x = document.getElementsByClassName('recipe-title');
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

// var ingridients = document.getElementsByClassName('ingridients').getElementsByTagName('li');

// for(var i = 0; i < ingridients.length; i++) {
//     ingridients[i].hidden = true;
// }