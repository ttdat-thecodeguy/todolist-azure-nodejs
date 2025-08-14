const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/postgres_db'); // Adjust path as needed

const TodoModel = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'todos',
    timestamps: true
});

module.exports = { TodoModel };