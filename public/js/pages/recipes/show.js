/* global document, axios, raterJs */

let jwt, recipeRater, recipeId

const fetchJwt = async () => {
  return (await axios.get('/jwt')).data
}

const sendMyRating = (newRatingValue) => {
  return axios.post(
    `/recipes/${recipeId}/rate`,
    {
      rating: newRatingValue,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
    }
  )
}

const handleRatingClick = (newRatingValue, done) => {
  sendMyRating(newRatingValue)
    .then((response) => {
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
  let isAuthenticated = false

  try {
    jwt = await fetchJwt()
    isAuthenticated = true
  } catch (error) {
    console.log('Not authenticated')
  }

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
