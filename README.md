# skanus-receptai

# SETUP

```powershell
node --version # v18.12.0
npm --version # 8.19.2
npm install
npm run recreateTables
npx sequelize db:seed:all
npm run tailwind
npm start
```

# DEVELOPMENT

```powershell
# Run Tailwind CSS app in other terminal and leave it running
npm run tailwind:dev

# Reset DB
npm run recreateTables && npx sequelize db:seed:all

# When MySQL is used
npm run recreateDb && npm run recreateTables && npx sequelize db:seed:all

# Start auto-restarting server
npm run dev
```

# Commands

## Initialize

```
node --version # must be > 18.0.0
npm --version # must be > 8.0.0
```

Initialize databases:

```
npm run recreateDb
npm run recreateTables
```

Write sample data to the database:

```
npx sequelize db:seed:all
```

## Server

Start server:

```
npm start
```

Stop with `Ctrl + C`

## Testing

Prepare database once:

```sh
NODE_ENV="test" node ./scripts/recreateDb.js
```

Test everything, including linters:

```sh
npm test
```

Run single unit test file:

```sh
npx jest --runInBand --config ./test/unit/jest.config.js -- app.test.js
```

## Linters

Autofix all files:

```
npm run autofix
```

# About

University project, recipes web application.

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.
