const mysql = require('mysql2/promise')
const {Sequelize} = require('sequelize')
const config = require('config.json')

let database = {}

const start = async () => {
    const connection = await mysql.createConnection(config.database)

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.name}\`;`)

    const sequelize = new Sequelize(config.name, config.database.user, config.database.password, { dialect: 'mysql' })
    database.User = require('./models/users')(sequelize);
    database.Course = require('./models/courses')(sequelize)
    await sequelize.sync()
}

start()

module.exports = database