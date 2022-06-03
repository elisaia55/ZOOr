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
        .withMessage('Please Leave a Comment'),
    handleValidationErrors
];

router.post('/', validateComment, requireAuth, asyncHandler(async (req, res) => {

    console.log('ENTERED ROUTE')
    const buildComment = await Comment.create(req.body)
    // console.log('ENTERED ROUTE')
    // const newComment = await buildComment.save()
    return res.json(buildComment)
}));

router.get('/:photoId', asyncHandler(async (req, res) => {
    const { photoId } = req.params


    const comments = await Comment.findAll({ where: { photoId } })

    console.log("ENTERED THE GET ROUTE FOR COMMMENTS +++++++", comments)
    res.json(comments)
}))

router.put('/', requireAuth, asyncHandler(async (req, res) => {
    // const { commentId, comment } = req.body;
    // console.log("ENTERED EDIT FOR COMMENTS ---------------------------------->", commentId, comment)

    const {
        id,
        commentId,
        comment
    } = req.body

    console.log("EDITTTTTTTTTTTTTTTTTTTTTTT", commentId, comment, id, req.body)
    const updateComment = await Comment.findByPk(id)
    const editedComment = await updateComment.update(req.body.userId)

    return res.json(editedComment)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    // const { commentId } = req.body
    console.log("ENTERED DELETE ROUTER+++++++++++++++++++++++", req.body.id)
    const deleteComment = await Comment.findByPk(req.body.id)

    if (deleteComment) {
        await deleteComment.destroy()
        res.json({ message: "Deleted" })
    } else {
        res.json({ message: "Failed" })

    }
}))


module.exports = router;
