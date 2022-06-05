import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Likes.css'
import { addLikeThunk, getLikeThunk, deleteLikeThunk } from '../../store/likes'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { famonke } from '@fortawesome/free-solid-svg-icons'


const Likes = ({ photoId }) => {
    let sessionUser = useSelector(state => state.session.user);
    let userId
    if (sessionUser) {
        userId = sessionUser.id
    }

    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)

    useEffect(() => {
        const getLikes = async () => {
            const likes = await dispatch(getLikeThunk(photoId))
            const thisUser = likes.find(like => like.userId === userId)
            thisUser ? setLiked(true) : setLiked(false)
            const totalLikes = likes.length
            setTotalLikes(totalLikes)
        }
        getLikes()
    }, [dispatch, setTotalLikes, photoId, userId])

    const handleLike = async () => {
        if (liked) {
            const like = { photoId, userId }
            dispatch(deleteLikeThunk(like))
            setTotalLikes(totalLikes - 1)
        } else {
            setTotalLikes(totalLikes + 1)
            const like = { photoId, userId }
            dispatch(addLikeThunk(like))
        }
        setLiked(!liked)
    }

    return (
        <div className="div-like">

            { sessionUser && <button onClick={ () => handleLike() } className={ 'button-unliked' }>{ !liked ? <i class="fa-regular fa-star"></i> : <i class="fa-solid fa-star"></i> }</button> } <p className='likeCount'>{ totalLikes }</p>

        </div>
    )

}

export default Likes
