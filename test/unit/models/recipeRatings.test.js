const app = require('../../../src/app')

const { users, recipes, recipe_ratings } = app.get('models')

describe('recipeRatings', () => {
  describe('.save()', () => {
    let recipeAuthor, user, recipe

    beforeEach(async () => {
      recipeAuthor = await users.create({
        firstName: 'Recipe',
        lastName: 'Author',
        email: 'recipe.author@test.com',
        password: 'password',
      })

      user = await users.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john-doe@test.com',
        password: 'password',
      })

      recipe = await recipes.create({
        title: 'Sample Recipe',
        description: 'Recipe Description',
        ingredients: 'organic raw materials',
        userId: recipeAuthor.id,
        type: 'type',
      })
    })

    describe('with invalid data', () => {
      let recipeRating

      beforeEach(() => {
        recipeRating = recipe_ratings.build({
          userId: user.id,
          recipeId: recipe.id,
          rating: 5,
        })
      })

      describe('when rating is less than 0', () => {
        beforeEach(() => {
          recipeRating.rating = -1
        })

        it('throws validation error', async () => {
          await expect(async () => {
            await recipeRating.save()
          }).rejects.toThrow('Rating must be 1 or greater')
        })
      })

      describe('when rating is greater than 5', () => {
        beforeEach(() => {
          recipeRating.rating = 6
        })

        it('throws validation error', async () => {
          await expect(async () => {
            await recipeRating.save()
          }).rejects.toThrow('Rating must be 5 or less')
        })
      })

      describe('when userId is null', () => {
        beforeEach(() => {
          recipeRating.userId = null
        })

        it('throws validation error', async () => {
          await expect(async () => {
            await recipeRating.save()
          }).rejects.toThrow('userId cannot be null')
        })
      })

      describe('when recipeId is null', () => {
        beforeEach(() => {
          recipeRating.recipeId = null
        })

        it('throws validation error', async () => {
          await expect(async () => {
            await recipeRating.save()
          }).rejects.toThrow('recipeId cannot be null')
        })
      })

      describe('when user has already rated the recipe', () => {
        beforeEach(async () => {
          await recipe_ratings.create({
            userId: user.id,
            recipeId: recipe.id,
            rating: 4,
          })
        })

        it('throws validation error', async () => {
          await expect(async () => {
            await recipeRating.save()
          }).rejects.toThrow('Validation error')
        })
      })
    })

    describe('with valid data', () => {
      it('saves recipeRating object', async () => {
        await recipe_ratings.create({
          userId: user.id,
          recipeId: recipe.id,
          rating: 5,
        })
      })
    })
  })
})
