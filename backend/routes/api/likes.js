const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Like } = require('../../db/models');



router.get('/:photoId', asyncHandler(async (req, res) => {
    const { photoId } = req.params

    console.log({ photoId }, "---------------------------------------------------> inside ROUTER ")
    const photoLikes = await Like.findAll({ where: { photoId } })

    res.json(photoLikes)
}))

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const newLike = await Like.create(req.body)
    console.log(newLike)
    const createdLike = await newLike.save()
    console.log(newLike)
    res.json(createdLike)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { photoId, userId } = req.body
    const deleteLike = await Like.findOne({ where: photoId, userId })
    const deleteLikeId = deleteLike.id
    await deleteLike.destroy()
    res.json(deleteLikeId)
}))





module.exports = router;
