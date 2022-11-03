const supertest = require('supertest')

const app = require('../../../src/app')

describe('authorsRecipesController', () => {
  describe('show', () => {
    const request = supertest(app)

    describe('without any authors recipes', () => {
      it('returns status 500', async () => {
        const response = await request.get('/authorsrecipes/1')

        expect(response.status).toBe(500)
      })
    })

    describe('without recipes', () => {
      it('renders authros recipes', async () => {
        const author = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: 'password',
        })

        const response = await request.get(`/authorsrecipes/${author.id}`)

        expect(response.status).toBe(200)
      })
    })

    describe('with some authors recipes', () => {
      it('renders authros recipes', async () => {
        const author = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: 'password',
        })

        await app.get('models').recipes.create({
          title: 'Sample Recipe',
          description: 'Recipe Description',
          ingredients: 'organic raw materials',
          userId: author.id,
          type: 'sample',
        })

        const response = await request.get(`/authorsrecipes/${author.id}`)

        expect(response.status).toBe(200)
      })
    })
  })
})
