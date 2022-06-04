const express = require("express");
const asyncHandler = require("express-async-handler");
const { Photo } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.post(
    "/photos",
    asyncHandler(async (req, res) => {
        const { results } = req.body;

        const photos = await Photo.findAll({
            where: {
                content: {
                    [Op.iLike]: `%${results}%`,
                },

            },
        });

        res.json({ photos });
    })
);

module.exports = router;
