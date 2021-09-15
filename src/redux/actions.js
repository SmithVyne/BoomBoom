import { BASE_URL, IntObj, LOGIN, LOGIN_FAILED } from "../globals/utils";

export const Login = (body) => (dispatch) => {
    fetch(BASE_URL, IntObj(body))
    .then(res => res.json())
    .then(data => {
        if(data.error) {console.warn(data.error); dispatch({type: LOGIN_FAILED})}
        else dispatch({type: LOGIN, data})
    })
    .catch(err => console.log(err))
}