import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './Organisations.css';
import logo from '../../assets/images/logo.png'
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.png'
import img3 from '../../assets/images/img3.png'

const cardsMalBiz = [
    {
        img: img1,
        title: 'Яркий микс',
        text: `Высокоскоростной интернет
        в офисе со скидкой, корпоративная
        мобильная связьи облачная АТС бесплатно`
    },
    {
        img: img2,
        title: 'Мобильное предприятие',
        text: `CRM-система со встроенной облачной
        телефонией для ведения клиентской базы,
        контроля продаж и управления проектами.`
    },
    {
        img: img3,
        title: 'Для ИП и самозанятых',
        text: `Облачная телефония, Статистика
        эффективностирекламы
        CRM-система и СМС-рассылки`
    }
]

const cardsBigBiz = [
    {
        img: img1,
        title: 'Яркий микс 2',
        text: `Высокоскоростной интернет
        в офисе со скидкой, корпоративная
        мобильная связьи облачная АТС бесплатно`
    },
    {
        img: img2,
        title: 'Мобильное предприятие 2',
        text: `CRM-система со встроенной облачной
        телефонией для ведения клиентской базы,
        контроля продаж и управления проектами.`
    },
    {
        img: img3,
        title: 'Для ИП и самозанятых 2',
        text: `Облачная телефония, Статистика
        эффективностирекламы
        CRM-система и СМС-рассылки`
    }
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
                    </div>
                    <div className="block-pr">
                        <div className="row">
                            {
                                selectedCategory === 'Малый бизнес' ?
                                    cardsMalBiz.map((item, i) => (
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


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
