import { combineReducers } from "redux"
import { LOGIN, LOGIN_FAILED, LOGOUT, USER_INFO } from "../../globals/utils"


const LoginReducer = (store = 0, action) => {
    switch(action.type) {
        case LOGIN:
            return 1
        case LOGIN_FAILED:
            return -1
        case LOGOUT:
            return 0
        default:
            return store
    }
}

const AuthReducer = (store = {}, action) => {
    switch(action.type) {
        case USER_INFO:
            return {...store, userInfo: action.userInfo}
        default:
            return store
    }
}

export default combineReducers({logged_in: LoginReducer, auth: AuthReducer});