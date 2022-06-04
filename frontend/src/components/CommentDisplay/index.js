import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentEditForm from '../CommentEditForm'

const CommentDisplay = ({ comment, photo }) => {

    const allUsers = useSelector(state => state.users)
    const userComment = allUsers[comment.userId]
    const userCurr = useSelector(state => state.session.user)
    const [editCommentForm, setEditCommentForm] = useState(false)

    useEffect(() => { }, [comment])


    return (


        <div className='comment-form-div'>
            { userComment && <p className='comment-user'>TAKEN BY:{ userComment.username }</p> }
            { comment &&
                <>
                    <p className='comment-text'>{ comment.comment }</p>
                </>
            }
            { userCurr && userComment && userCurr.id === userComment.id && <button className='edit-formBtn' onClick={ () => setEditCommentForm(!editCommentForm) }>EDIT COMMENT BUTTON</button> }
            { editCommentForm && <CommentEditForm photo={ photo } comment={ comment } setEditCommentForm={ setEditCommentForm }></CommentEditForm> }
        </div>
    )
}

export default CommentDisplay;
