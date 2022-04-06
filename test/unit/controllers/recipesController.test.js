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
      let author, recipe

      beforeEach(async () => {
        author = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: 'password',
        })

        recipe = await app.get('models').recipes.create({
          type: "Betboks",
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
      
      describe("comments", () => {
        
        it("renders comments", async () => {
          const comment = await app.get('models').comments.create({
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
})
