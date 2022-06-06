import { useEffect } from "react";
import { getPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import './Photos.css'
import { NavLink } from "react-router-dom";
import { useHistory, } from "react-router-dom";




export default function Photos() {
    const photos = useSelector(state => {
        return Object.values(state.photos)
    });
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    return (
        <>

            <div className="display-body">

                <ul id="photos-container">
                    { photos.map(photo => (
                        <li key={ photo.id } id='img-li'>
                            <img className="photos" onClick={ () => history.push(`photo/${photo.id}`) } src={ photo.photoUrl }></img>
                            <p className="image-text-hover">{ photo.content }, { photo.city } { photo.state }  </p>


                        </li>

                    )) }

                </ul>

            </div >
        </>
    )
}
