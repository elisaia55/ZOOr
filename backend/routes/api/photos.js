const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models")

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
    const photos = await db.Photo.findAll({})
    return res.json(photos)
}))

module.exports = router;
