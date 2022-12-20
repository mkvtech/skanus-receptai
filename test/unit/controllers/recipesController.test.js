const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../../../src/app')

const encryptPassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8))

describe('recipesController', () => {
  describe('show', () => {
    const request = supertest(app)

    describe('without recipes', () => {
      it('returns status 404', async () => {
        const response = await request.get('/recipes/1')

        expect(response.status).toBe(404)
      })
    })

    describe('with some recipes', () => {
      let author, recipe

      beforeEach(async () => {
        author = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: 'password',
        })

        recipe = await app.get('models').recipes.create({
          type: 'Betboks',
          title: 'Sample Recipe',
          description: 'Recipe Description',
          ingredients: 'organic raw materials',
          userId: author.id,
        })
      })

      it('renders recipe', async () => {
        const response = await request.get(`/recipes/${recipe.id}`)

        expect(response.status).toBe(200)
      })

      describe('comments', () => {
        it('renders comments', async () => {
          await app.get('models').comments.create({
            userId: author.id,
            text: 'Kazkoks tekstas',
            recipeId: recipe.id,
            rating: 1,
          })

          const response = await request.get(`/recipes/${recipe.id}`)

          expect(response.status).toBe(200)
          expect(response.text).toMatch(/Kazkoks tekstas/)
        })
      })
    })
  })

  describe('POST /recipes/:id/rate', () => {
    const sentRating = 1

    describe('when user is not authenticated', () => {
      const request = supertest(app)

      let recipeAuthor, recipe

      beforeEach(async () => {
        recipeAuthor = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: 'password',
        })

        recipe = await app.get('models').recipes.create({
          type: 'Betboks',
          title: 'Sample Recipe',
          description: 'Recipe Description',
          ingredients: 'organic raw materials',
          userId: recipeAuthor.id,
        })
      })

      it('returns 401', async () => {
        await request.post(`/recipes/${recipe.id}/rate`).send({ rating: sentRating }).expect(401)
      })
    })

    describe('when user is authenticated', () => {
      const agent = supertest.agent(app)
      const password = 'password'

      let currentUser

      beforeEach(async () => {
        currentUser = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: await encryptPassword(password),
        })

        await agent.post('/login').send({ email: currentUser.email, password })
      })

      describe('when rating non-existing recipe', () => {
        it('returns 404', async () => {
          await agent.post('/recipes/1/rate').send({ rating: sentRating }).expect(404)
        })
      })

      describe('when rating existing recipe', () => {
        let recipeAuthor, recipe

        beforeEach(async () => {
          recipeAuthor = await app.get('models').users.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john-doe2@example.com',
            password: 'password',
          })

          recipe = await app.get('models').recipes.create({
            type: 'Betkoks',
            title: 'Sample Recipe',
            description: 'Recipe Description',
            ingredients: 'organic raw materials',
            userId: recipeAuthor.id,
          })
        })

        describe('when recipe was not rated before', () => {
          it('creates new recipeRating object', async () => {
            await agent.post(`/recipes/${recipe.id}/rate`).send({ rating: sentRating }).expect(200)

            const recipeRating = await app.get('models').recipeRatings.findOne({
              where: {
                userId: currentUser.id,
                recipeId: recipe.id,
              },
            })

            expect(recipeRating.rating).toEqual(sentRating)
          })
        })

        describe('when recipe was already rated before', () => {
          let recipeRating

          beforeEach(async () => {
            recipeRating = await app.get('models').recipeRatings.create({
              recipeId: recipe.id,
              userId: currentUser.id,
              rating: 5,
            })
          })

          it('updates recipeRating object', async () => {
            await agent.post(`/recipes/${recipe.id}/rate`).send({ rating: sentRating }).expect(200)

            await recipeRating.reload()

            expect(recipeRating.rating).toEqual(sentRating)
          })
        })
      })
    })
  })
})
