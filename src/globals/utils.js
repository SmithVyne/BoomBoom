import duck from "../assets/images/duck.png";
import light from "../assets/images/light.png";
import star from "../assets/images/star.png";
import briefcase from "../assets/images/briefcase.png";
import goblet from "../assets/images/goblet.png";

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
    title: 'Базовый',
    icon: duck,
    positions: [{
        min: 300,
        gb: 40,
        sms: 300,
    },{
        min: 400,
        gb: 30,
        sms: 300,
    },{
        min: 400,
        gb: 20,
        sms: 300,
    },{
        min: 500,
        gb: 10,
        sms: 100,
    }],
    price: 350,
    background:"linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)"
}
export const tariffBright = {
    title: 'Яркий',
    icon: light,
    positions: [{
        min: 600,
        gb: 50,
        sms: 500,
    }, {
        min: 800,
        gb: 40,
        sms: 500,
    },{
        min: 800,
        gb: 30,
        sms: 500,
    }, {
        min: 1000,
        gb: 25,
        sms: 500,
    }],
    price: 500,
    background:" linear-gradient(99.98deg, #4B40FE 0%, #3039FF 98.9%, #4B1EFF 98.9%);",
    hit: true,
}
export const tariffAdvanced = {
    title: 'Расширенный',
    icon: star,
    positions: [{
        min: 1000,
        gb: Infinity,
        sms: 1000,
        fourG: Infinity,
    },{
        min: 1500,
        gb: 50,
        sms: 1000,
    },{
        min: 1500,
        gb: 40,
        sms: 1000,
    },{
        min: 2000,
        gb: 35,
        sms: 1000,
    }],
    price: 800,
    background:" linear-gradient(99.98deg, #4B40FE 0%, #3039FF 98.9%, #4B1EFF 98.9%)" 
}
export const tariffBiz = {
    title: 'Бизнес',
    icon: briefcase,
    positions: [{
        min: 2500,
        gb: Infinity,
        sms: 1000,
        fourG: Infinity,
    },{
        min: 3000,
        gb: 60,
        sms: 1000,
    },{
        min: 3000,
        gb: 50,
        sms: 1000,
    },{
        min: 4000,
        gb: 50,
        sms: 1000,
    }],
    price: 1000,
    background:"radial-gradient(ellipse at center, #324E69 0%, #242424 100%)"
}
export const tariffVip = {
    title: 'VIP',
    icon: goblet,
    positions: [{
        min: 5000,
        gb: Infinity,
        sms: 1000,
        fourG: Infinity,
        internet: Infinity,
    },{
        min: 7000,
        gb: 150,
        sms: 1000,
        internet: Infinity,
    }],
    price: 1500,
    background:"radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)"
}

export const tariffTypesArray = [tariffBase, tariffBright, tariffAdvanced, tariffBiz, tariffVip ]