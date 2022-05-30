import { csrfFetch } from './csrf';

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const ADD_PHOTO = 'photos/ADD_PHOTOS';


// THUNK A.C
const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    photos
});

const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    photo
});



export const getPhotos = () => async (dispatch) => {
    const res = await csrfFetch(`/api/photos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }

    });
    const data = await res.json()
    dispatch(loadPhotos(data))
};

export const createPhoto = (photo) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(photo)
    });
    const createdPhoto = await res.json();
    console.log("CREATED PHOTO REACHED -------------", createPhoto)
    if (createdPhoto) {
        dispatch(addPhoto(createdPhoto))
    }
    return createdPhoto
}

export const editPhotoThunk = (editPhoto) => async (dispatch) => {
    const res = await csrfFetch('/api/photos', {
        method: "PUT",
        body: JSON.stringify(editPhoto)
    })
    const editedPhoto = await res.json()
    if (editPhoto) {
        dispatch(addPhoto(editPhoto))
    }
    return editedPhoto
}


// REDUCER

const photosReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PHOTOS:
            const newState = {};
            action.photos.forEach(photo => newState[photo.id] = photo);
            return newState
        case ADD_PHOTO:
            return { ...state, [action.photo.id]: action.photo }

        default:
            return state;
    }
};

export default photosReducer;
