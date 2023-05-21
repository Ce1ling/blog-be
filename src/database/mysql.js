const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db.js')

const connection = mysql.createConnection(MYSQL_CONFIG)

connection.connect()

const db = {
  /**
   * 运行 `SQL` 语句, 若您没有处理用户输入, 则可能会受到 `XSS` 攻击.
   * @param {string} sql `SQL` 语句
   */
  run(sql) {
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  },
  /**
   * 关闭数据库连接
   */
  close() {
    connection.end()
  },
}

module.exports = {
  db
}