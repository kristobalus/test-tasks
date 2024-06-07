
const Ajv = require('ajv')
const model = require('../models/trades')

const schemas = new Ajv({removeAdditional: true})
schemas.addSchema(require('../schemas/create-trade.json'), "create-trade")
schemas.addSchema(require('../schemas/get-list.json'), "get-list")

async function creatItem(req, res) {
    const validate = schemas.getSchema("create-trade")
    const data = req.body
    if ( !validate(data) ) {
        res.status(400).json(validate.errors)
        return
    }

    const item = await model.createItem(data)
    res.status(201).json(item)
}

async function getList(req, res) {
    const validate = schemas.getSchema("get-list")
    const data = { ...req.query }
    if ( !validate(data) ) {
        res.status(400).json(validate.errors)
        return
    }
    const { page, pageSize, ...filter } = data
    const limit = Math.min(25, pageSize ?? 25)
    const offset = (Math.max(1, page ?? 1) - 1) * limit
    const items = await model.getList(offset, limit, filter)
    res.status(200).json(items)
}

async function getItem(req, res) {
    const id = req.params.id
    const item = await model.getItem(id)
    if (!item) {
        res.status(404).send('ID not found');
        return
    }
    res.status(200).json(item)
}

module.exports = {
    creatItem,
    getList,
    getItem
}
