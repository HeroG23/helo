const initialState = {
    username: '',
    profilePic: '',
    userId: '',
}

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER="LOGOUT_USER";

export function loginUser(username, profilePic, userId) {
    return {
      type: LOGIN_USER,
      payload: {username, profilePic, userId}
    }
};

export function logoutUser(){
    return{
        type: LOGOUT_USER,
        payload: initialState
    }
};


export default function reducer(state = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
          return { ...state, username: action.payload.username, profilePic: action.payload.profilePic, userId: action.payload.userId };
        case LOGOUT_USER:
          return {...state, ...action.payload}
        default:
            return state
    }
};