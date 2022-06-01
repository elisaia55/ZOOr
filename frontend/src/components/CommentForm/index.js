import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/comment';
import './CommentForm.css'


const CommentForm = ({ photo, setCommentDisplay }) => {


    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([])

    let sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            comment,
            userId: sessionUser.id,
            photoId: photo.id
        }
        dispatch(createComment(newComment))
            .then(() => {

                setCommentDisplay(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    }

    const canceledHandler = (e) => {
        setCommentDisplay(false)
    }



    return (
        <div className='comment-container'>



        </div>
    )

}

export default CommentForm
