import './PhotoDetail.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import CommentForm from '../CommentForm'


const PhotoDetail = () => {

    const photoId = useParams().photoId;
    const photo = useSelector(state => state.photos)[photoId];

    const dispatch = useDispatch();
    const history = useHistory();
    let sessionUser = useSelector(state => state.session.user);

    const [commentDisplay, setCommentDisplay] = useState(false);

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

                </div>



            }
        </>
    )

}

export default PhotoDetail
