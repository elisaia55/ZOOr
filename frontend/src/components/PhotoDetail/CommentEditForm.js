import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, destroyComment } from '../../store/comment';


const CommentEditForm = ({ comment, photo, setEditCommentForm }) => {
    const [newComment, setNewComment] = useState('')
    let sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);



    const handleEditSubmit = (e) => {
        e.preventDefault()

        const editedComment = {
            commentId: comment.id,
            newComment,
            userId: sessionUser.id,
            photoId: photo.id
        }
        dispatch(editComment(editedComment))
            .then(() => {
                setEditCommentForm(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.erros) setErrors(data.errors)
            })
    }

    const destroyHandler = (e) => {
        e.preventDefault()

        dispatch(destroyComment(comment))
            .then(() => {
                setEditCommentForm(false)
            })
    }

    const resetHandler = (e) => {

        setEditCommentForm(false)
    }

    return (

        <div className='comment-form-container'>
            <p className='comment-form-header'>EDIT COMMENT : { comment }</p>
            <div className='comment-form'>
                { errors.length > 0 &&
                    <ul>
                        { errors.map((error, idx) => <li key={ idx }>{ error }</li>) }
                    </ul>
                }
                <label>Comment</label>
                <textarea onChange={ e => setNewComment(e.target.value) } id='new-comment-input' type='text' placeholder='New Comment Here' value={ comment }></textarea>
                <div className='comment-button-container'>
                    <button type='button' id='submission-buttons' onClick={ e => handleEditSubmit(e) }>EDIT</button>
                    <button type='button' id='submission-buttons' onClick={ e => destroyHandler(e) }>DELETE</button>
                    <button type='button' id='submission-buttons' onClick={ e => resetHandler(e) }>Cancel</button>

                </div>
            </div>
        </div>




    )


}

export default CommentEditForm
