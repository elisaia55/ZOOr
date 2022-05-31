import { useEffect } from "react";
import { getPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import './Photos.css'
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";



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
            <h1 className="h1-title">Zooer Photo Gallery</h1>
            <div className="display-body">
                <ul id="photos-container">
                    { photos.map(photo => (
                        <li key={ photo.id } className='img-li'>
                            <img className="photos" src={ photo.photoUrl }></img>
                            <li className="photo-title">{ photo.content }</li>
                            <li className="created">{ photo.createdAt }</li>
                            <NavLink to='/' className="location"> { photo.city }, { photo.state }  { photo.zipCode }</NavLink>
                            { sessionUser && sessionUser.id && <NavLink to={ `/photo/edit/${Photos.id}` }>edit</NavLink> }
                        </li>

                    )) }

                </ul>

            </div >
        </>
    )
}
