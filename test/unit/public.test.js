const { JSDOM } = require('jsdom')
const functions = require('../../public/recipeForTest')

test('Adds two numbers 2+2', () => {
  expect(functions.add(2, 2)).toBe(4)
})
test('createRecipeAddIgredients funciton exists', () => {
  expect(functions.createRecipeAddIgredients()).toBeDefined()
})
test('createRecipeAddIgredients funciton returns', () => {
  expect(functions.createRecipeAddIgredients()).toMatch(
    `<label for="recipe-form-ingredients">Ingredient: </label> <input type="text" name="ingredients" class="recipe-form-ingredients" required /> <label for="recipe-form-ingredients">Portion: </label> <input type="text" name="ingredients" class="recipe-form-ingredients" required /> <br />`
  )
})

/**
 * @jest-environment jsdom
 */
test('use jsdom in this test file', () => {
  const dom = new JSDOM()
  const element = dom.window.document.createElement('div')
  expect(element).not.toBeNull()
})

// test('createRecipeAddIgredients funciton exists', () => {
//   expect(functions.onRecipeFormAddStep()).toBeDefined()
// })
