const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db.js')

const connection = mysql.createConnection(MYSQL_CONFIG)

connection.connect()

const runSQL = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
    connection.end()
  })
}

module.exports = {
  runSQL
}