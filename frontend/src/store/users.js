import { csrfFetch } from "./csrf";


const LOAD_USERS = '/users/load'

const loadUsers = users => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const getUsers = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/${commentId}`);
    if (res.ok) {
        const users = await res.json()
        dispatch(loadUsers(users))
    }
}


const UsersReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USERS:
            const newState = {}
            action.users.forEach(user => newState[user.id] = user)
            return newState
        default:
            return state
    }
}

export default UsersReducer;
