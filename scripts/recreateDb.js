// This script connects to MySQL, drops database, then recreates it.
console.log(__filename)

const mysql = require('mysql2/promise')

const app = require('../src/app')
const mysqlConfig = app.get('db').primary

;(async () => {
  const connectionParameters = {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
  }

  console.log('Connecting to the MySQL...')
  console.log(connectionParameters)

  const connection = await mysql.createConnection(connectionParameters)

  function queryAndLog(queryString) {
    console.log(queryString)
    return connection.query(queryString)
  }

  queryAndLog(`DROP DATABASE IF EXISTS ${mysqlConfig.database}`)
  queryAndLog(`CREATE DATABASE ${mysqlConfig.database}`)

  console.log('DONE')
  connection.end()
})()
