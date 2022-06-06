import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhotoThunk, editPhotoThunk } from '../../store/photos';
import './EditPhoto.css'
import { getPhotos } from "../../store/photos";


const EditPhotoForm = () => {
    const photoId = useParams().photoId;
    const photo = useSelector(state => state.photos)[photoId];
    const allPhotos = useSelector(state => state.photos)
    const editPhotoId = useParams().photoId
    const editPhoto = allPhotos[editPhotoId] || {};
    const sessionUser = useSelector((state) => state.session.user);
    const [content, setContent] = useState(editPhoto.content || '');
    const [photoUrl, setPhotoUrl] = useState(editPhoto.photoUrl || '');
    const [state, setState] = useState(editPhoto.state || '');
    const [city, setCity] = useState(editPhoto.city || '');
    const [zipCode, setZipcode] = useState(editPhoto.zipCode || '');


    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!sessionUser || sessionUser.id !== editPhoto.userId) {
            history.push('/')
        }
    }, [])

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionUser.id;

        const editingPhoto = {
            id: editPhoto.id,
            userId,
            content,
            photoUrl,
            state,
            city,
            zipCode,

        }
        dispatch(editPhotoThunk(editingPhoto))
            .then(() => history.push(`/photo/${photoId}`))
            .catch(async (res) => {
                const data = await res.json()
                if (data && errors) setErrors(data.errors)
            })
    }

    const deleteHandler = (e, photo) => {
        e.preventDefault()
        dispatch(deletePhotoThunk(editPhoto))
            .then(() => history.push('/'))
    }

    return (
        <>
            <div className='edit-photoPage-container'>

                <form id='edit-photo-form' onSubmit={ e => handleOnSubmit(e) }>
                    <div className='errors-container'>

                        <ul>
                            { errors.map((error, idx) => <li className='errors' key={ idx }>{ error }</li>) }
                        </ul>
                    </div>
                    <div className='photo-form-edit-container'>


                        <label className='edit-photo-labels'>Title:</label>
                        < input className="edit-photo-inputs"
                            name='title'
                            value={ content }
                            onChange={ e => setContent(e.target.value) }
                            type="text"
                            placeholder="Title your photo"
                        />
                        <label className='edit-photo-labels'>Picture URL:</label>
                        < input className="edit-photo-inputs"
                            name="photoUrl"
                            type='text'
                            value={ photoUrl }
                            onChange={ e => setPhotoUrl(e.target.value) }
                            placeholder='Image Url'
                        />
                        <label className='edit-photo-labels'>State:</label>
                        < input className="edit-photo-inputs"
                            name="state"
                            type='text'
                            value={ state }
                            onChange={ e => setState(e.target.value) }
                            placeholder='State of Photo'
                        />
                        <label className='edit-photo-labels'>City:</label>
                        < input className="edit-photo-inputs"
                            name="city"
                            type='text'
                            value={ city }
                            onChange={ e => setCity(e.target.value) }
                            placeholder='City of Photo'
                        />
                        <label className='edit-photo-labels'>ZipCode:</label>
                        < input className="edit-photo-inputs"
                            name="zipcode"
                            type='text'
                            value={ zipCode }
                            onChange={ e => setZipcode(e.target.value) }
                            placeholder='Photo Zipcode'
                        />
                        <div className='edit-btns'>
                            <button className='photo-detail-btns' id="editPhoto-btn" type="submit">Submit</button>

                            <button className='photo-detail-btns' onClick={ (e) => deleteHandler(e, editPhoto) }>Delete Photo</button>

                        </div>
                        <div className='editing-photo-details'>

                        </div>

                        <div className='editing-photo-display'>
                            <img className='editing-img-display'  ></img>

                        </div>
                        <div className='extra'>

                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default EditPhotoForm
