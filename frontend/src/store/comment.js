import { csrfFetch } from './csrf'

const ADD_COMMENT = 'comment/add'

const addComment = newComment => {
    return {
        type: ADD_COMMENT,
        newComment
    }
}

export const createComment = comment => async (dispatch) => {
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

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            let newState = { ...state }
            newState[action.newComment.id] = action.newComment
            return newState
        default:
            return state
    }

}

export default commentReducer;
