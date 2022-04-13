const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../../src/app')

const encryptPassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8))

const agent = supertest.agent(app)

describe('session_authentication', () => {
  describe('POST /signup', () => {
    describe('when signup data is valid', () => {
      const email = 'test@test.com'

      const requestBody = {
        firstName: 'John',
        lastName: 'Doe',
        email,
        password: 'password',
      }

      it ('registers new user', async () => {
        await agent
          .post('/signup')
          .send(requestBody)
          .expect(302)
          .expect('Location', '/recipes')

        const createdUser = app.get('models').users.findOne({
          where: {
            email,
          },
        })

        expect(createdUser.id).toBein
      })
    })
  })

  describe('with existing user', () => {
    const email = 'test@test.com'
    const password = 'password'

    beforeEach(async () => {
      await app.get('models').users.create({
        firstName: 'John',
        lastName: 'Doe',
        email,
        password: await encryptPassword(password),
      })
    })

    describe('POST /login', () => {
      describe('with correct password', () => {
        const requestBody = {
          email,
          password,
        }

        it('is successful', async () => {
          await agent
            .post('/login')
            .send(requestBody)
            .expect(302)
            .expect('Location', '/recipes')
        })
      })

      describe('with incorrect password', () => {
        const requestBody = {
          email,
          password: 'incorrect password',
        }

        it('is unsuccessful', async () => {
          await agent
            .post('/login')
            .send(requestBody)
            .expect(401)
        })
      })
    })

    describe('when user is logged in', () => {
      beforeEach(async () => {
        await agent
          .post('/login')
          .send({ email, password })
          .expect(302)
          .expect('Location', '/recipes')
      })

      describe('GET /jwt', () => {
        it('is successful', async () => {
          await agent
            .get('/jwt')
            .expect(200)
        })
      })

      describe('GET /currentUser', () => {
        it('returns currently authenticated user data', async () => {
          const response = await agent
            .get('/currentUser')
            .expect(200)

          expect(response.body.currentUser).toMatchObject({
            email,
            firstName: 'John',
            lastName: 'Doe',
          })
        })
      })

      describe('GET /logout', () => {
        it('disconnects user from the system', async () => {
          const response = await agent
            .get('/logout')
            .expect(200)

          expect(response.text).toBe('You are now logged out')

          await agent
            .get('/currentUser')
            .expect(401)
        })
      })
    })
  })
})
