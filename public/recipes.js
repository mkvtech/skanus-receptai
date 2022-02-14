/*global document, $, axios */

let jwt
const recipesLinksContainer = $('#list-of-recipes')
const rightSideContainer = $('#right-side-container')
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

const fetchUser = async (userId) => {
  const response = await axios.get(`/api/users?id=${userId}`, { headers: { Authorization: `Bearer ${jwt}` } })
  return response.data.data[0]
}

const renderRecipesMenu = (recipes) => {
  recipesLinksContainer.html('')

  recipes.forEach((recipe) => {
    recipesLinksContainer.append(renderRecipeLink(recipe))
  })
}

const renderRecipeLink = (recipe) => {
  return `
    <li class="recipe-title">
      <a class="recipe-link" onclick="onRecipeSelect(${recipe.id})">
        ${recipe.title}
      </a>
    </li>
  `
}

// eslint-disable-next-line no-unused-vars
const onRecipeSelect = (recipeId) => {
  console.log(`Selecting recipe with ID = ${recipeId}...`)

  rightSideContainer.empty()
  rightSideContainer.html(recipeView)

  const recipe = recipes.find(recipe => recipe.id === recipeId)

  fillRecipeView(recipe)
}

// eslint-disable-next-line no-unused-vars
const onNewRecipe = () => {
  console.log('Opening form for new recipe...')

  rightSideContainer.empty()
  rightSideContainer.html(recipeForm)
}

const onRecipeEdit = () => {
  console.log('Opening form for existing recipe...')

  rightSideContainer.empty()
  rightSideContainer.html(recipeForm)

  fillRecipeForm()
}

const setHtmlMultiline = (element, multilineText) => {
  element.html(multilineText.split('\n').map(line => `<p>${line}</p>`))
}

const fillRecipeView = async (recipe) => {
  const titleHeading = $('#recipe-title')
  const ingredientsParagraph = $('#recipe-ingredients')
  const descriptionParagraph = $('#recipe-description')

  titleHeading.text(recipe.title)
  setHtmlMultiline(ingredientsParagraph, recipe.ingredients)
  setHtmlMultiline(descriptionParagraph, recipe.description)

  fillRecipeAuthor(await fetchUser(recipe.userId))
}

const fillRecipeAuthor = (user) => {
  const authorParagraph = $('#recipe-author')
  authorParagraph.text(`${user.firstName} ${user.lastName}`)
}

// eslint-disable-next-line no-unused-vars
const onRecipeFormSubmit = async () => {
  const $recipeTitle = $('#recipe-form-title')
  const $recipeIngredients = $('#recipe-form-ingredients')
  const $recipeDescription = $('#recipe-form-description')

  // front-end validation here

  const data = {
    title: $recipeTitle.val(),
    ingredients: $recipeIngredients.val(),
    description: $recipeDescription.val(),
  }

  const response = await axios.post('/api/recipes', data, { headers: { Authorization: `Bearer ${jwt}` } })
  const newRecipe = response.data

  recipes.push(newRecipe)
  onRecipeSelect(newRecipe.id)
  renderRecipesMenu(recipes)
}

const createRecipeForm = () => {
  return $(`
    <div id="recipe-form">
      <header><h1 id="recipe-edit-form-title">New Recipe</h1></header>

      <form action="javascript:void(0);">
        <label for="recipe-form-title">Pabadinimas: </label>
        <input type="text" name="title" id="recipe-form-title" required />
        <br />

        <label for="recipe-form-ingredients">Ingredientai: </label>
        <input type="text" name="ingredients" id="recipe-form-ingredients" required />
        <br />

        <label for="recipe-form-description">Gaminimo budas: </label>
        <input type="text" name="description" id="recipe-form-description" required />
        <br />

        <button type="submit" onclick="onRecipeFormSubmit()">Sukurti</button>
      </form>
    </div>
  `)
}

const createRecipeView = () => {
  return $(`
    <div id="recipe-view">
      <header><h1 id="recipe-title" class="right-header">Recepto pavadinimas</h1></header>

      <h2>Ingredientai</h2>
      <div id="recipe-ingredients" class="ingridients"></div>

      <h2>Gaminimo budas</h2>
      <div id="recipe-description" class="description"></div>

      <h2>Autorius</h2>
      <p id="recipe-author"></p>

      <h2>Komentarai</h2>
      <div id="recipe-comments">(TODO)</div>
    </div>
  `)
}

const recipeForm = createRecipeForm()
const recipeView = createRecipeView()

;(async () => {
  jwt = await fetchJwt()
  recipes = await fetchRecipes(jwt)
  renderRecipesMenu(recipes)
})()
