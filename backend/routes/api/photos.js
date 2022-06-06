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
        .isURL()
        .withMessage('Photo must be a URL'),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the title of your photo.')
        .isLength({ max: 2000 })
        .withMessage('Photo Name must not be more than 2000 characters'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the state of where your photo was taken.')
        .isLength({ max: 25 })
        .withMessage('State must not be more than 2 characters'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the city of where your photo was taken.')
        .isLength({ max: 30 })
        .withMessage('City must not be more than 30 characters'),

    check('zipCode')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the zipcode of where your photo was taken.')
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/)
        .withMessage('Zipcode must be in format that matches 5 digits')
        .isLength({ max: 20 })
        .withMessage('Zipcode must not be more than 20 characters'),


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
        })
    return res.json(newPhoto)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {

    const deletePhoto = await Photo.findByPk(req.body.id)
    await deletePhoto.destroy()
    return res.json(req.body.id)
}))




module.exports = router;
