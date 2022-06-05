import { csrfFetch } from "./csrf";

const LOAD_LIKES = '/like/get'
const ADD_LIKES = '/like/create'
const DELETE_LIKE = '/like/delete'

const createLike = like => {
    return {
        type: ADD_LIKES,
        like
    }
}

const deleteLike = likeId => {
    return {
        type: DELETE_LIKE,
        likeId
    }
}

const getLikes = likes => {
    return {
        type: LOAD_LIKES,
        likes
    }
}

export const deleteLikeThunk = like => async dispatch => {
    const res = await csrfFetch('/api/likes', {
        method: "DELETE",
        boody: JSON.stringify(like)
    })
    const deleteResultId = await res.json()
    dispatch(deleteLike(deleteResultId))
}

export const addLikeThunk = like => async dispatch => {
    const res = await csrfFetch('/api/likes', {
        method: "POST",
        body: JSON.stringify(like)
    })
    const newLike = await res.json()
    dispatch(createLike(newLike))
}

export const getLikeThunk = photoId => async dispatch => {
    const res = await csrfFetch(`/api/likes/${photoId}`)
    console.log({ photoId }, "======================> GET THUNK")
    const likes = await res.json()
    dispatch(getLikes(likes))
    return likes
}

const likesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_LIKES:
            let newState = {}
            action.likes.forEach(like => newState[like.id] = like)
            return newState
        case ADD_LIKES:
            let newCreateState = { ...state }
            newCreateState[action.like.id] = action.like
            return newCreateState
        case DELETE_LIKE:
            let newDeleteState = { ...state }
            delete newDeleteState[action.likeId]
            return newDeleteState
        default:
            return state
    }
}

export default likesReducer
