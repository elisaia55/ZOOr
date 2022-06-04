import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/comment'

import './CommentForm.css'


const CommentForm = ({ photo, setDisplayComment }) => {

    const [comment, setComment] = useState('')
    let sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {

        e.preventDefault();


        const newComment = {
            comment,
            userId: sessionUser.id,
            photoId: photo.id
        }
        dispatch(createComment(newComment))
            .then(() => {

                setComment('')
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }, [dispatch, newComment])
        console.log("SUCCESFULLY POSTED", comment)
    }

    const resetHandler = (e) => {
        setDisplayComment(false)
    }

    return (
        <div className='comment-form-container'>
            <p className='comment-form-header'>EDIT COMMENT: </p>
            <form className='comment-form'>
                { errors.length > 0 &&
                    <ul>
                        { errors.map((error, idx) => <li key={ idx }>{ error }</li>) }
                    </ul>
                }
                <label>Comment</label>
                <textarea onChange={ (e) => setComment(e.target.value) } id='new-comment-input' type='text' placeholder='New Comment Here' defaultValue={ comment }></textarea>
                <div className='comment-button-container'>
                    <button type='button' id='submission-buttons' onClick={ e => handleSubmit(e) }>Post Comment</button>

                    <button type='button' id='submission-buttons' onClick={ e => resetHandler(e) }>SUBMIT Cancel</button>

                </div>
            </form>
        </div >
    )

}

export default CommentForm;
