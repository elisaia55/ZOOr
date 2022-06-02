const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();
const { Comment } = require('../../db/models')


const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please Leave a Comment'),
    handleValidationErrors
];

router.post('/', validateComment, requireAuth, asyncHandler(async (req, res) => {

    console.log('ENTERED ROUTE')
    const buildComment = await Comment.build(req.body)
    console.log('ENTERED ROUTE')
    const newComment = await buildComment.save()
    return res.json(newComment)
}));

router.get('/:photoId', asyncHandler(async (req, res) => {
    const photoId = req.params.photoId;

    const comments = await Comment.findAll({ where: { photoId } })
    console.log("ENTERED THE GET ROUTE FOR COMMMENTS +++++++", comments)
    res.json(comments)
}))

router.put('/', requireAuth, validateComment, asyncHandler(async (req, res) => {
    const { commentId, comment } = req.body;
    const updateComment = await Comment.findByPk(commentId)
    const editedComment = await updateComment.update({ comment, rating })

    res.json(editedComment)
}))

module.exports = router;
