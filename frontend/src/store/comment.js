import { csrfFetch } from './csrf'

const ADD_COMMENT = 'comment/add'
const DELETE_COMMENT = 'comment/remove'
const LOAD_COMMENT = 'comment/load'

const addComment = newComment => {
    return {
        type: ADD_COMMENT,
        newComment
    }
}

const deleteComment = commentId => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const loadComments = comments => {
    return {
        type: LOAD_COMMENT,
        comments
    }
}

export const getPhotoComments = (photoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${photoId}`)
    if (res.ok) {
        const photoComments = await res.json()
        dispatch(loadComments(photoComments))
    }

}

export const createComment = (comment) => async (dispatch) => {
    const res = csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const newComment = await res.json()
        dispatch(addComment(newComment))
        return newComment
    }
}

export const editComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'PUT',
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const editedComment = await res.json()
        dispatch(addComment(editedComment))
        return editComment
    }
}

export const destroyComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',

    })
    if (res.ok) {

        dispatch(deleteComment(commentId))
    }
    return res
}

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            let newState = { ...state }
            newState[action.newComment.id] = action.newComment
            return newState
        case LOAD_COMMENT:
            let newLoadState = {}
            action.comments.map(comment => newLoadState[comment.id] = comment)
            return newLoadState
        case DELETE_COMMENT:
            let newDeleteState = { ...state }
            delete newDeleteState[action.commentId]
            return newDeleteState
        default:
            return state
    }

}

export default commentReducer;
