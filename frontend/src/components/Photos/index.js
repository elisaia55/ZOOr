import { useEffect } from "react";
import { getPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import './Photos.css'



export default function Photos() {
    const photos = useSelector(state => {
        return Object.values(state.photos)
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    return (
        <div className="photo-image-display">
            <h1 className="Title">Zooer Photo Gallery</h1>
            { photos.map(photo => (
                <img className="image-photo" src={ photo.photoUrl } alt={ photo.content }></img>


            )) }

        </div>
    )
}
