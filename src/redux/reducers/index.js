import { LOGIN, LOGIN_FAILED, LOGOUT } from "../../globals/utils"

const initial = {
    logged_in : 0
}

const LoginReducer = (store = initial, action) => {
    switch(action.type) {
        case LOGIN:
            return {...store, logged_in: 1}
        case LOGIN_FAILED:
            return {...store, logged_in: -1}
        case LOGOUT:
            return {...store, logged_in: 0}
        default:
            return store
    }
}

export default LoginReducer;