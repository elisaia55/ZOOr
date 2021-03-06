import { csrfFetch } from './csrf';

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const ADD_PHOTO = 'photo/ADD_PHOTO';
const DELETE_PHOTO = 'photo/DELETE_PHOTOS'
const GET_PHOTO = 'photo/GET_PHOTO'


// THUNK A.C
const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    photos
});

const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    photo
});

const deletePhoto = (photoId) => {
    return {
        type: DELETE_PHOTO,
        photoId
    }
}

const loadPhoto = (soloPhoto) => {
    return {
        type: GET_PHOTO,
        soloPhoto
    }
}


// THUNKS
export const getPhotos = () => async (dispatch) => {
    const res = await csrfFetch(`/api/photos`);
    const data = await res.json()
    dispatch(loadPhotos(data))
};

// export const getPhoto = (photoId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/photo`);
//     const data = await res.json()
// }


export const createPhoto = (photo) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos`, {
        method: "POST",
        body: JSON.stringify(photo)
    });
    const createdPhoto = await res.json();

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

export const deletePhotoThunk = (destroyedPhoto) => async (dispatch) => {
    const res = await csrfFetch('/api/photos', {
        method: "DELETE",
        body: JSON.stringify(destroyedPhoto)
    })
    const deletedPhoto = await res.json();
    dispatch(deletePhoto(deletedPhoto))
    return deletedPhoto
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
        case DELETE_PHOTO:
            const deleteState = { ...state }
            delete deleteState[action.photoId]
            return deleteState

        default:
            return state;
    }
};

export default photosReducer;
