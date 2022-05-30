import { csrfFetch } from './csrf';

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const ADD_PHOTO = 'photos/ADD_PHOTOS';


// THUNK A.C
const loadPhotos = (albumPage) => ({
    type: LOAD_PHOTOS,
    albumPage,
});

const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    payload: photo,
});



export const createPhoto = (photo) => async dispatch => {
    const response = await csrfFetch(`/api/photos`, {
        method: "POST",
        body: JSON.stringify(photo)
    });
    const newPhoto = await response.json();
    if (newPhoto) {

        dispatch(addPhoto(newPhoto))
        return newPhoto
    }
}


export const getPhotos = () => async (dispatch) => {
    const response = await csrfFetch(`/api/photos`);

    if (response.ok) {
        const albumPage = await response.json();
        dispatch(loadPhotos(albumPage));
    }
};

// REDUCER

const initialState = { photos: null, users: null }

const photosReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PHOTOS:
            const displayPhotos = {};
            action.albumPage.forEach((photo) => {
                displayPhotos[photo.id] = photo;
            });
            return {
                ...displayPhotos,
                ...state,
            };
        case ADD_PHOTO:
            const newAddPhotoState = {}
            newAddPhotoState = { ...state, [action.id]: action }
            return newAddPhotoState
        default:
            return state;
    }
};

export default photosReducer;
