import { csrfFetch } from "./csrf";

const SEARCH_PHOTOS = "search/SEARCH_PHOTOS"

const searchPhotos = (photos) => {
    return {
        type: SEARCH_PHOTOS,
        payload: photos,
    }
}


export const searchPhotosThunk = (results, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/search/photos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ results, userId })
    })

    const data = await res.json();
    dispatch(searchPhotos(data))
}

const initialState = {};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PHOTOS:
            return { ...state, photos: action.payload.photos };
        default:
            return state;
    }
}

export default searchReducer
