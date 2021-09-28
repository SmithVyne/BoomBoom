export const BASE_URL = "https://binom.itcmobile.ru/api/json.php";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const GET_PASSWORD = "GET_PASSWORD";
export const USER_INFO = "USER_INFO";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

const getAuth = (accessToken) => {
    if (accessToken) return {
        "Authorization": `Bearer ${accessToken}`
    }
    else return {}
}
export async function Fetcher (body, accessToken) {
    return  fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Client-Id": "7f543b97f8029e1ab7674232318c5bbf",
                    ...getAuth(accessToken)
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
}

export const replacePoints = (text) => text.toString().replace(".", ",");
export const percentage = (current, initial) => (current * 100) / initial;

export async function GetNumbers() {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Client-Id": "7f543b97f8029e1ab7674232318c5bbf",
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "getCtnsForSale",
            "id": 1
        }
        )
    })
        .then(res => res.json())
}