import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentEditForm from '../CommentEditForm'
import './CommentDisplay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'


const CommentDisplay = ({ comment, photo }) => {

    const allUsers = useSelector(state => state.users)
    const userComment = allUsers[comment.userId]
    const userCurr = useSelector(state => state.session.user)
    const [editCommentForm, setEditCommentForm] = useState(false)

    useEffect(() => { }, [comment])


    return (


        <div className='comment-form-div'>
            { userComment && <p className='comment-user'> { userComment.username }:</p> }
            <div className='comment-section-container'>
                { comment &&
                    <>
                        <p className='comment-text'>{ comment.comment }</p>
                    </>
                }
                { userCurr && userComment && userCurr.id === userComment.id && <button className='edit-formBtn' onClick={ () => setEditCommentForm(!editCommentForm) }><FontAwesomeIcon icon={ faPencil } /></button> }
                { editCommentForm && <CommentEditForm photo={ photo } comment={ comment } setEditCommentForm={ setEditCommentForm }></CommentEditForm> }

            </div>
        </div>
    )
}

export default CommentDisplay;
