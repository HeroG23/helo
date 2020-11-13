import axios from "axios";

const initialState = {
    username: '',
    profilePic: '',
    userId: 0
}

const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER="LOGOUT_USER";
const GET_USER="GET_USER";

export function updateUser(user) {
    return {
      type: UPDATE_USER,
      payload: user
    }
};

export function logoutUser(){
    return{
        type: LOGOUT_USER,
        payload: initialState
    }
};

export function getUser(){
    const user = axios.get('/api/user').then(res => res.data)
    return{
        type: GET_USER,
        payload: user
    }
};

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case UPDATE_USER:
          return { ...state, username: payload.username, profilePic: payload.profile_pic, userId: payload.id };
        case LOGOUT_USER:
          return {...state, ...payload}
        case GET_USER + "_Pending":
            return state
        case GET_USER + "_FULFILLED":
            return {...state, user: action.payload, isLoggedIn: true}
        case GET_USER + '_REJECTED':
            return initialState
        default:
            return state
    }
};