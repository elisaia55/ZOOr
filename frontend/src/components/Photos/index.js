import { useEffect } from "react";
import { getPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import './Photos.css'
import { NavLink } from "react-router-dom";



export default function Photos({ photo }) {
    const photos = useSelector(state => {
        return Object.values(state.photos)
    });
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

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
                            <div className="photo-title">{ photo.content }</div>
                            <div className="created">{ photo.createdAt }</div>
                            <NavLink to='/' className="location"> { photo.city }, { photo.state }  { photo.zipCode }</NavLink>
                            { sessionUser && <NavLink to='/photo/edit/:photoId'>edit</NavLink> }
                        </li>

                    )) }

                </ul>

            </div >
        </>
    )
}
