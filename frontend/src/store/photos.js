import { csrfFetch } from './csrf';

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';

const loadPhotos = (albumPage) => ({
    type: LOAD_PHOTOS,
    albumPage
});

// THUNK A.C

export const getPhotos = () => async (dispatch) => {
    const response = await csrfFetch(`/api/photos`);

    if (response.ok) {
        const albumPage = await response.json();
        dispatch(loadPhotos(albumPage));
    }
};

// REDUCER

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
        default:
            return state;
    }
};

export default photosReducer;
