;(() => {
  const recipeRaterDiv = document.querySelector('#rater')

  const initialRating = parseFloat(recipeRaterDiv.dataset.initialRating)

  const recipeRater = raterJs({
    element: recipeRaterDiv,
    rateCallback: function rateCallback(rating, done) {
      recipeRater.setRating(rating)

      console.log(rating)
      done()
    }
  })

  console.log(`Initial rating: ${initialRating}`)
  recipeRater.setRating(initialRating)
})()
