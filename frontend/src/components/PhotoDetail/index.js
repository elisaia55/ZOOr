import './PhotoDetail.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getPhotoComments } from '../../store/comment';

import CommentForm from '../CommentForm'
import CommentDisplay from '../CommentDisplay'
import { getUsers } from '../../store/users'



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




    const editHandler = photo => {
        history.push(`/photo/edit/${photo.id}`)
    }



    return (
        <div className='photo-single-container'>

            { photo &&
                <div id='page-container'>
                    <img id='photo-detail-img' src={ photo.photoUrl }></img>
                    <div id='photo-detail-container'>

                        <div className='photo-detail-info'>
                            <hr className='photo-detail-hr'></hr>
                            <h1 className='photo-detail-title'>{ photo.content } by { }</h1>
                            <h2 className='photo-detail-date'>{ photo.createdAt }</h2>
                            <h3><NavLink to='/' className="photo-detail-location"> { photo.city }, { photo.state } { photo.zipCode }</NavLink></h3>
                            { sessionUser.id === photo.userId && <button className='photo-detail-editBtn' onClick={ () => editHandler(photo) }>EDIT PHOTO DETAILS</button> }
                            { sessionUser.id && <button onClick={ () => setDisplayComment(!displayComment) } className="comment-btn">COMMENT HERE</button> }
                        </div>
                        <div>

                            { comments && displayComment && <CommentForm setDisplayComment={ setDisplayComment } photo={ photo } /> }
                        </div>

                    </div>
                    <div className='comment-section-div'>
                        <h3 id='comments-header'>Comments</h3>
                        { (!commentsArray.length) && <p>No Comments...</p> }
                        { commentsArray && commentsArray.length && commentsArray.map(comment => <CommentDisplay key={ comment.id } photo={ photo } comment={ comment } />) }
                    </div>
                </div>





            }

        </div>
    )

}

export default PhotoDetail
