const { Sequelize } = require('sequelize')

const database = 'app-musica';
const username = 'app-musica-api';
const password = '1tJamZMbCJU1qw';
const host = 'redflox.com';
const port = 3396;
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.info('Connection has been established successfully.');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }

}

module.exports = {sequelize, connectToDatabase};
