const functions = {
  createRecipeAddIgredients: () => {
    return `<label for="recipe-form-ingredients">Ingredient: </label> <input type="text" name="ingredients" class="recipe-form-ingredients" required /> <label for="recipe-form-ingredients">Portion: </label> <input type="text" name="ingredients" class="recipe-form-ingredients" required /> <br />`
  },
  add: (num1, num2) => num1 + num2,
  onRecipeFormAddIgredient: () => {
    const newData = document.createElement('div')
    newData.innerHTML = createRecipeAddIgredient()
    document.getElementById('add-igredient').appendChild(newData)
    return newData
  },
  /**
   * @jest-environment jsdom
   */
  onRecipeFormAddStep: () => {
    const newStep = document.createElement('input')
    newStep.setAttribute('type', 'text')
    newStep.setAttribute('name', 'steps')
    newStep.setAttribute('class', 'recipe-form-steps')
    document.getElementById('steps').appendChild(newStep)
  },
}
module.exports = functions
