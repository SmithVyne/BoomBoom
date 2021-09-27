import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './Organisations.css';
import logo from '../../assets/images/logo.png'
import box from '../../assets/images/box.png'
import car from '../../assets/images/car.png'
import bucket from '../../assets/images/bucket.png'
import anchor from '../../assets/images/anchor.png'
import link from '../../assets/images/link.png'
import phone_1 from '../../assets/images/phone_1.png'
import phone_2 from '../../assets/images/phone_2.png'
import globe_icon from '../../assets/images/globe_icon.png'
import folder from '../../assets/images/folder.png'
import blub from '../../assets/images/blub.png'
import computer from '../../assets/images/computer.png'
import floppy from '../../assets/images/Floppy.png'
import red_book from '../../assets/images/red-book.png'
import thermometer from '../../assets/images/Thermometer.png'
import magic_hat from '../../assets/images/Magic-hat.png'
import clapperboard from '../../assets/images/clapperboard.png'

const cardsMalBiz = [
    {
        img: box,
        title: 'Яркий микс',
        text: `Высокоскоростной интернет в офисе со скидкой, корпоративная мобильная связьи облачная АТС бесплатно`
    },
    {
        img: car,
        title: 'Мобильное предприятие',
        text: `CRM-система со встроенной облачной
        телефонией для ведения клиентской базы,
        контроля продаж и управления проектами.`
    },
    {
        img: bucket,
        title: 'Для ИП и самозанятых',
        text: `Облачная телефония, Статистика эффективностирекламы CRM-система и СМС-рассылки`
    }
    ,
    {
        img: anchor,
        title: 'Номер 8800',
        text: `Звонки по всей россии и бесплатное подключение`
    }
    ,
    {
        img: link,
        title: 'Интернет для бизнеса',
        text: `CRM-система со встроенной облачной телефонией для ведения клиентской базы, контроля продаж и управления проектами`
    }
    ,
    {
        img: window.innerWidth > 1023 ? phone_2 : phone_1,
        title: 'ОФД “Билайн”',
        text: `Облачная телефония, Статистика эффективностирекламы CRM-система и СМС-рассылки`
    }
]

const cardsBigBiz = [
    {
        img: globe_icon,
        title: 'BOOM Геоаналитика',
        text: `Исследование аудитории пользователей ваших сервисов. Отчеты по потенциальновый выручке. Сезонные исследования за 2 недели.`
    },
    {
        img: folder,
        title: 'BOOMCLOUD цифровое решение',
        text: `Универсальная облачная платформа 
        для цифровой устойчивости вашего бизнеса`
    },
    {
        img: blub,
        title: 'BOOMSMART',
        text: `Комплексное решение для прокачки 
        всех отделов бизнеса (Маркетинг, IT,  Продажи, 
        Обслуживание, Логистики, Финансов и тд)`
    },
    {
        img: computer,
        title: 'Решения для удаленной работы',
        text: `Все необходимые инструменты для 
        управления бизнесом и обслуживания 
        клиентов при удаленной работе`
    },
    {
        img: floppy,
        title: 'Системная интеграция: (Цифровизация бизнеса)',
        text: `Применение комплексных IT-решений 
        для внедрения новых технологий, сокращения 
        расходов и создания сервисов.`
    },

]

const cardsGosSector = [
    {
        img: globe_icon,
        title: 'Управление общесвенным транспортом и городским трафиком',
        text: `Единая интеллектуальная трансопртная
        система`
    },
    {
        img: red_book,
        title: 'Цифровизация образовательных учреждений',
        text: `Роббо - классы
        VR/AR обучение 
        Интерактивные классы`
    },
    {
        img: thermometer,
        title: 'Решения для автоматизации процессов в медицинских учреждениях',
        text: `Сервисы ЕГИСЗ, Электронная медицинская карта, Сервис персонифицированного учета медпомощи`
    },
    {
        img: magic_hat,
        title: 'Технологичные инструменты для городских коммунальных служб и горуправления',
        text: `Умное ЖКХ Энергоэффективное городское освещение`
    },
    {
        img: clapperboard,
        title: 'Инструменты для принятия решений и эффективного управления',
        text: `Планирование социальной инфраструктуры Оптимизация транспортной инфраструктуры`
    },
    

]

export default function Organisations() {

    const { darkTheme } = useContext(GlobalContext);
    const [selectedCategory, setSelectedCategory] = React.useState('Малый бизнес');

    function handleCategoryChange(category) {
        console.log(category)
        setSelectedCategory(category)
    }

    return (
        <>
            <div className="header-t base-container">
                <div className="wrap">
                    <Link className="logo-t" to="/">
                        <img src={logo} alt="Логотип" />
                    </Link>
                </div>
            </div>
            <section className="base-container content-style">
                <div className="wrap">
                    <h1 className={`title ${darkTheme ? 'title_dark' : ''}`}>решения для организайций от boom telecom</h1>
                    <div className="btn-group d-flex">
                        <button onClick={() => handleCategoryChange('Малый бизнес')} className={`btn ${selectedCategory === 'Малый бизнес' ? 'btn_active' : ''} ${darkTheme ? 'btn_dark' : ''}`}>Малый бизнес</button>
                        <button onClick={() => handleCategoryChange('Крупный бизнес')} className={`btn btn2 ${selectedCategory === 'Крупный бизнес' ? 'btn_active' : ''}  ${darkTheme ? 'btn_dark' : ''}`}>Крупный бизнес</button>
                        <button onClick={() => handleCategoryChange('Госсектор')} className={`btn btn2 ${selectedCategory === 'Госсектор' ? 'btn_active' : ''}  ${darkTheme ? 'btn_dark' : ''}`}>Госсектор</button>
                    </div>
                    <div className="block-pr">
                        <div className="row">
                            {
                                selectedCategory === 'Малый бизнес' ?
                                    cardsMalBiz.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className={`img-w ${item.title === 'ОФД “Билайн”' ? 'img-phone' : ''}`}>
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <h3 className={`card-title ${darkTheme ? 'card-title_dark' : ''}`}>{item.title}</h3>
                                                <p className={`card-text ${darkTheme ? 'card-text_dark' : ''}`}>{item.text}</p>
                                                <a className="more" href="/#">Оставить заявку</a>
                                            </div>
                                        </div>
                                    ))
                                    : <></>}
                            {
                                selectedCategory === 'Крупный бизнес' ?
                                    cardsBigBiz.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className="img-w">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <h3 className={`card-title ${darkTheme ? 'card-title_dark' : ''}`}>{item.title}</h3>
                                                <p className={`card-text ${darkTheme ? 'card-text_dark' : ''}`}>{item.text}</p>
                                                <a className="more" href="/#">Оставить заявку</a>
                                            </div>
                                        </div>
                                    ))
                                    : <></>}

                            {
                                selectedCategory === 'Госсектор' ?
                                    cardsGosSector.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className="img-w">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <h3 className={`card-title ${darkTheme ? 'card-title_dark' : ''}`}>{item.title}</h3>
                                                <p className={`card-text ${darkTheme ? 'card-text_dark' : ''}`}>{item.text}</p>
                                                <a className="more" href="/#">Оставить заявку</a>
                                            </div>
                                        </div>
                                    ))
                                    : <></>}


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
