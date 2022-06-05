const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();
const { Comment, Photo, User } = require('../../db/models');



const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please Leave a Comment')
        .isLength({ max: 12500 })
        .withMessage('Photo Description must not be more than 12,500 characters.'),
    handleValidationErrors
];

router.post('/', validateComment, requireAuth, asyncHandler(async (req, res) => {


    const commentBuilder = await Comment.build(req.body)
    const newComment = await commentBuilder.save()

    res.json(newComment)
}));

router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll()
    return res.json(comments)



}))

router.put('/', requireAuth, asyncHandler(async (req, res) => {

    const { commentId, commentNew } = req.body

    const updatingComment = await Comment.findByPk(commentId)
    await updatingComment.update({
        comment: commentNew,
        commentId: commentId,
    })
    const newlyEditedComment = await Comment.findByPk(commentId)
    res.json(newlyEditedComment)

}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { commentId } = req.body;
    const deleteComment = await Comment.findByPk(commentId)
    await deleteComment.destroy()
    res.json(commentId)



}))


module.exports = router;
