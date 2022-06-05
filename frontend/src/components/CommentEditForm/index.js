import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, destroyComment, } from '../../store/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'


const CommentEditForm = ({ photo, comment, setEditCommentForm }) => {
    const [commentNew, setCommentNew] = useState(comment.commentNew)
    let sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);



    const handleEditSubmit = (e) => {
        e.preventDefault()

        const newestComment = {
            commentId: comment.id,
            commentNew,
            userId: sessionUser.id,
            photoId: photo.id

        }
        console.log("PLEASE WORK PLEASSEEE", newestComment)

        dispatch(editComment(newestComment))
            .then(() => {
                setEditCommentForm(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    }

    const deleteHandler = (e) => {
        e.preventDefault()

        dispatch(destroyComment(comment.id))
            .then(() => {
                setEditCommentForm(false)

            })
    }


    const resetHandler = (e) => {
        setEditCommentForm(false)
    }




    return (

        <div className='comment-form-container'>
            <p className='comment-form-header'> </p>
            <form className='comment-form'>
                { errors.length >= 0 &&
                    <ul>
                        { errors.map((error, idx) => <li className='errors' key={ idx }>{ error }</li>) }
                    </ul>
                }

                <textarea onChange={ (e) => setCommentNew(e.target.value) } id='new-comment-input' type='text' placeholder={ comment.comment } defaultValue={ commentNew }></textarea>
                <div className='comment-button-containers'>
                    <button type='button' id='submission-edit-buttons' className='edit-comment-btns' onClick={ e => handleEditSubmit(e) }><FontAwesomeIcon icon={ faPenToSquare } /></button>
                    <button type='button' id='submission-reset-buttons' className='edit-comment-btns' onClick={ e => resetHandler(e) }><FontAwesomeIcon icon={ faRotate } /></button>
                    <button type='button' id='submission-delete-buttons' className='edit-comment-btns' onClick={ e => deleteHandler(e) }><FontAwesomeIcon icon={ faTrashCan } /></button>

                </div>
            </form>
        </div >




    )


}

export default CommentEditForm;
