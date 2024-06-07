const express = require('express');
const router = express.Router();

const tradeController = require('../controllers/trades');

router.post("/", function(req, res, next) {
    tradeController.creatItem(req, res)
        .catch(err => next(err))
});

router.get("/", function(req, res, next) {
    tradeController.getList(req, res)
        .catch(err => next(err))
});

router.get("/:id", function(req, res, next) {
    tradeController.getItem(req, res)
        .catch(err => next(err))
});

router.delete("/:id", function(req, res) {
    res.status(405).send("Not implemented");
});

router.put("/:id", function(req, res) {
    res.status(405).send("Not implemented");
});

router.patch("/:id", function(req, res) {
    res.status(405).send("Not implemented");
});

module.exports = router;
