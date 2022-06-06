import './PhotoDetail.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getPhotoComments } from '../../store/comment';
import Likes from '../Likes'
import CommentForm from '../CommentForm'
import CommentDisplay from '../CommentDisplay'
import { getUsers } from '../../store/users'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, } from '@fortawesome/free-solid-svg-icons'


const PhotoDetail = () => {


    const photoId = useParams().photoId;
    const photo = useSelector(state => state.photos)[photoId];
    let sessionUser = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments))

    const [displayComment, setDisplayComment] = useState(false)



    const history = useHistory();
    const dispatch = useDispatch();

    const photographers = Object.values(useSelector(state => state.users))
    let photographer;

    if (photographer && photo && photographers.length > 0) {
        photographer = photographers.find(photographer => photographer.id === photo.userId)
    }

    useEffect(() => { dispatch(getPhotoComments()) }, [dispatch])

    useEffect(() => { dispatch(getUsers()) }, [dispatch])

    let commentsArray = [];

    if (comments && photo && comments.length > 0) {

        commentsArray = comments.filter(comment => { return comment.photoId === photo.id })
    }

    if (!sessionUser) {
        sessionUser = { id: 0 }

    }




    const editHandler = (photo) => {
        history.push(`/photo/edit/${photo.id}`)
    }



    return (
        <>
            { photo &&
                <div className='single-photo-container'>



                    <div className='displayed-photo'>
                        <img id='photo-detail-img' src={ photo.photoUrl }></img>
                        { sessionUser.id === photo.userId && <button className='photo-detail-editBtn' onClick={ () => editHandler(photo) }><FontAwesomeIcon icon={ faPenToSquare } /></button> }
                    </div>


                    <div className='photo-details'>
                        <h1 className='photo-detail-title'> { photo.content } </h1>
                        <p className='photo-detail-date'>Taken on { photo.createdAt }</p>
                        <p><NavLink to='/' className="photo-detail-location"> { photo.city }, { photo.state } { photo.zipCode }</NavLink></p>
                        <Likes photoId={ photoId } />
                    </div>

                    <div className='add-comment-form'>
                        { sessionUser.id && <CommentForm setDisplayComment={ setDisplayComment } photo={ photo } /> }
                        {/* { comments && displayComment && <CommentForm setDisplayComment={ setDisplayComment } photo={ photo } /> } */ }
                    </div>


                    <div className='comment-section'>

                        <h3 id='comments-header'></h3>
                        { (!commentsArray.length) && <p>No Comments...</p> }
                        { commentsArray && commentsArray.length && [...commentsArray].reverse().map(comment => <CommentDisplay key={ comment.id } photo={ photo } comment={ comment } />) }


                    </div>







                </div>
            }
        </>
    )

}

export default PhotoDetail
