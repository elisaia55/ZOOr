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
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
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
            lat,
            lng
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
                <ul>
                    { errors.map((error, idx) => <li className="errors" key={ idx }>{ error }</li>) }
                </ul>
                <label>Title:</label>
                <input
                    name='title'
                    value={ content }
                    onChange={ e => setContent(e.target.value) }
                    type="text"
                    placeholder="Title your photo"
                />
                <label>Picture URL:</label>
                <input
                    name="photoUrl"
                    type='text'
                    value={ photoUrl }
                    onChange={ e => setPhotoUrl(e.target.value) }
                    placeholder='Image Url'
                />
                <label>State:</label>
                <input
                    name="state"
                    type='text'
                    value={ state }
                    onChange={ e => setState(e.target.value) }
                    placeholder='State of Photo'
                />
                <label>City:</label>
                <input
                    name="city"
                    type='text'
                    value={ city }
                    onChange={ e => setCity(e.target.value) }
                    placeholder='City of Photo'
                />
                <label>ZipCode:</label>
                <input
                    name="zipcode"
                    type='text'
                    value={ zipCode }
                    onChange={ e => setZipcode(e.target.value) }
                    placeholder='Photo Zipcode'
                />
                <label>Latitude:</label>
                <input
                    name="latitude"
                    type='text'
                    value={ lat }
                    onChange={ e => setLat(e.target.value) }
                    placeholder='Photo Latitude'
                />
                <label>Longitude:</label>
                <input
                    name="longitude"
                    type='text'
                    value={ lng }
                    onChange={ e => setLng(e.target.value) }
                    placeholder='Photo Longitude'
                />
                <button id="newPhoto-form-submit" type="submit">Submit</button>



            </form>

        </>
    )
}

export default NewPhotoForm;
