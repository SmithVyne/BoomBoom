import { combineReducers } from "redux"
import { LOGIN_FAILED, GET_PASSWORD, USER_INFO, SHOW_MODAL, HIDE_MODAL, BUY_NUMBER } from "../../globals/utils"

const initialNumber = {show: false, title: "", buy: false, number: {}}
const BuyNumberReducer = (store = initialNumber, action) => {
    switch(action.type) {
        case SHOW_MODAL:
            const {title} = action;
            return {...store, show:true, title}
        case HIDE_MODAL:
            return {...store, ...initialNumber}
        case BUY_NUMBER:
            const {number} = action;
            return {...store, show: true, buy: true, number}
        default:
            return store
    }
}

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

export default combineReducers({form_status: FormReducer, auth: AuthReducer, buyNumberModal: BuyNumberReducer});