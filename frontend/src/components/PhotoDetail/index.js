import './PhotoDetail.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { createComment, destroyComment, getPhotoComments } from '../../store/comment';
import { editComment } from '../../store/comment'
import CommentEditForm from './CommentEditForm'



const PhotoDetail = () => {

    const users = Object.values(useSelector(state => state.users))
    const photoId = useParams().photoId;
    const photo = useSelector(state => state.photos)[photoId];
    const comments = Object.values(useSelector(state => state.comments))


    const [editCommentForm, setEditCommentForm] = useState(false)


    // edit Comment






    const userId = useSelector(state => state.users)

    let sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])

    const params = useParams()
    const { commentId } = params





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

    useEffect(() => {
        dispatch(getPhotoComments(photoId))
    }, [comment])


    if (!sessionUser) {
        sessionUser = { id: 0 }

    }

    const editHandler = (e) => {
        history.push(`/photo/edit/${photo.id}`)
    }

    return (
        <>
            { photo &&
                <div id='page-container'>
                    <img id='photo-detail-img' src={ photo.photoUrl }></img>
                    <div id='photo-detail-container'>
                        { sessionUser && sessionUser.id === photo.userId && <button className='photo-detail-editBtn' onClick={ () => editHandler(photo) }>EDIT ICON</button> }

                        <div className='photo-detail-info'>
                            <hr className='photo-detail-hr'></hr>
                            <h1 className='photo-detail-title'>{ photo.content }</h1>
                            <h2 className='photo-detail-date'>{ photo.createdAt }</h2>
                            <h3>

                                <NavLink to='/' className="photo-detail-location"> { photo.city }, { photo.state }  { photo.zipCode }</NavLink>
                            </h3>

                        </div>

                    </div>
                    <div className='comment-form-div'>
                        <p id='comments-title'>Comments</p>
                        <hr className='photo-detail-hr'></hr>
                        <div id='comment-input-div'>

                            <form onSubmit={ handleSubmit } className='comment-form'>
                                { errors.length > 0 &&
                                    <ul>
                                        { errors.map((error, idx) => <li key={ idx }>{ error }</li>) }
                                    </ul>
                                }
                                <textarea onChange={ (e) => setComment(e.target.value) } id='comment-text'
                                    placeholder='Leave a Comment Here' value={ comment }>

                                </textarea>
                                <button type='button' id='submit-commentBtn' onClick={ (e) => handleSubmit(e) }>SUBMIT COMMENT</button>

                                <div id='comment-section-div'>
                                    { !comments.length && <p>No Comments Yet</p> }
                                    { (comments.length) && comments.map(comment =>
                                        <li key={ comment.commentId } className='comment-li'>

                                            <p className='comments-ul' >{ comment.comment } --- { comment.userId }</p>
                                            { sessionUser.id == comment.userId && <button type="button" onClick={ () => setEditCommentForm((!editCommentForm)) }>EDIT COMMENT</button> }
                                            { sessionUser.id == comment.userId && editCommentForm && <CommentEditForm setEditCommentForm={ setEditCommentForm } /> }






                                        </li>
                                    ) }

                                </div>
                            </form>

                        </div>
                        <div className='confirm-btns'>
                        </div>



                    </div>

                </div>



            }
        </>
    )

}

export default PhotoDetail
