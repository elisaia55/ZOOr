import './PhotoDetail.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { createComment, getPhotoComments } from '../../store/comment';
import { editComment } from '../../store/comment'
import { Modal } from '../../context/Modal'
import EditCommentModal from './EditCommentModal'

// import CommentForm from '../CommentForm'


const PhotoDetail = ({ setEditCommentForm }) => {

    const [showModal, setShowModal] = useState(false);

    const photoId = useParams().photoId;
    const photo = useSelector(state => state.photos)[photoId];
    const comments = Object.values(useSelector(state => state.comments))

    const getUsers = useSelector(state => state.users)
    const userComment = getUsers[comments.userId]
    let sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const [commentDisplay, setCommentDisplay] = useState(false);
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])


    if (!sessionUser) {
        alert("Please sign in to leave a comment")
    }

    const handleSubmit = (e) => {

        e.preventDefault();


        const newComment = {
            comment,
            userId: sessionUser.id,
            photoId: photo.id
        }
        dispatch(createComment(newComment))
            .then(() => {

                setCommentDisplay(true)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })

        console.log("SUCCESFULLY POSTED", comment)
    }

    useEffect(() => {
        dispatch(getPhotoComments(photoId))
    }, [dispatch, photoId])


    if (!sessionUser) {
        sessionUser = { id: 0 }

    }

    const editHandler = (e) => {
        e.preventDefault();

        const newEditedComment = {
            commentId: comment.id,
            comment,
            userId: sessionUser.id,
            photoId: photo.id
        }
        dispatch(editComment(newEditedComment))
            .then(() => {
                setEditCommentForm(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    }

    return (
        <>
            { photo &&
                <div id='page-container'>
                    <img id='photo-detail-img' src={ photo.photoUrl }></img>
                    <div id='photo-detail-container'>
                        { sessionUser && sessionUser.id === photo.userId && <button className='photo-detail-editBtn' onClick={ e => editHandler(photo) }>EDIT ICON</button> }
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
                            <ul>
                                { (errors.length) ? (errors.map((error, idx) => (
                                    <li key={ idx }>{ error }</li>
                                ))) : <></> }
                            </ul>
                            <textarea onChange={ (e) => setComment(e.target.value) } id='comment-text'
                                placeholder='Leave a Comment Here' value={ comment }>

                            </textarea>

                            <div id='comment-section-div'>
                                { !comments.length && <p>No Comments Yet</p> }
                                { (comments.length) && comments.map(comment =>
                                    <li key={ comment.id } className='comment-li'>

                                        <p className='comments-ul' >{ comment.comment } --- { comment.userId }</p>
                                        { sessionUser.id === comment.userId && <button onClick={ () => setShowModal(true) }>EDIT COMMENT</button> }

                                        { showModal && <Modal onClose={ () => setShowModal(false) }><EditCommentModal /></Modal> }



                                    </li>
                                ) }

                            </div>

                        </div>
                        <div className='confirm-btns'>
                            <button type='submit' id='submit-commentBtn' onClick={ (e) => handleSubmit(e) }>SUBMIT COMMENT</button>
                        </div>



                    </div>

                </div>



            }
        </>
    )

}

export default PhotoDetail