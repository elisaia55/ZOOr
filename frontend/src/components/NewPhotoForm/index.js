import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './NewPhotoForm.css'
import { createPhoto } from "../../store/photos";

const NewPhotoForm = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [content, setContent] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipcode] = useState('');

    const [errors, setErrors] = useState([])

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!sessionUser) {
            history.push('/signup')
        }
    }, [])

    const handleOnSubmit = async (e) => {
        e.preventDefault();


        const userId = sessionUser.id
        const newPhoto = {
            userId,
            content,
            photoUrl,
            state,
            city,
            zipCode,
        }
        dispatch(createPhoto(newPhoto))
            .then(() => history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

    }

    if (!sessionUser) return <Redirect to='/signup' />

    return (
        <>
            <form id='newPhoto-form' onSubmit={ e => handleOnSubmit(e) }>
                <h1>Add New Photo</h1>
                <div className='errors-container'>
                    <ul>
                        { errors.map((error, idx) => <li className="errors" key={ idx }>{ error }</li>) }
                    </ul>

                </div>
                <label className='add-photo-label'>Title:</label>
                <input
                    className="add-photo-input"
                    name='title'
                    value={ content }
                    onChange={ e => setContent(e.target.value) }
                    type="text"
                    placeholder="Title your photo"
                />
                <label className='add-photo-label'>Picture URL:</label>
                <input
                    className="add-photo-input"
                    name="photoUrl"
                    type='text'
                    value={ photoUrl }
                    onChange={ e => setPhotoUrl(e.target.value) }
                    placeholder='Image Url'
                />
                <label className='add-photo-label'>State:</label>
                <input
                    className="add-photo-input"
                    name="state"
                    type='text'
                    value={ state }
                    onChange={ e => setState(e.target.value) }
                    placeholder='State of Photo'
                />
                <label className='add-photo-label'>City:</label>
                <input
                    className="add-photo-input"
                    name="city"
                    type='text'
                    value={ city }
                    onChange={ e => setCity(e.target.value) }
                    placeholder='City of Photo'
                />
                <label className='add-photo-label'>ZipCode:</label>
                <input
                    className="add-photo-input"
                    name="zipcode"
                    type='text'
                    value={ zipCode }
                    onChange={ e => setZipcode(e.target.value) }
                    placeholder='Photo Zipcode'
                />

                <button id="newPhoto-form-submit" type="submit">Submit</button>



            </form>

        </>
    )
}

export default NewPhotoForm;
