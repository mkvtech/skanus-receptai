/*global document, $, axios */
//import functions from '/public/recipeForTest'
//const { createRecipeAddIgredients } = require('./recipeForTest')
let jwt
const recipesLinksContainer = $('#list-of-recipes')
const rightSideContainer = $('#right-side-container')
let currentUser
let recipes = []
var links = document.getElementsByClassName('nav-links')

var prevColor = null

function changeColorToWhite(e) {
  if (prevColor) {
    prevColor.target.style.color = ''
  }
  e.target.style.color = '#FA2E07'
  prevColor = e
}

// Color stayed the same after switching tabs
// function changeColorToWhite(e) {
//   e.target.style.color = e.target.style.color ? null : 'white'
// }

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

const fetchRecipes = async () => {
  const response = await axios.get('/api/recipes', { headers: { Authorization: `Bearer ${jwt}` } })
  return response.data.data
}

const fetchUser = async (userId) => {
  const response = await axios.get(`/api/users?id=${userId}`, { headers: { Authorization: `Bearer ${jwt}` } })
  return response.data.data[0]
}

const fetchComments = async (recipeId) => {
  const response = await axios.get(`/api/comments?recipeId=${recipeId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  return response.data.data
}

const fetchCurrentUser = async () => {
  const response = await axios.get('/currentUser', { headers: { Authorization: `Bearer ${jwt}` } })
  return response.data.currentUser
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
const onAllRecipes = () => {
  renderRecipesMenu(recipes)
}

// eslint-disable-next-line no-unused-vars
const onMyRecipes = () => {
  const myRecipes = recipes.filter((recipe) => recipe.id === currentUser.id)

  renderRecipesMenu(myRecipes)
}

// eslint-disable-next-line no-unused-vars
const onRecipeSelect = (recipeId) => {
  console.log(`Selecting recipe with ID = ${recipeId}...`)

  rightSideContainer.empty()
  rightSideContainer.html(recipeView)

  let recipe = recipes.find((recipe) => recipe.id === recipeId)

  fillRecipeView(recipe)
}

// eslint-disable-next-line no-unused-vars
const onNewRecipe = () => {
  console.log('Opening form for new recipe...')

  rightSideContainer.empty()
  rightSideContainer.html(recipeForm)
}

const onRecipeFormAddIgredient = () => {
  //console.log(recipeAddIgredient)

  const newData = document.createElement('div')
  newData.innerHTML = createRecipeAddIgredient()
  document.getElementById('add-igredient').appendChild(newData)
  return newData

  //console.log(test)
}

const onRecipeFormAddStep = () => {
  const newStep = document.createElement('input')
  newStep.setAttribute('type', 'text')
  newStep.setAttribute('name', 'steps')
  newStep.setAttribute('class', 'recipe-form-steps')
  document.getElementById('steps').appendChild(newStep)
}
const onRecipeEdit = () => {
  console.log('Opening form for existing recipe...')

  rightSideContainer.empty()
  rightSideContainer.html(recipeForm)

  fillRecipeForm()
}

const setHtmlMultiline = (element, multilineText) => {
  element.html(multilineText.split('\n').map((line) => `<p>${line}</p>`))
}

const fillRecipeView = async (recipe) => {
  const titleHeading = $('#recipe-title')
  const ingredientsParagraph = $('#recipe-ingredients')
  const descriptionParagraph = $('#recipe-description')

  titleHeading.text(recipe.title)
  setHtmlMultiline(ingredientsParagraph, recipe.ingredients)
  setHtmlMultiline(descriptionParagraph, recipe.description)

  fillRecipeAuthor(await fetchUser(recipe.userId))
  await fillComments(await fetchComments(recipe.id))
}

const fillRecipeAuthor = (user) => {
  const authorParagraph = $('#recipe-author')
  authorParagraph.text(`${user.firstName} ${user.lastName}`)
}

const fillComments = async (comments) => {
  const commentsContainer = $('#recipe-comments')

  commentsContainer.empty()

  comments.forEach(async (comment) => {
    comment.user = await fetchUser(comment.userId)
    commentsContainer.append(renderComment(comment))
  })
}

// eslint-disable-next-line no-unused-vars
const onRecipeFormSubmit = async () => {
  console.log('Submit has been pressed')
  const $recipeTitle = $('#recipe-form-title')
  const $recipeIngredients = $('#recipe-form-ingredients')
  const $recipeDescription = $('#recipe-form-description')
  if ($recipeTitle.val() == '') {
    alert('No tittle')
    return
  }
  if ($recipeIngredients.val() == '') {
    alert('No igredient')
    return
  }
  if ($recipeDescription.val() == '') {
    alert('No description')
    return
  }
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
  <div id="recepto-forma">
  <form id="forma" action="javascript:void(0); >
    <label for="recipe-form-title"> Recipe name: </label>
    <br />
    <input type="text" name="title" id="recipe-form-title" required />

    <br />

    <label for="recipe-form-description">Description: </label>
    <br />
    <input type="text" name="description" id="recipe-form-description" required />
    <br />

<div id="add-igredient">
    <label for="recipe-form-ingredients">Ingredient: </label>
    <input type="text" name="ingredients" Id="recipe-form-ingredients" required />
    <label for="recipe-form-ingredients">Portion: </label>
    <input type="text" name="ingredients" class="recipe-form-ingredients" required />
    <br />
</div>
<div class="break"></div>
    <button id="button-onclick" onclick="onRecipeFormAddIgredient()">Add ingredient</button>
    <br />
    <div class="break"></div>
    <div class="break"></div>
    <div class="break"></div>

    <div id="steps">
    <label for="recipe-form-steps">Steps to make: </label>
    <br />
    <input type="text" name="steps" class="recipe-form-steps" required />
  </div>

    <div class="break"></div>
    <button id="button-onclick" onclick="onRecipeFormAddStep()">Add Step</button>
    <br />
    <div class="break"></div>
    <button id="sukurti" type="submit" onclick="onRecipeFormSubmit()">Submit</button>
  </form>
  </div>
  </div>
  `)
}
const createRecipeAddIgredient = () => {
  return `

  <label for="recipe-form-ingredients">Ingredient: </label>
  <input type="text" name="ingredients" Id="recipe-form-ingredients" required />
  <label for="recipe-form-ingredients">Portion: </label>
  <input type="text" name="ingredients" class="recipe-form-ingredients" required />
  <br />

  `
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

      <h2>Naujas komentaras</h2>
      <div id="recipe-comment-form">(TODO)</div>

      <h2>Komentarai</h2>
      <div id="recipe-comments"></div>
    </div>
  `)
}

const renderComment = (comment) => {
  return `
    <div class="comment-container">
      <p class="comment-user">author: ${comment.user.firstName} ${comment.user.lastName}</p>
      <p class="comment-text">text: ${comment.text}</p>
      <p class="comment-rating">rating: ${comment.rating}</p>
    </div>
  `
}

const recipeForm = createRecipeForm()
const recipeView = createRecipeView()
const recipeAddIgredient = createRecipeAddIgredient()

;(async () => {
  jwt = await fetchJwt()
  currentUser = await fetchCurrentUser()
  recipes = await fetchRecipes()
  renderRecipesMenu(recipes)
})()

// const functions = {
//   createRecipeAddIgredients: () => {
//     return `
//     <label for="recipe-form-ingredients">Ingredient: </label>
//     <input type="text" name="ingredients" class="recipe-form-ingredients" required />
//     <label for="recipe-form-ingredients">Portion: </label>
//     <input type="text" name="ingredients" class="recipe-form-ingredients" required />
//     <br />
//     `
//   },
//   add: (num1, num2) => num1 + num2,
// }
// module.exports = functions
