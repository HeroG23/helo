const initialState = {
    username: '',
    profilePic: '',
    userId: 0
  }
  
  const UPDATE_USER = 'UPDATE_USER';
  const LOGOUT_USER = 'LOGOUT_USER';
  
  
  export function updateUser(user) {
      return {
          type: UPDATE_USER,
          payload: user
        }
    }
    
    export function logoutUser() {
        return {
            type: LOGOUT_USER,
            payload: initialState
        }
    }
    export default function (state = initialState, action) {
        let { type, payload } = action;
        switch (type) {
            case UPDATE_USER:
                return { ...state, username: payload.username, profilePic: payload.profile_pic, userId: payload.id };
            case LOGOUT_USER:
                return {...state, ...payload};
            default:
                return state;
                          }
                        }                    