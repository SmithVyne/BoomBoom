import duck from "../assets/images/duck.png";
import light from "../assets/images/light.png";
import star from "../assets/images/star.png";
import briefcase from "../assets/images/briefcase.png";
import goblet from "../assets/images/goblet.png";
import box from "../assets/images/services/box.png"
import coin from "../assets/images/services/Coin.png"
import Speaker from "../assets/images/services/Speaker.png"
import family from "../assets/images/services/family.png"
import mailbox from "../assets/images/services/mailbox.png"
import radio from "../assets/images/services/radio.png"
import shield from "../assets/images/services/shield.png"
import lock from "../assets/images/services/lock.png"
import firework from "../assets/images/services/firework.png"
import robot from "../assets/images/services/robot 1 blue head.png"
import drum from "../assets/images/services/drum.png"
import umbrella from "../assets/images/services/umbrella.png"
import telescope from "../assets/images/services/telescope.png"
import wifi from "../assets/images/services/wifi.png"
import telephone from "../assets/images/services/telephone.png"

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
    infinitInternet: 150,
    modem: 50,
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
    infinitInternet: 150,
    modem: 50,
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
        "Безлимитный 4G": Infinity,
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
    infinitInternet: 'Включено в один из пакетов тарифа, для остальных пакетов 150 ₽',
    modem: 50,
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
        "Безлимитный 4G": Infinity,
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
    infinitInternet: 'Включено в один из пакетов тарифа, для остальных пакетов 150 ₽',
    modem: 50,
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
        "Безлимитный 4G": Infinity,
        "Раздача интернета": Infinity,
    },{
        min: 7000,
        gb: 150,
        sms: 1000,
        "Раздача интернета": Infinity,
    }],
    infinitInternet: 'Включено в тариф',
    modem: 'Включено в тариф',
    price: 1500,
    background:"radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)"
}

export const tariffTypesArray = [tariffBase, tariffBright, tariffAdvanced, tariffBiz, tariffVip ]

export const services = {
    paid: [
        {
            desc: `Интернет закончился раньше, чем 
            вы планировали ? Докупите еще гигабайт 
            на максимальной скорости`,
            img: box,
            positions: [{title: "Пакет 10 ГБ", price:"150 ₽"}, {title: "Пакет 20 ГБ", price:"250 ₽"}, {title: "Пакет 30 ГБ", price:"350 ₽"}, {title: "Пакет 40 ГБ", price:"550 ₽"}]
        },
        {
            title: `Пакет безлимитного 
            интернета в сети 4G`,
            desc: `Интернет никогда не закончится в сети 4G`,
            img: firework,
            price: "150 ₽ / месяц"
        },
        {
            title: `Автоответчик`,
            desc: `Включите Автоответчик, и вы не пропустите ни одного звонка, даже если телефон будет выключен или окажется  вне зоны обслуживания.`,
            img: robot,
            price: "50 ₽ / месяц"
        },
        {
            title: `Привет`,
            desc: `Установите вместо скучных гудков
            музыку, шутки и приколы! Каталог мелодий 
            и управление услугой - 0770`,
            img: drum,
            price: "100 ₽ / месяц"
        },
        {
            title: `Антиопределитель номера`,
            desc: `Антиопределитель сохранит 
            ваш номер в секрете во время разговора, даже если у собеседника подключе определитель номера.`,
            img: umbrella,
            price: "200 ₽ / месяц"
        },
        {
            title: `Суперопределитель номера`,
            desc: `Чтобы всегда знать, кто вам звонит, даже если у них «Антиопределитель номера»`,
            img: telescope,
            price: "1800 ₽ / месяц"
        },
        {
            title: `Режим Модема`,
            desc: `Раздача интернета с устройвства в режиме модема.`,
            img: wifi,
            price: "50 ₽ / месяц"
        },
        {
            title: `Городская состовляющая (495)`,
            desc: `Выделение городского номера из пула нумерации города, в коде 495. Тарификация согласно местной телефонной связи. Все входящие звонки для абонента бесплатны.`,
            img: telephone,
            price: "750 ₽ / месяц"
        },
    ], 
    free: [
        {
            title: `Запрет мобильного интернета`,
            desc: `Интернет никогда не закончится в сети 4G`,
            img: lock,
            price: "Бесплатно"
        },
        {
            title: `Запрет доступа ко всем
            SMS - сервисам провайдеров`,
            desc: `Услуга позволяет ограничивать получение и отправку нежелательных SMS - сообщений с кортких номеров контент - провайдеров.`,
            img: shield,
            price: "Бесплатно"
        },
        {
            title: `Переадресация звонков `,
            desc: `Услуга “Переадресация звонков”
            позволит вам получить звонок 
            именно там, где нужно, и в любое удобное для вас время. `,
            img: radio,
            price: "Бесплатно"
        },
        {
            title: `Будь в курсе`,
            desc: `Если телефон недоступен или вы не отвечаете на звонок в течении 30 секунд, клиенты и партнеры могут оставить голосовое сообщение.`,
            img: mailbox,
            price: "Бесплатно"
        },
        {
            title: `Ожидание вызова`,
            desc: `Вы не пропустите важный звонок, даже когда ваш телефон занят`,
            img: Speaker,
            price: "Бесплатно"
        },
        {
            title: `Постоплатная система расчетов`,
            desc: `Возможно подключения только после 6 месяцев использования `,
            img: coin,
            price: "Бесплатно"
        },
        {
            title: `Моя семья`,
            desc: `Оплачивайте счета аобонентов в группе одним платежом и просматривайте детализаци абонента в группе`,
            img: family,
            price: "Бесплатно"
        },
    ],
}