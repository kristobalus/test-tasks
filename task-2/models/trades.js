// Uncomment the code below to use Sequelize ORM
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
// const mongoose = require('mongoose');

// Insert your model definition below

const Trades = sequelize.define('Trades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    shares: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    timestamp: DataTypes.BIGINT
});

const attributes = [ 'id', 'type', 'user_id', 'symbol', 'shares', 'price', 'timestamp' ]

async function createItem(data) {
    const item = await Trades.create(data);
    return { ...data, id: item.id };
}

async function getList(offset, limit, filter) {
    return await Trades.findAll({
        where: {
            ...(filter ?? {})
        },
        attributes,
        offset: offset,
        limit: limit
    })
}

async function getItem(id) {
    const item = await Trades.findByPk(id)
    const data = item ? {
        ...item.dataValues
    } : null
    if ( data ) {
        delete data.createdAt
        delete data.updatedAt
    }
    return data
}

module.exports = {
    Trades,
    createItem,
    getList,
    getItem
}
