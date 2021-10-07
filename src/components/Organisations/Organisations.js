import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../App';
import { useParams , useHistory } from 'react-router-dom';
import './Organisations.css';
import logo from '../../assets/images/logo.png'
import box from '../../assets/images/box.png'
import beeline from '../../assets/images/beeline-org.png'
import bucket from '../../assets/images/bucket.png'
import anchor from '../../assets/images/anchor.png'
import link from '../../assets/images/link.png'
import globe_icon from '../../assets/images/globe_icon.png'
import folder from '../../assets/images/folder.png'
import blub from '../../assets/images/blub.png'
import computer from '../../assets/images/computer.png'
import floppy from '../../assets/images/Floppy.png'
import red_book from '../../assets/images/red-book.png'
import thermometer from '../../assets/images/Thermometer.png'
import magic_hat from '../../assets/images/Magic-hat.png'
import clapperboard from '../../assets/images/clapperboard.png'
import pcFace from '../../assets/images/pc-face.png'

const cardsMalBiz = [
    {
        img: box,
        title: 'Яркий микс',
        text: `Высокоскоростной интернет в офисе со скидкой, корпоративная мобильная связьи облачная АТС бесплатно`
    },
    {
        img: pcFace,
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
        img: beeline,
        title: 'ОФД “Билайн”',
        text: `Касса +ФН + ОФД + Интернет + Настройка кассы - с рассрочкой 12 месяцев`
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
    const history = useHistory();
    let { type } = useParams();
    const { darkTheme } = useContext(GlobalContext);
    const [selectedCategory, setSelectedCategory] = React.useState(`${type && (type === ':small-biz'|| type === ':big-biz' || type === ':gos-sector') ? type.split(':')[1] : 'small-biz'}`);
    React.useEffect(() => {
        setSelectedCategory(`${type && (type === ':small-biz'|| type === ':big-biz' || type === ':gos-sector') ? type.split(':')[1] : 'small-biz'}`)
      }, [type])
    function handleCategoryChange(category) {
        console.log(category)
        setSelectedCategory(category)
    }

    return (
        <>
            <div className="header-t base-container">
                <div className="organisations-wrap">
                    <div className="head-title">
                        <Link className="logo-t" to="/">
                            <img src={logo} alt="Логотип" />
                        </Link>
                        <h1 className={`title ${darkTheme ? 'title_dark' : ''}`}>Решения для организаций</h1>
                    </div>

                </div>
            </div>
            <section className="base-container content-style">
                <div className="organisations-wrap">

                    <div className="btn-group d-flex">
                        <button onClick={() => {
                            history.push(':small-biz')
                            handleCategoryChange('small-biz')}
                            } className={`btn ${selectedCategory === 'small-biz' ? 'btn_active' : ''} ${darkTheme ? 'btn_dark' : ''}`}>Малый бизнес</button>
                        <button onClick={() => {
                            history.push(':big-biz')
                            handleCategoryChange('big-biz')}} className={`btn btn2 ${selectedCategory === 'big-biz' ? 'btn_active' : ''}  ${darkTheme ? 'btn_dark' : ''}`}>Крупный бизнес</button>
                        <button onClick={() => {
                            history.push(':gos-sector')
                            handleCategoryChange('gos-sector')}} className={`btn btn2 ${selectedCategory === 'gos-sector' ? 'btn_active' : ''}  ${darkTheme ? 'btn_dark' : ''}`}>Госсектор</button>
                    </div>
                    <div className="block-pr">
                        <div className="row">
                            {
                                selectedCategory === 'small-biz' ?
                                    cardsMalBiz.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className={`img-w `}>
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
                                selectedCategory === 'big-biz' ?
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
                                selectedCategory === 'gos-sector' ?
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
