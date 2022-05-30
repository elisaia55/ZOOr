const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, User } = require("../../db/models")
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator')

const validatePhoto = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the title of your photo.')
        .isLength({ max: 100 })
        .withMessage('Photo Name must not be more than 100 characters'),
    check('photoUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an image URL')
        .isLength({ max: 1000 })
        .withMessage('Photo URL must not be more than 1000 characters'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the state of where your photo was taken.')
        .isLength({ max: 100 })
        .withMessage('State must not be more than 100 characters'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the city of where your photo was taken.')
        .isLength({ max: 100 })
        .withMessage('City must not be more than 100 characters'),
    check('zipCode')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the zipcode of where your photo was taken.')
        .isLength({ max: 25 })
        .withMessage('Zipcode must not be more than 25 characters')
        .isDecimal()
        .withMessage('Must be a number'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the latitude of where your photo was taken')
        .isLength({ max: 25 })
        .withMessage('Latitude must not be more than 25 characters')
        .isDecimal()
        .withMessage('Must be a number'),
    check('lng')
        .exists({ checkFalsy: true })
        .isLength({ max: 25 })
        .withMessage('Longitude must not be more than 25 characters')
        .isDecimal()
        .withMessage('Must be a number'),
    handleValidationErrors
];

router.get('/', asyncHandler(async function (req, res) {
    const photos = await Photo.findAll({})

    return res.json(photos)
}))

// testing adding photo

router.post('/', validatePhoto, requireAuth, asyncHandler(async (req, res) => {
    const newPhoto = await Photo.create(req.body)
    return res.json(newPhoto)
}))

module.exports = router;
