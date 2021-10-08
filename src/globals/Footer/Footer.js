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

export const FooterSocials = () => (
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
)

export default function Footer() {
    const { darkTheme } = useContext(GlobalContext);
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


    const { setLoginForm, userSession, setUserSession } = useContext(GlobalContext);
    const { pathname } = useLocation();
    const logged_in = pathname === "/dashboard" && userSession;
    const handleButton = () => {
        if (logged_in) setUserSession(null)
        else setLoginForm(true)
    }
    return (
        <footer className={`footer ${darkTheme? 'footer_dark':''}`}>
            {screenWidth > 1155 ?
                <>
                    <div className={`footer__column`}>
                        <ul className={`footer__contacts`}>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme? 'footer__text_dark':''}`}>email:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme? 'footer__text_dark':''}`} target="_blank" rel="noreferrer" href="mailto:info@boomtele.com">info@boomtele.com</a>
                            </li>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme? 'footer__text_dark':''}`}>телефон:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme? 'footer__text_dark':''}`} target="_blank" rel="noreferrer" href="tel:+74957959566">+7 495 795 95 66</a>
                            </li>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme? 'footer__text_dark':''}`}>адрес:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme? 'footer__text_dark':''}`} target="_blank" rel="noreferrer" href={`https://yandex.ru/maps/?pt=37.596857,55.764374&z=18&l=map`}>Малый Козихинский пер., 12</a>
                            </li>
                        </ul>
                        <p className={`footer__copyright ${darkTheme? 'footer__text_dark':''}`}>&#169; 2021 ПАО «ААПТЕЛЕКОМ»<br />Все права защищены</p>
                    </div>
                    <div className={`footer__column`}>
                        <FooterSocials />
                        <p className={`footer__greeting ${darkTheme? 'footer__text_dark':''}`}>Ваша команда <span className={`footer__greeting-span`}>boom telecom</span></p>
                    </div>
                    <div className={`footer__column`}>
                        <div className="footer__controllers">
                            <ThemeSwitch />
                            <Link className={`footer__dashboard-btn`} to={logged_in ? "/" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</Link>
                        </div>
                        <ul className={`footer__nav`}>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/">Главная</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/tariffs">Тарифы</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/numbers/:все">Номера</Link>
                                </li>
                            </div>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/organisations/:small-biz">Организациям</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/services">Услуги</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/support">Поддержка</Link>
                                </li>
                            </div>

                        </ul>
                    </div>
                </>
                : 
                    <>
                        <div className={`footer__column`}>
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
                            <p className={`footer__greeting ${darkTheme? 'footer__text_dark':''}`}>Ваша команда <span className={`footer__greeting-span`}>boom telecom</span></p>
                            <ul className={`footer__contacts`}>
                                <li className={`footer__contact`}>
                                    <p className={`footer__contact-text ${darkTheme? 'footer__text_dark':''}`}>email:&nbsp;&nbsp;</p>
                                    <a className={`footer__contact-link ${darkTheme? 'footer__text_dark':''}`} target="_blank" rel="noreferrer" href="mailto:info@boomtele.com">info@boomtele.com</a>
                                </li>
                                <li className={`footer__contact`}>
                                    <p className={`footer__contact-text ${darkTheme? 'footer__text_dark':''}`}>телефон:&nbsp;&nbsp;</p>
                                    <a className={`footer__contact-link ${darkTheme? 'footer__text_dark':''}`} target="_blank" rel="noreferrer" href="tel:+74957959566">+7 495 795 95 66</a>
                                </li>
                                <li className={`footer__contact`}>
                                    <p className={`footer__contact-text ${darkTheme? 'footer__text_dark':''}`}>адрес:&nbsp;&nbsp;</p>
                                    <a className={`footer__contact-link ${darkTheme? 'footer__text_dark':''}`} target="_blank" rel="noreferrer" href={`https://yandex.ru/maps/?pt=37.596857,55.764374&z=18&l=map`}>Малый Козихинский пер., 12</a>
                                </li>
                            </ul>
                            <p className={`footer__copyright ${darkTheme? 'footer__text_dark':''}`}>&#169; 2021 ПАО «ААПТЕЛЕКОМ»<br />Все права защищены</p>
                        </div>
                        <div className={`footer__column`}>
                            <div className="footer__controllers">
                                <ThemeSwitch />
                                <Link className={`footer__dashboard-btn`} to={logged_in ? "/" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</Link>
                            </div>
                            <ul className={`footer__nav`}>
                                <div className={`footer__nav-column`}>
                                    <li className={`footer__nav-item`}>
                                        <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/">Главная</Link>
                                    </li>
                                    <li className={`footer__nav-item`}>
                                        <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/tariffs">Тарифы</Link>
                                    </li>
                                    <li className={`footer__nav-item`}>
                                        <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/numbers/:все">Номера</Link>
                                    </li>
                                </div>
                                <div className={`footer__nav-column`}>
                                    <li className={`footer__nav-item`}>
                                        <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/organisations/:small-biz">Организациям</Link>
                                    </li>
                                    <li className={`footer__nav-item`}>
                                        <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/services">Услуги</Link>
                                    </li>
                                    <li className={`footer__nav-item`}>
                                        <Link className={`footer__nav-item ${darkTheme? 'footer__text_dark':''}`} to="/support">Поддержка</Link>
                                    </li>
                                </div>

                            </ul>
                        </div>
                    </>}


        </footer>

    )
}
