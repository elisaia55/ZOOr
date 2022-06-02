import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editComment, getPhotoComments } from "../../store/comment";
import './EditCommentModal.css'


const EditCommentModal = ({ comments }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allComments = useSelector(state => state.comments)
    const editCommentId = useParams().commentId;
    const editingComment = allComments[editCommentId] || {};
    let sessionUser = useSelector((state) => state.session.user)

    const [comment, setComment] = useState(editingComment.comment || '');

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = sessionUser.id;

        const newlyEditedComment = {
            id: editingComment.id,
            userId,
            comment
        }
        dispatch(editComment(newlyEditedComment))

            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    }

    useEffect(() => {
        dispatch(getPhotoComments())
    }, [dispatch])



    return (
        <div id="edit-comment-modal-body">
            <h1 id="edit-comment-title">Edit Comment </h1>
            <form id="edit-comment-form" onSubmit={ handleSubmit }>
                <ul>
                    { (errors.length) ? (errors.map((error, idx) => (
                        <li key={ idx }>{ error }</li>
                    ))) : null }
                </ul>
                <label>Comment:</label>
                <input
                    name="comment"
                    value={ comment }
                    onChange={ e => setComment(e.target.value) }
                    type="text"
                    placeholder="New Comment"
                />
                <button id="edit-comment-submit" type="submit">
                    Confirm Change
                </button>


            </form>
        </div>
    )


}

export default EditCommentModal;
