/*global document, $, axios */

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

// eslint-disable-next-line no-unused-vars
const selectRecipe = (recipeId) => {
  console.log(`Selecting recipe with ID = ${recipeId}...`)
  const recipe = recipes.find(recipe => recipe.id === recipeId)
  renderRecipe(recipe)
}

const setHtmlMultiline = (element, multilineText) => {
  element.html(multilineText.split('\n').map(line => `<p>${line}</p>`))
}

const renderRecipe = (recipe) => {
  const titleHeading = $('#recipe-title')
  const ingredientsParagraph = $('#recipe-ingredients')
  const descriptionParagraph = $('#recipe-description')

  titleHeading.text(recipe.title)
  setHtmlMultiline(ingredientsParagraph, recipe.ingredients)
  setHtmlMultiline(descriptionParagraph, recipe.description)
}

;(async () => {
  jwt = await fetchJwt()
  recipes = await fetchRecipes(jwt)
  renderRecipesMenu(recipes)
})()
