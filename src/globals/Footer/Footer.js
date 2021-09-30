import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import { useLocation } from "react-router";

import { Link } from "react-router-dom";

import ThemeSwitch from "../../components/ThemeSwitch";

import footer_call from '../../assets/images/footer-call.svg'
import footer_whatsapp from '../../assets/images/footer-whatsapp.svg'
import footer_telegram from '../../assets/images/footer-telegram.svg'
import footer_instagram from '../../assets/images/footer-instagram.svg'



import './Footer.css';


export default function Footer() {
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    function handleResize() {
        setScreenWidth(window.innerWidth)
        window.removeEventListener('resize', handleResize);
    }
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const {setLoginForm, userSession, setUserSession } = useContext(GlobalContext);
    const { pathname } = useLocation();
    const logged_in = pathname === "/dashboard" && userSession;
    const handleButton = () => {
        if (logged_in) setUserSession(null)
        else setLoginForm(true)
    }
    return (
        <footer className={`footer`}>
            {screenWidth > 568 ?
                <>
                    <div className={`footer__first-row`}>
                        <div className={`footer__socials`}>
                            <Link to="/" className={`footer__social-link footer__social_type_phone`}>
                                <img src={footer_call} className={`footer__social-img`} alt="Телефон"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_whatsapp`}>
                                <img src={footer_whatsapp} className={`footer__social-img`} alt="WhatsApp"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_telegram`}>
                                <img src={footer_telegram} className={`footer__social-img footer__social-img_type_telegram`} alt="Telegram"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_instagram`}>
                                <img src={footer_instagram} className={`footer__social-img`} alt="Telegram"></img>
                            </Link>
                        </div>
                        <div className="footer__controllers">
                            <ThemeSwitch />
                            <Link className={`footer__dashboard-btn`} to={logged_in ? "/" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</Link>
                        </div>
                    </div>
                    <div className={`footer__second-row`}>
                        <p className={`footer__copyright`}>&#169; 2021 ПАО «ААПТЕЛЕКОМ»<br />Все права защищены</p>
                        <ul className={`footer__nav`}>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/">Главная</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/tariffs">Тарифы</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/numbers">Номера</Link>
                                </li>
                            </div>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/organisations">Организациям</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/services">Услуги</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/support">Поддержка</Link>
                                </li>
                            </div>

                        </ul>
                    </div>
                </>
                :
                <>
                    <div className="footer__controllers">
                        <ThemeSwitch />
                        <Link className={`footer__dashboard-btn`} to={logged_in ? "/" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</Link>
                    </div>
                    <ul className={`footer__nav`}>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/">Главная</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/tariffs">Тарифы</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/numbers">Номера</Link>
                                </li>
                            </div>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/organisations">Организациям</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/services">Услуги</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item`} to="/support">Поддержка</Link>
                                </li>
                            </div>

                        </ul>
                        <div className={`footer__socials`}>
                            <Link to="/" className={`footer__social-link footer__social_type_phone`}>
                                <img src={footer_call} className={`footer__social-img`} alt="Телефон"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_whatsapp`}>
                                <img src={footer_whatsapp} className={`footer__social-img`} alt="WhatsApp"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_telegram`}>
                                <img src={footer_telegram} className={`footer__social-img footer__social-img_type_telegram`} alt="Telegram"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_instagram`}>
                                <img src={footer_instagram} className={`footer__social-img`} alt="Telegram"></img>
                            </Link>
                        </div>
                        <p className={`footer__copyright`}>&#169; 2021 ПАО «ААПТЕЛЕКОМ»<br />Все права защищены</p>
                </>}


        </footer>

    )
}
