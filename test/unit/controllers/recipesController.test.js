const supertest = require('supertest')
const { when } = require('jest-when')

const app = require('../../../src/app')

const RecipesController = require('../../../src/controllers/recipesController')

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
      it('renders recipe', async () => {
        const author = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: 'password',
        })

        const recipe = await app.get('models').recipes.create({
          title: 'Sample Recipe',
          description: 'Recipe Description',
          ingredients: 'organic raw materials',
          userId: author.id,
        })

        const response = await request.get(`/recipes/${recipe.id}`)

        expect(response.status).toBe(200)
      })
    })
  })
})
