const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, User } = require("../../db/models")
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator')

const validatePhoto = [
    check('photoUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an image URL')
        .isLength({ max: 1000 })
        .withMessage('Photo URL must not be more than 1000 characters'),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the title of your photo.')
        .isLength({ max: 2000 })
        .withMessage('Photo Name must not be more than 2000 characters'),
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
        .withMessage('Please provide the longitude of where your photo was taken')
        .isLength({ max: 25 })
        .withMessage('Longitude must not be more than 25 characters')
        .isDecimal()
        .withMessage('Must be a number'),
    handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {
    const photos = await Photo.findAll()

    return res.send(photos)
}))



router.post('/', validatePhoto, requireAuth, asyncHandler(async (req, res) => {
    const newPhoto = await Photo.create(req.body)
    return res.json(newPhoto)
}))

router.put('/', validatePhoto, requireAuth, asyncHandler(async (req, res) => {
    const {
        id,
        userId,
        content,
        photoUrl,
        state,
        city,
        zipCode,
        lat,
        lng
    } = req.body

    const editPhoto = await Photo.findByPk(id)
    const newPhoto = editPhoto.update(
        {
            userId,
            content,
            photoUrl,
            state,
            city,
            zipCode,
            lat,
            lng
        })
    return res.json(newPhoto)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const deletePhoto = await Photo.findByPk(req.body.id)
    await deletePhoto.destroy()
    return res.json(req.body.id)
}))


module.exports = router;
