/* global document, axios, raterJs */

let recipeRater, recipeId

const fetchIsAuthenticated = async () => {
  const response = await axios.get('/currentUser')

  const data = await response.data

  return !!data.id
}

const sendMyRating = (newRatingValue) => {
  return axios.post(`/recipes/${recipeId}/rate`, { rating: newRatingValue })
}

const handleRatingClick = (newRatingValue, done) => {
  sendMyRating(newRatingValue).then((response) => {
    const newTotalRating = parseFloat(response.data.newRating)

    recipeRater.setRating(newTotalRating)
    setCurrentUserRating(newRatingValue)

    done()
  })
}

const setCurrentUserRating = (newRatingValue) => {
  const currentUserRating = document.querySelector('#recipe-current-user-rating')

  currentUserRating.textContent = `(Jūsų įvertinimas: ${newRatingValue})`
  currentUserRating.classList.remove('display-none')
}

;(async () => {
  let isAuthenticated = await fetchIsAuthenticated()

  const recipeRaterDiv = document.querySelector('#rater')
  recipeId = parseInt(recipeRaterDiv.dataset.recipeId)

  recipeRater = raterJs({
    element: recipeRaterDiv,
    rateCallback: handleRatingClick,
    readOnly: !isAuthenticated,
  })

  const initialRating = parseFloat(recipeRaterDiv.dataset.initialRating)
  recipeRater.setRating(initialRating)
})()
