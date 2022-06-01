import './PhotoDetail.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { createComment, getPhotoComments } from '../../store/comment';

// import CommentForm from '../CommentForm'


const PhotoDetail = () => {

    const photoId = useParams().photoId;
    const photo = useSelector(state => state.photos)[photoId];
    const comments = useSelector(state => {
        return Object.values(state.comments)
    })

    const dispatch = useDispatch();
    const history = useHistory();
    let sessionUser = useSelector(state => state.session.user);

    const [commentDisplay, setCommentDisplay] = useState(false);
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getPhotoComments())
    }, [dispatch])


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

    if (!sessionUser) {
        sessionUser = { id: 2 }

    }

    const editHandler = photo => {
        history.push(`/photo/edit/${photo.id}`)
    }

    return (
        <>
            { photo &&
                <div id='photo-detail-container'>
                    <img id='photo-detail-img' src={ photo.photoUrl }></img>
                    { sessionUser && sessionUser.id === photo.userId && <button className='photo-detail-editBtn' onClick={ () => editHandler(photo) }>EDIT ICON</button> }
                    <div className='photo-detail-info'>
                        <h1 className='photo-detail-title'>{ photo.content }</h1>
                        <h2 className='photo-detail-date'>{ photo.createdAt }</h2>
                        <h3>

                            <NavLink to='/' className="photo-detail-location"> { photo.city }, { photo.state }  { photo.zipCode }</NavLink>
                        </h3>

                    </div>
                    <div className='comment-form-div'>
                        <p id='comments-title'>Comments</p>
                        <textarea onChange={ (e) => setComment(e.target.value) } id='comment-text'
                            type='text' placeholder='Leave a Comment Here' value={ comment }></textarea>
                        { !comments.length && <p>No Comments Yet</p> }
                        { comments.map(comment =>
                            <li key={ comment.id } className='comment-li'>
                                <ul className='comments-ul' >{ comment.comment }</ul>
                            </li>

                        ) }
                        <div className='confirm-btns'>
                            <button id='submit-commentBtn' onClick={ (e) => handleSubmit(e) }>SUBMIT COMMENT</button>
                        </div>

                    </div>

                </div>



            }
        </>
    )

}

export default PhotoDetail
