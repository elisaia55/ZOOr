import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Likes.css'
import { addLikeThunk, getLikeThunk, deleteLikeThunk } from '../../store/like'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { famonke } from '@fortawesome/free-solid-svg-icons'


const Likes = ({ photoId }) => {
    let sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)

    let userId;
    if (sessionUser) {
        userId = sessionUser.id
    }
    useEffect(() => {
        const getLikes = async () => {
            const likes = await dispatch(getLikeThunk(photoId))
            const thisUser = likes.find(like => like.userId === userId)
            thisUser ? setLiked(true) : setLiked(false)
            const totalLikes = likes.length
            setTotalLikes(totalLikes)
        }
        getLikes()
    }, [dispatch, setTotalLikes, userId, photoId])

    const handleLike = async () => {
        if (liked) {
            const like = { userId, photoId }
            dispatch(deleteLikeThunk(like))
            setTotalLikes(totalLikes - 1)
        } else {
            setTotalLikes(totalLikes + 1)
            const like = { userId, photoId }
            dispatch(addLikeThunk(like))
        }
        setLiked(!liked)
    }

    return (
        <div>

            { sessionUser && <button onClick={ () => handleLike() } className={ 'button-unliked' }>{ !liked ? <i className="fa-regular fa-star"></i> : <i className="fa-solid fa-star"></i> }</button> } <p className='likeCount'></p>
            <div className="div-like">
            </div>


            { totalLikes }

        </div>
    )

}

export default Likes
