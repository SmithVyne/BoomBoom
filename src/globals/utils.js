export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const USER_INFO = "USER_INFO";
export const BASE_URL = "https://binom.itcmobile.ru/api/json.php";
export async function Fetcher (body) {
    return  fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Client-Id": "7f543b97f8029e1ab7674232318c5bbf",
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
}