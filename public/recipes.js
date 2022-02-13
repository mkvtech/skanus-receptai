let jwt
let recipesLinksContainer = $('#list-of-recipes')
let recipes = []
var links = document.getElementsByClassName('nav-links')

function changeColorToWhite(e) {
  e.target.style.color = e.target.style.color ? null : 'white'
}

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', changeColorToWhite)
}

function search_recipe() {
  var input = document.getElementById('searchbar').value
  input = input.toLowerCase()
  var x = document.getElementsByClassName('recipe-title')
  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = 'none'
    } else {
      x[i].style.display = 'list-item'
    }
  }
}

const fetchJwt = async () => {
  const response = await axios.get('/jwt')
  return response.data
}

const fetchRecipes = async (jwt) => {
  const response = await axios.get('/api/recipes', { headers: { Authorization: `Bearer ${jwt}` } })
  return response.data.data
}

const renderRecipesMenu = (recipes) => {
  recipesLinksContainer.innerHTML = ''

  recipes.forEach((recipe) => {
    recipesLinksContainer.append(renderRecipeLink(recipe))
  })
}

const renderRecipeLink = (recipe) => {
  return `
    <li class="recipe-title">
      <a class="recipe-link" onclick="selectRecipe(${recipe.id})">
        ${recipe.title}
      </a>
    </li>
  `
}

const selectRecipe = (recipeId) => {
  console.log(`Selecting recipe with ID = ${recipeId}...`)
}

;(async () => {
  jwt = await fetchJwt()
  recipes = await fetchRecipes(jwt)
  renderRecipesMenu(recipes)
})()

// var ingridients = document.getElementsByClassName('ingridients').getElementsByTagName('li');

// for(var i = 0; i < ingridients.length; i++) {
//     ingridients[i].hidden = true;
// }
