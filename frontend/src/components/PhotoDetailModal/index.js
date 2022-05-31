
import { useEffect } from "react";
import { getPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import './PhotoDetailModal.css'

const singlePhoto = () => {

    const photoId = useParams().photoId
    const photo = useSelector(state => state.photos)[photoId]
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();

    if (!sessionUser) sessionUser = { id: 1 }

    const dispatch = useDispatch();

    const editHandle = photo => {
        history.push(`/photo/edit/${photo.id}`)
    }

    return (
        <>
            <div>
                test
            </div>

        </>
    )
}
