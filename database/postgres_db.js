const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbo_research', 'postgres', '12345678x@X', {
    host: '192.168.121.100',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});

async function establishConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
establishConnection();

module.exports = { sequelize };