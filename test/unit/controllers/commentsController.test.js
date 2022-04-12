const supertest = require('supertest')
const bcrypt = require('bcrypt')
const encryptPassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8))

const app = require('../../../src/app')

describe('commentsController', () => {
  describe('create', () => {
    const agent = supertest.agent(app)
    describe('with some recipes', () => {
      let author, recipe

      beforeEach(async () => {
        author = await app.get('models').users.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          password: await encryptPassword('password'),
        })

        recipe = await app.get('models').recipes.create({
          type: "Betboks",
          title: 'Sample Recipe',
          description: 'Recipe Description',
          ingredients: 'organic raw materials',
          userId: author.id,
        })
      })

      it('creates comment', async () => {
        await agent
          .post('/login')
          .send({ email:'john-doe@example.com', password: 'password' })
          .expect(302)
          .expect('Location', '/recipes')
        const requestBody = { text: 'text', 'recipeId': recipe.id }
        await agent.post(`/comments`).send(requestBody)
        .expect(302)

        const comment = await  app.get('models').comments.findOne({
          where: {
            userId: author.id,
            recipeId: recipe.id,
          },
        })
        expect(comment).toBeTruthy()
      })
    })
    
  })
})
