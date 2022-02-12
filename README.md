# skanus-receptai

## About

University project

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

   ```bash
   node --version
   npm --version
   ```

Note: using Node version `v14.0.0` until this issue is resolved: https://github.com/npm/cli/issues/4234

2. Install your dependencies

   ```
   cd path/to/skanus-receptai
   npm install
   ```

3. Start your app

   ```
   npm start
   ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scripts

`npm run db:sync` - drops all tables, then recreates updated tables from model definitions.

`npx sequelize db:seed:all` - fills tables with sample data.

`npx sequelize seed:generate --name users` - generates sample seed file. See https://sequelize.org/master/manual/migrations.html for details.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
npm install -g @feathersjs/cli          # Install Feathers CLI

feathers generate service               # Generate a new Service
feathers generate hook                  # Generate a new Hook
feathers help                           # Show all commands
```

## Notes

### Creating users from console

Before adding a new user in console or back-end you must generate password hash:

```js
const bcrypt = require('bcrypt');
const makePassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8));
users.create([{
    email: 'user@example.com',
    password: await makePassword('password'),
});
```

The API does this automagically.

### Creating models from scripts

Models in `src/models/*.js` have only data columns defined and are left with association columns undefined, so even creating object with `relatedObjectId: 1` will result in `NULL`. To get properly initialized models see `migrations/models.js` or use:

```js
const models = require('./migrations/models.js')
console.log(models.users.associations) // This should now return non-empty container of associations
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

Feathers Sequelize adapter: https://www.npmjs.com/package/feathers-sequelize

About Sequelize seeds and migrations: https://github.com/sequelize/cli#usage, https://sequelize.org/master/manual/migrations.html
