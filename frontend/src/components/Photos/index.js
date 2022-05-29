import { useEffect } from "react";
import { getPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";

export default function Photos() {
    const photos = useSelector(state => {
        return Object.values(state.photos)
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    return (
        <div>
            TESTING
            { photos.map(photo => (
                <img src={ photo.photoUrl }></img>
            )) }
        </div>
    )
}
