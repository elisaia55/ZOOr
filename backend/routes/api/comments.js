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

module.exports = router;
