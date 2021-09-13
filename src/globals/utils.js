export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const BASE_URL = "https://binom.itcmobile.ru/api/json.php";
export const IntObj = (body) => ({
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Client-Id": "7f543b97f8029e1ab7674232318c5bbf"
    },
    body: JSON.stringify(body)
})