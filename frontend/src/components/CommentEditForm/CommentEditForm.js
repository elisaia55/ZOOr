import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, destroyComment, } from '../../store/comment';


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
            <p className='comment-form-header'>EDIT COMMENT of { photo.content } </p>
            <form className='comment-form'>
                { errors.length > 0 &&
                    <ul>
                        { errors.map((error, idx) => <li key={ idx }>{ error }</li>) }
                    </ul>
                }
                <label>Comment</label>
                <textarea onChange={ (e) => setCommentNew(e.target.value) } id='new-comment-input' type='text' placeholder='New Comment Here' value={ commentNew }></textarea>
                <div className='comment-button-container'>
                    <button type='button' id='submission-buttons' onClick={ e => handleEditSubmit(e) }>COMMENT EDIT BUTTON</button>
                    <button type='button' id='submission-buttons' onClick={ e => deleteHandler(e) }>COMMENT DELETE BUTTON</button>
                    <button type='button' id='submission-buttons' onClick={ e => resetHandler(e) }>COMMENT RESET BUTTON</button>

                </div>
            </form>
        </div >




    )


}

export default CommentEditForm;
