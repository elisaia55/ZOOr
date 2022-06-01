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
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage("Pleave Leave a Rating."),
    handleValidationErrors
];

router.post('/', validateComment, requireAuth, asyncHandler(async (req, res) => {
    const newComment = await Comment.create(req.body)
    return res.json(req.body)
}));

router.get('/:photoId', asyncHandler(async (req, res) => {
    const photoId = req.params.photoId;
    const comments = await Comment.findAll({ where: { photoId } })
    res.json(comments)
}))

router.put('/', requireAuth, validateComment, asyncHandler(async (req, res) => {
    const { commentId, comment } = req.body;
    const updateComment = await Comment.findByPk(commentId)
    const editedComment = await updateComment.update({ comment })

    res.json(editedComment)
}))

module.exports = router;
