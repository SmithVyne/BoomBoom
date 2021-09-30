export const BASE_URL = "https://binom.itcmobile.ru/api/json.php";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const GET_PASSWORD = "GET_PASSWORD";
export const USER_INFO = "USER_INFO";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const BUY_NUMBER = "BUY_NUMBER";
export const CATEGORIES = {
    1: {name: "Бронзовый", bg: "#CD7F32", rentPrice: "Бесплатно!", purchasePrice: "1000 руб."},
    2: {name: "Серебряный", bg: "#C0C0C0", rentPrice: "300 руб.", purchasePrice: "5000 руб."},
    3: {name: "Золотой", bg: "#FFD700", rentPrice: "500 руб.", purchasePrice: "35 000 руб."},
    6: {name: "Платиновый", bg: "#e5e4e2", rentPrice: "1000 руб.", purchasePrice: "200 000 руб."},
    10: {name: "Бриллиантовый", bg: "#FFB02E", rentPrice: "1500 руб.", purchasePrice: "500 000 руб."}
}

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

export const tariffBase = {
    tariffName: 'Базовый',
    position: [{
        min: 500,
        gb: 10,
        sms: 100,
    },{
        min: 400,
        gb: 20,
        sms: 100,
    },{
        min: 300,
        gb: 30,
        sms: 100,
    },{
        min: 200,
        gb: 40,
        sms: 100,
    }],
    price: 350,
}
export const tariffBright = {
    tariffName: 'Яркий',
    position: [{
        min: 1000,
        gb: 25,
        sms: 500,
    }, {
        min: 900,
        gb: 35,
        sms: 500,
    },{
        min: 800,
        gb: 45,
        sms: 500,
    }, {
        min: 700,
        gb: 55,
        sms: 500,
    }],
    price: 500,
}
export const tariffAdvanced = {
    tariffName: 'Расширенный',
    position: [{
        min: 2000,
        gb: 35,
        sms: 1000,
    },{
        min: 1800,
        gb: 45,
        sms: 1000,
    },{
        min: 1600,
        gb: 75,
        sms: 1000,
    },{
        min: 1400,
        gb: 95,
        sms: 1000,
    }],
    price: 800,
}
export const tariffBiz = {
    tariffName: 'Бизнес',
    position: [{
        min: 4000,
        gb: 50,
        sms: 1000,
    },{
        min: 3800,
        gb: 70,
        sms: 1000,
    },{
        min: 3600,
        gb: 90,
        sms: 1000,
    },{
        min: 3400,
        gb: 110,
        sms: 1000,
    }],
    price: 1000,
}
export const tariffVip = {
    tariffName: 'VIP',
    position: [{
        min: 7000,
        gb: 100,
        sms: 1000,
    },{
        min: 6800,
        gb: 120,
        sms: 1000,
    },{
        min: 6600,
        gb: 140,
        sms: 1000,
    },{
        min: 6400,
        gb: 160,
        sms: 1000,
    }],
    price: 1500,
}