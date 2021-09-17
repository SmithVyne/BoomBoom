import { combineReducers } from "redux"
import { LOGIN_FAILED, GET_PASSWORD, USER_INFO } from "../../globals/utils"


const FormReducer = (store = null, action) => {
    switch(action.type) {
        case LOGIN_FAILED:
            return -1
        case GET_PASSWORD:
            return store === -2 ? null : -2
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

export default combineReducers({form_status: FormReducer, auth: AuthReducer});